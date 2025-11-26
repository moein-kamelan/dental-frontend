import React from 'react'
import { useGetCommentsById } from '../../../../services/useComments';
import LoadingState from '../LoadingState/LoadingState';
import type { Comment } from '../../../../types/types';
import { formatJalali } from '../../../../utils/helpers';

function CommentsBox( { doctorId, articleId, serviceId }: { doctorId?: string, articleId?: string, serviceId?: string } ) {
  const { data: comments, isLoading } = useGetCommentsById(doctorId || articleId || serviceId || "", doctorId ? "doctor" : articleId ? "article" : "service" );
  if (isLoading) return <LoadingState />;
  return (
    <div className="section-border p-4 md:p-7.5">
                <div></div>
                <h2 className="text-2xl font-estedad-semibold ">
                  مجموع دیدگاه ({comments?.data?.comments?.length})
                </h2>

                <div className="space-y-6">
                    {comments?.data?.comments?.map((comment : Comment) => (

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
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
                              {Array.from({ length: comment.rating || 0 }).map((_, index) => (
                                <i className="fas fa-star" key={index}></i>
                              ))}
                              {Array.from({ length: 5 - (comment.rating || 0) }).map((_, index) => (
                                <i className="fas fa-star text-gray-300" key={index}></i>
                              ))}
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>{formatJalali(new Date(comment.createdAt))}
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          {comment.content}
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                    ))}

                </div>
              </div>
  )
}

export default CommentsBox
