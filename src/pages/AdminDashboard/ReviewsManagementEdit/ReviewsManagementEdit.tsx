import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminDashboardHeader } from "../../../contexts";
import { useGetReviewById } from "../../../services/useReviews";
import ReviewManagementForm from "../../../components/templates/AdminDashboard/ReviewsManagement/ReviewManagementForm/ReviewManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ReviewsManagementEdit() {
  const { id } = useParams<{ id: string }>();
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { data: reviewData, isLoading } = useGetReviewById(id || "");

  useEffect(() => {
    setHeaderConfig({
      title: "ویرایش نظر",
      backButton: true,
    });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات نظر..." />;
  if (!reviewData?.data?.review) return <NotFound text="نظر یافت نشد" />;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">ویرایش نظر</h5>
        <ReviewManagementForm review={reviewData.data.review} />
      </SectionContainer>
    </main>
  );
}

export default ReviewsManagementEdit;
