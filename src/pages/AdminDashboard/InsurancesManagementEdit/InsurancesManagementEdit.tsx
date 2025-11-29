import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import InsuranceManagementForm from "../../../components/templates/AdminDashboard/InsurancesManagement/InsuranceManagementForm/InsuranceManagementForm";
import { useParams } from "react-router-dom";
import { useGetInsuranceById } from "../../../services/useInsurances";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../NotFound/NotFound";

function InsurancesManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: insurance, isLoading } = useGetInsuranceById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش سازمان بیمه", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات سازمان بیمه..." />;
  if (!insurance) return <NotFound text="سازمان بیمه یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش سازمان بیمه</h5>
        <InsuranceManagementForm insurance={insurance?.data?.organization} />
      </SectionContainer>
    </main>
  );
}

export default InsurancesManagementEdit;
