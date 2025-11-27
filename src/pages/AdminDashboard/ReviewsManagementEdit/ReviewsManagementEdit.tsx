import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminDashboardHeader } from "../../../contexts";
import { useGetReviewById } from "../../../services/useReviews";
import ReviewManagementForm from "../../../components/templates/AdminDashboard/ReviewsManagement/ReviewManagementForm/ReviewManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import TableSkeleton from "../../../components/modules/TableSkeleton/TableSkeleton";

function ReviewsManagementEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { data: reviewData, isLoading } = useGetReviewById(id || "");

  useEffect(() => {
    setHeaderConfig({
      title: "ویرایش نظر",
      backButton: true,
      backButtonPath: "/admin/reviews-management",
    });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) {
    return (
      <main>
        <SectionContainer>
          <TableSkeleton rows={5} columns={1} />
        </SectionContainer>
      </main>
    );
  }

  if (!reviewData?.data?.review) {
    return (
      <main>
        <SectionContainer>
          <div className="text-center p-8">
            <p className="text-paragray font-estedad-light">
              نظر یافت نشد
            </p>
            <button
              onClick={() => navigate("/admin/reviews-management")}
              className="mt-4 purple-btn"
            >
              بازگشت به لیست
            </button>
          </div>
        </SectionContainer>
      </main>
    );
  }

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

