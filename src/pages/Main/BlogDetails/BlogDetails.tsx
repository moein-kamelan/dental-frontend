import StickyBox from "react-sticky-box";
import SearchBox from "../../../components/modules/Main/SearchBox/SearchBox";
import CategoryBox from "../../../components/modules/Main/CategoryBox/CategoryBox";
import RecentPosts from "../../../components/modules/Main/RecentPosts/RecentPosts";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
import { useParams } from "react-router-dom";
import { useGetArticleBySlug } from "../../../services/useArticles";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import BlogDetailsHeader from "../../../components/templates/BlogDetails/BlogDetailsHeader/BlogDetailsHeader";
import BlogDetailsTagsAndShare from "../../../components/templates/BlogDetails/BlogDetailsTagsAndShare/BlogDetailsTagsAndShare";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import { getImageUrl } from "../../../utils/helpers";

function BlogDetails() {
  const { slug } = useParams();

  const { data: article, isLoading } = useGetArticleBySlug(slug as string);

  if (isLoading) return <LoadingState text="در حال بارگذاری مقاله..." />;

  return (
    <>
      <Breadcrumb />
      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* <!-- Main Content --> */}
            <div className="lg:col-span-3">
              <div className="">
                {/* <!-- Image --> */}
                <div className="relative">
                  {article?.data?.article?.coverImage ? (
                    <img
                      src={getImageUrl(article.data.article.coverImage)}
<<<<<<< HEAD
                      alt={article?.data?.article?.title}
                      className="w-8/10 mx-auto h-150 rounded-xl  object-fill"
=======
                    alt={article?.data?.article?.title}
                      className="w-8/10 mx-auto h-150 rounded-xl object-cover"
>>>>>>> 65c5f08c40ddb2da94e4fc1b334888db9bbecbb0
                    />
                  ) : (
                    <div className="w-8/10 mx-auto h-150 rounded-xl bg-gray-100 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="fas fa-image text-gray-400 text-2xl"></i>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm font-estedad-light">
                          تصویر مقاله
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* <!-- Header Info --> */}
                <BlogDetailsHeader
                  title={article?.data?.article?.title}
                  categories={article?.data?.article?.categories}
                  createdAt={article?.data?.article?.createdAt}
                  updatedAt={article?.data?.article?.updatedAt}
                  commentsCount={article?.data?.article?.commentsCount}
                  likesCount={article?.data?.article?.likesCount}
                  sharesCount={article?.data?.article?.sharesCount}
                  author={article?.data?.article?.author}
                />

                {/* <!-- Content --> */}
                <div className="text-dark font-estedad-light text-lg leading-relaxed article-content">
                  <div
                    className="py-8 px-10"
                    dangerouslySetInnerHTML={{
                      __html: article?.data?.article?.content,
                    }}
                  />
                </div>

                <BlogDetailsTagsAndShare />
                <div className="flex flex-col gap-8">
                  <CommentsBox articleId={article?.data?.article?.id} />
                  <CommentForm articleId={article?.data?.article?.id} />
                </div>
              </div>
            </div>

            <StickyBox className="max-lg:static!">
              <div className="lg:col-span-1 space-y-6">
                <SearchBox isArticleCategory />
                <CategoryBox
                  categories={article?.data?.article?.categories}
                  isArticleCategory
                />
                <RecentPosts
                  articles={article?.data?.article?.articles || []}
                />
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetails;
