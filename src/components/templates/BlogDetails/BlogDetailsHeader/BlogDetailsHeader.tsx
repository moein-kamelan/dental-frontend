import React from "react";
import { formatJalali } from "../../../../utils/helpers";
import type { Category } from "../../../../types/types";

function BlogDetailsHeader({
  title,
  categories,
  createdAt,
  updatedAt,
  commentsCount,
  likesCount,
  sharesCount,
  author,
}: {
  title: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  commentsCount: number;
  likesCount: number;
  sharesCount: number;
  author: any;
}) {
  console.log(author);
  
  return (
    <div className="px-8 pt-8 ">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <ul className="flex flex-wrap gap-6 text-paragray">
          <li>
            <span className="bg-accent text-white px-4 py-2 rounded-[10px] text-sm font-estedad-light ">
              {categories[0].name}
            </span>
          </li>
          <li className="flex items-center gap-2 font-estedad-light">
            <i className="far fa-user text-accent"></i>{author}
          </li>
          <li className="flex items-center gap-2 font-estedad-light">
            <i className="far fa-calendar-alt text-accent"></i>
            {formatJalali(createdAt)}
          </li>
        </ul>
        <ul className="flex flex-wrap gap-6 text-paragray">
          <li className="flex items-center gap-2 font-estedad-light">
            <i className="far fa-comment"></i>۰۵
          </li>
    
        </ul>
      </div>
      <h2 className="text-3xl font-estedad-semibold text-dark">{title}</h2>
    </div>
  );
}

export default BlogDetailsHeader;
