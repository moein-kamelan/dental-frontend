import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import BlogCard from "../../../components/modules/Main/BlogCard/BlogCard";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import { useGetAllArticles } from "../../../hooks/useArticles";
import MainPagination from "../../../components/modules/Main/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Article } from "../../../types/types";

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // خواندن مقادیر از URL
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const search = searchParams.get("search") || "";

  const { data: articles, isLoading } = useGetAllArticles(page, limit,search );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString(), search: search });
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
