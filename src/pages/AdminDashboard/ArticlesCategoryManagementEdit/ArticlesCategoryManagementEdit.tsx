import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ArticlesCategoryManagementForm from "../../../components/templates/AdminDashboard/ArticlesCategoryManagement/ArticlesCategoryManagementForm/ArticlesCategoryManagementForm";
import { useParams } from "react-router-dom";
import { useGetArticleCategoryByIdentifier } from "../../../services/useCategories";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ArticlesCategoryManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: category, isLoading } = useGetArticleCategoryByIdentifier(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش دسته‌بندی", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات دسته‌بندی..." />;
  if (!category) return <NotFound text="دسته‌بندی یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش دسته‌بندی</h5>
        <ArticlesCategoryManagementForm category={category?.data?.category} />
      </SectionContainer>
    </main>
  );
}

export default ArticlesCategoryManagementEdit;

