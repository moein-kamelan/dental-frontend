import React from 'react'
import type { Category } from '../../../../types/types'
import { Link } from 'react-router-dom'

function CategoryBox({ categories , isServiceCategory , isArticleCategory }: { categories: Category[] , isServiceCategory?: boolean   , isArticleCategory?: boolean } ) {

  
  
  return (
      <div className=" section-border text-dark p-6">
                <h5 className="main-header">دسته‌بندی</h5>
                <ul className="space-y divide-y-2 divide-main-border-color">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link to ={`${isArticleCategory ?`/blog?categorySlug=${category.slug}` : `/services?categorySlug=${category.slug}`}`} className="flex items-center justify-between text-dark hover:text-primary transition p-4">
            {category.name}
            <i className="fa fa-angle-left text-paragray"></i>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
}

export default CategoryBox;
