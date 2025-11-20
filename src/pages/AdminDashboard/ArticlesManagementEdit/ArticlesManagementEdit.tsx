import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ArticleManagementForm from "../../../components/templates/AdminDashboard/ArticlesManagement/ArticleManagementForm/ArticleManagementForm";
import { useParams } from "react-router-dom";
import { useGetArticleByIdentifier } from "../../../services/useArticles";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ArticlesManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: article, isLoading } = useGetArticleByIdentifier(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش مقاله", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات مقاله..." />;
  if (!article) return <NotFound text="مقاله یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش مقاله</h5>
        <ArticleManagementForm article={article?.data?.article} />
      </SectionContainer>
    </main>
  );
}

export default ArticlesManagementEdit;
