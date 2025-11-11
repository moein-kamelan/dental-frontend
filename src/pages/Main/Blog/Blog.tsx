import { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import BlogCard from "../../../components/modules/Main/BlogCard/BlogCard";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import { useGetAllArticles } from "../../../hooks/useArticles";
import MainPagination from "../../../components/modules/Main/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Article } from "../../../types/types";

function Blog() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: articles, isLoading } = useGetAllArticles(
    page,
    limit,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasArticles =
    articles?.data?.articles && articles.data.articles.length > 0;

  return (
    <>
      <Breadcrumb />
      <SearchForm articles={articles} />

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState text="در حال بارگذاری مقالات..." />
          ) : hasArticles ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles?.data?.articles?.map((article: Article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>

              <MainPagination
                meta={articles?.meta}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState
              icon="fas fa-newspaper"
              title="هیچ مقاله‌ای یافت نشد"
              description="در حال حاضر هیچ مقاله‌ای منتشر نشده است. لطفاً بعداً مراجعه کنید."
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;
