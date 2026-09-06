import React from 'react'
import type { Category } from '../../../../types/types'
import { Link } from 'react-router-dom'

function CategoryBox({ categories, isArticleCategory }: { categories: Category[], isServiceCategory?: boolean, isArticleCategory?: boolean } ) {
  const categoryBasePath = isArticleCategory ? "/blog" : "/services";
  
  return (
      <aside className="content-aside-card category-panel text-dark p-6" aria-label="دسته‌بندی مطالب">
                <h5 className="main-header">دسته‌بندی</h5>
                <ul className="space-y divide-y-2 divide-main-border-color">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link to={`${categoryBasePath}?categorySlug=${category.slug}`} className="category-link flex items-center justify-between text-dark transition p-4">
            {category.name}
            <i className="fa fa-angle-left text-paragray"></i>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);
}

export default CategoryBox;
