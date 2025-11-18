import React from "react";
import { formatJalali } from "../../../../utils/helpers";
import { useGetAllArticles } from "../../../../hooks/useArticles";
import type { Article } from "../../../../types/types";
import { Link } from "react-router-dom";

function RecentPosts() {
  const { data: recentPosts } = useGetAllArticles(1, 3);
  return (
    <div className="section-border  p-6">
      <h5 className="main-header mb-4">پست‌های جدید</h5>
      <ul className="space-y-4">
        {recentPosts?.data?.articles.map((recentPost: Article) => (
          <Link to={`/blog/${recentPost.slug}`} className="flex gap-3  group">
          <img
            src="/images/blog_dtls-2.jpg"
            alt="post"
            className="size-20 rounded-lg object-cover shrink-0"
          />
          <div className="">
            <p className="font-estedad-light text-paragray mb-2 ">
              <i className="fas fa-calendar-alt ml-1 text-primary "></i>
              {formatJalali(new Date(recentPost.createdAt))}
            </p>
            <p
              className=" text-dark group-hover:text-accent w-full line-clamp-2 "
            >
              {recentPost.title}
            </p>
            </div>
          </Link>
        ))}
 
      </ul>
    </div>
  );
}

export default RecentPosts;
