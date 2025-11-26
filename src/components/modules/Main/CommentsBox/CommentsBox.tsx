import { useGetCommentsById } from "../../../../services/useComments";
import LoadingState from "../LoadingState/LoadingState";
import type { Comment } from "../../../../types/types";
import { formatJalali } from "../../../../utils/helpers";

function CommentsBox({
  doctorId,
  articleId,
  serviceId,
}: {
  doctorId?: string;
  articleId?: string;
  serviceId?: string;
}) {
  const { data: comments, isLoading } = useGetCommentsById(
    doctorId || articleId || serviceId || "",
    doctorId ? "doctor" : articleId ? "article" : "service"
  );
  if (isLoading) return <LoadingState />;
  return (
    <div className="section-border p-4 md:p-7.5">
      <div></div>
      <h2 className="text-2xl font-estedad-semibold ">
        مجموع دیدگاه ({comments?.data?.comments?.length})
      </h2>

      <div className="space-y-6">
        {comments?.data?.comments?.map((comment: Comment) => (
          <div
            key={comment.id}
            className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 "
          >
            <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
              <img
                src="../../../../public/images/comment-1.png"
                alt="reviewer"
                className="size-20 rounded-full shrink-0 justify-self-center"
              />
              <div className="flex-1  space-y-2.5">
                <div className="flex items-start justify-between  flex-wrap  gap-4">
                  <div className="space-y-2.5">
                    <h4 className="font-estedad-semibold text-xl">
                      {comment.user.firstName} {comment.user.lastName}
                    </h4>

                    <div className="flex gap-1 text-secondary">
                      {Array.from({ length: comment.rating || 0 }).map(
                        (_, index) => (
                          <i className="fas fa-star" key={index}></i>
                        )
                      )}
                      {Array.from({ length: 5 - (comment.rating || 0) }).map(
                        (_, index) => (
                          <i
                            className="fas fa-star text-gray-300"
                            key={index}
                          ></i>
                        )
                      )}
                    </div>
                  </div>

                  <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                    <i className="far fa-clock "></i>
                    {formatJalali(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-paragray font-estedad-light">
                  {comment.content}
                </p>
       

                {/* نمایش پاسخ‌ها */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pr-4 space-y-4 border-r-2 border-primary/20">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-primary/10 rounded-lg p-4 border-r-4 border-primary/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <i className="far fa-user text-primary text-xs"></i>
                            </div>
                            <span className="text-sm font-estedad-medium text-dark">
                              {reply.user.firstName} {reply.user.lastName}
                            </span>
                          </div>
                          <span className="text-xs text-paragray font-estedad-light">
                            {formatJalali(new Date(reply.createdAt))}
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light text-sm leading-6 whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsBox;
