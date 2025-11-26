import React from "react";
import { formatJalali } from "../../../../utils/helpers";
import type { Article, Service } from "../../../../types/types";
import { Link } from "react-router-dom";

function RecentPosts({ articles, services }: { articles?: Article[], services?: Service[] }) {
  const recentPosts = [...articles || [], ...services || []].slice(0, 3);
  return (
    <div className="section-border  p-6">
      <h5 className="main-header mb-4">پست‌های جدید</h5>
      <ul className="space-y-4">
        {recentPosts.map((recentPost: Article | Service) => (
          <Link to={`/blog/${recentPost.slug}`} className="flex gap-3  group">
            <img
              src={`http://localhost:4000${recentPost.coverImage}`}
              alt="post"
              className="size-20 rounded-lg  shrink-0"
            />
            <div className="">
              <p className="font-estedad-light text-paragray mb-2 ">
                <i className="fas fa-calendar-alt ml-1 text-primary "></i>
                {formatJalali(new Date(recentPost.createdAt))}
              </p>
              <p className=" text-dark group-hover:text-accent w-full line-clamp-2 ">
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
