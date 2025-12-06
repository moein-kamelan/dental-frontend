import React, { useEffect, useState } from "react";
import { formatJalali } from "../../../../utils/helpers";
import type { Comment } from "../../../../types/types";
import {
  useReplyToComment,
  useDeleteComment,
  useUpdateComment,
} from "../../../../services/useComments";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../../redux/typedHooks";

interface ViewCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment | null;
  commentType: "doctor" | "article" | "service";
  onRefetch?: () => void;
}

function ViewCommentModal({
  isOpen,
  onClose,
  comment,
  commentType,
  onRefetch,
}: ViewCommentModalProps) {
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [editingReply, setEditingReply] = useState<Comment | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [isUpdatingReply, setIsUpdatingReply] = useState(false);
  const [isDeletingReply, setIsDeletingReply] = useState<string | null>(null);
  const [currentComment, setCurrentComment] = useState<Comment | null>(comment);
  const { mutateAsync: replyToComment } = useReplyToComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: updateComment } = useUpdateComment();
  const queryClient = useQueryClient();
  const currentUser = useAppSelector((state) => state.user.data);

  // Check if user can edit/delete a reply
  const canEditDeleteReply = (reply: Comment) => {
    if (!currentUser) return false;

    // Admin or Secretary can edit/delete ANY reply (including replies from other admins/secretaries)
    if (currentUser.role === "ADMIN" || currentUser.role === "SECRETARY") {
      return true;
    }

    // Regular users can only edit/delete their own replies
    return reply.userId === currentUser.id;
  };

  // Update currentComment when comment prop changes
  useEffect(() => {
    setCurrentComment(comment);
  }, [comment]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes or comment changes
  useEffect(() => {
    if (!isOpen) {
      setReplyContent("");
      setShowReplyForm(false);
      setEditingReply(null);
      setEditReplyContent("");
    }
  }, [isOpen]);

  if (!isOpen || !currentComment) return null;

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || replyContent.length < 10) {
      showErrorToast("پاسخ باید حداقل ۱۰ کاراکتر باشد");
      return;
    }

    setIsSubmittingReply(true);
    try {
      const response = await replyToComment({
        commentId: currentComment.id,
        content: replyContent,
      });

      // Real-time update: Add the new reply to current comment state
      if (response?.data?.reply) {
        const newReply: Comment = {
          id: response.data.reply.id,
          content: response.data.reply.content,
          userId: response.data.reply.userId,
          parentId: response.data.reply.parentId,
          doctorId: response.data.reply.doctorId,
          articleId: response.data.reply.articleId,
          serviceId: response.data.reply.serviceId,
          user: response.data.reply.user,
          createdAt: response.data.reply.createdAt,
          updatedAt: response.data.reply.updatedAt,
          published: response.data.reply.published ?? true,
          read: response.data.reply.read ?? false,
          rating: response.data.reply.rating,
        };

        setCurrentComment((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            replies: [...(prev.replies || []), newReply],
          };
        });
      }

      showSuccessToast("پاسخ با موفقیت ثبت شد");
      setReplyContent("");
      setShowReplyForm(false);

      // Invalidate comments query to refresh data in lists
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      // Also invalidate the specific comment query for CommentsBox
      if (currentComment.doctorId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.doctorId, "doctor"],
        });
      }
      if (currentComment.articleId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.articleId, "article"],
        });
      }
      if (currentComment.serviceId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.serviceId, "service"],
        });
      }

      // Call onRefetch if provided
      onRefetch?.();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در ثبت پاسخ رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleEditReply = (reply: Comment) => {
    setEditingReply(reply);
    setEditReplyContent(reply.content);
  };

  const handleCancelEdit = () => {
    setEditingReply(null);
    setEditReplyContent("");
  };

  const handleUpdateReply = async (e: React.FormEvent, replyId: string) => {
    e.preventDefault();
    if (!editReplyContent.trim() || editReplyContent.length < 10) {
      showErrorToast("پاسخ باید حداقل ۱۰ کاراکتر باشد");
      return;
    }

    setIsUpdatingReply(true);
    try {
      const response = await updateComment({
        id: replyId,
        content: editReplyContent,
      });

      // Real-time update: Update the reply in current comment state
      if (response?.data?.comment) {
        setCurrentComment((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            replies: (prev.replies || []).map((reply) =>
              reply.id === replyId
                ? {
                    ...reply,
                    content: response.data.comment.content,
                    updatedAt: response.data.comment.updatedAt,
                  }
                : reply
            ),
          };
        });
      }

      showSuccessToast("پاسخ با موفقیت ویرایش شد");
      setEditingReply(null);
      setEditReplyContent("");

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      if (currentComment?.doctorId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.doctorId, "doctor"],
        });
      }
      if (currentComment?.articleId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.articleId, "article"],
        });
      }
      if (currentComment?.serviceId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.serviceId, "service"],
        });
      }

      onRefetch?.();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در ویرایش پاسخ رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsUpdatingReply(false);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!window.confirm("آیا از حذف این پاسخ اطمینان دارید؟")) {
      return;
    }

    setIsDeletingReply(replyId);
    try {
      await deleteComment(replyId);

      // Real-time update: Remove the reply from current comment state
      setCurrentComment((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          replies: (prev.replies || []).filter((reply) => reply.id !== replyId),
        };
      });

      showSuccessToast("پاسخ با موفقیت حذف شد");

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      if (currentComment?.doctorId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.doctorId, "doctor"],
        });
      }
      if (currentComment?.articleId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.articleId, "article"],
        });
      }
      if (currentComment?.serviceId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", currentComment.serviceId, "service"],
        });
      }

      onRefetch?.();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف پاسخ رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeletingReply(null);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-paragray">-</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fas ${
              index < rating
                ? "fa-star text-yellow-400"
                : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const getCommentTypeLabel = () => {
    switch (commentType) {
      case "doctor":
        return "نظر پزشک";
      case "article":
        return "نظر مقاله";
      case "service":
        return "نظر خدمت";
      default:
        return "نظر";
    }
  };

  const getCommentTypeIcon = () => {
    switch (commentType) {
      case "doctor":
        return "fa-user-md";
      case "article":
        return "fa-newspaper";
      case "service":
        return "fa-handshake";
      default:
        return "fa-comment";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay با backdrop blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />

      {/* مدال */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i
                  className={`fas ${getCommentTypeIcon()} text-white text-xl`}
                ></i>
              </div>
              <h3 className="text-xl font-estedad-semibold text-white">
                مشاهده {getCommentTypeLabel()}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="بستن"
            >
              <i className="fa fa-times text-white"></i>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* کاربر */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                کاربر
              </label>
              <p className="text-dark font-estedad-light text-base">
                {currentComment.user.firstName} {currentComment.user.lastName}
              </p>
            </div>

            {/* پزشک / مقاله / خدمت */}
            {commentType === "doctor" && currentComment.doctor && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  پزشک
                </label>
                <p className="text-dark font-estedad-light text-base">
                  دکتر {currentComment.doctor.firstName}{" "}
                  {currentComment.doctor.lastName}
                </p>
              </div>
            )}

            {commentType === "article" && currentComment.article && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  مقاله
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {currentComment.article.title}
                </p>
              </div>
            )}

            {commentType === "service" && currentComment.service && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  خدمت
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {currentComment.service.title}
                </p>
              </div>
            )}

            {/* متن نظر */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                متن نظر
              </label>
              <p className="text-dark font-estedad-light text-base leading-7 whitespace-pre-wrap">
                {currentComment.content}
              </p>
            </div>

            {/* امتیاز */}
            {currentComment.rating && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  امتیاز
                </label>
                <div>{renderStars(currentComment.rating)}</div>
              </div>
            )}

            {/* تاریخ ایجاد */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                تاریخ ایجاد
              </label>
              <p className="text-dark font-estedad-light text-base">
                {formatJalali(new Date(currentComment.createdAt))}
              </p>
            </div>

            {/* تاریخ به‌روزرسانی */}
            {currentComment.updatedAt &&
              currentComment.updatedAt !== currentComment.createdAt && (
                <div className="border-b border-gray-200 pb-3">
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    تاریخ به‌روزرسانی
                  </label>
                  <p className="text-dark font-estedad-light text-base">
                    {formatJalali(new Date(currentComment.updatedAt))}
                  </p>
                </div>
              )}

            {/* پاسخ‌ها */}
            {currentComment.replies && currentComment.replies.length > 0 && (
              <div className="mt-6">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-3">
                  پاسخ‌ها ({currentComment.replies.length})
                </label>
                <div className="space-y-4">
                  {currentComment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-50 rounded-lg p-4 border-r-4 border-purple-400"
                    >
                      {editingReply?.id === reply.id ? (
                        // Edit form
                        <form
                          onSubmit={(e) => handleUpdateReply(e, reply.id)}
                          className="space-y-3"
                        >
                          <div>
                            <label className="text-sm font-estedad-semibold text-gray-700 block mb-2">
                              ویرایش پاسخ
                            </label>
                            <textarea
                              value={editReplyContent}
                              onChange={(e) =>
                                setEditReplyContent(e.target.value)
                              }
                              placeholder="پاسخ خود را بنویسید (حداقل ۱۰ کاراکتر)"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-estedad-light"
                              rows={4}
                              disabled={isUpdatingReply}
                            />
                            <p className="text-xs text-gray-500 mt-1 font-estedad-light">
                              {editReplyContent.length}/1000 کاراکتر
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              disabled={
                                isUpdatingReply ||
                                editReplyContent.trim().length < 10
                              }
                              className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {isUpdatingReply ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                  در حال ذخیره...
                                </>
                              ) : (
                                <>
                                  <i className="far fa-save"></i>
                                  ذخیره
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              disabled={isUpdatingReply}
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              انصراف
                            </button>
                          </div>
                        </form>
                      ) : (
                        // Reply content
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <i className="far fa-user text-purple-600 text-xs"></i>
                              </div>
                              <span className="text-sm font-estedad-medium text-dark">
                                {reply.user.firstName} {reply.user.lastName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 font-estedad-light">
                                {formatJalali(new Date(reply.createdAt))}
                              </span>
                              {canEditDeleteReply(reply) && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleEditReply(reply)}
                                    className="p-1.5 rounded-full text-blue-500 bg-blue-500/20 hover:bg-blue-500 hover:text-white transition"
                                    title="ویرایش"
                                    disabled={isDeletingReply === reply.id}
                                  >
                                    <i className="far fa-edit text-xs"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteReply(reply.id)}
                                    className="p-1.5 rounded-full text-red-500 bg-red-500/20 hover:bg-red-500 hover:text-white transition"
                                    title="حذف"
                                    disabled={isDeletingReply === reply.id}
                                  >
                                    {isDeletingReply === reply.id ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-500 border-t-transparent"></div>
                                    ) : (
                                      <i className="far fa-trash-alt text-xs"></i>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-dark font-estedad-light text-sm leading-6 whitespace-pre-wrap">
                            {reply.content}
                          </p>
                          {reply.updatedAt &&
                            reply.updatedAt !== reply.createdAt && (
                              <p className="text-xs text-gray-400 mt-2 font-estedad-light">
                                ویرایش شده در{" "}
                                {formatJalali(new Date(reply.updatedAt))}
                              </p>
                            )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* فرم پاسخ */}
            <div className="mt-6">
              {!showReplyForm ? (
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="w-full px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-estedad-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <i className="far fa-reply"></i>
                  پاسخ به این نظر
                </button>
              ) : (
                <form onSubmit={handleReplySubmit} className="space-y-3">
                  <div>
                    <label className="text-sm font-estedad-semibold text-gray-700 block mb-2">
                      متن پاسخ
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="پاسخ خود را بنویسید (حداقل ۱۰ کاراکتر)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-estedad-light"
                      rows={4}
                      disabled={isSubmittingReply}
                    />
                    <p className="text-xs text-gray-500 mt-1 font-estedad-light">
                      {replyContent.length}/1000 کاراکتر
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={
                        isSubmittingReply || replyContent.trim().length < 10
                      }
                      className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmittingReply ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          در حال ارسال...
                        </>
                      ) : (
                        <>
                          <i className="far fa-paper-plane"></i>
                          ارسال پاسخ
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyContent("");
                      }}
                      disabled={isSubmittingReply}
                      className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-estedad-semibold transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCommentModal;
