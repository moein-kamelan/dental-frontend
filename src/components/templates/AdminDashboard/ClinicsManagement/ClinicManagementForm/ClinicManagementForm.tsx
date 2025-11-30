import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import {
  useCreateClinic,
  useUpdateClinic,
} from "../../../../../services/useClinics";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { Clinic } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber } from "../../../../../validators/phoneNumberValidator";

function ClinicManagementForm({ clinic }: { clinic?: Clinic }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createClinic } = useCreateClinic();
  const { mutateAsync: updateClinic } = useUpdateClinic();

  const isEditMode = !!clinic?.id;

  const validationSchema = Yup.object({
    name: Yup.string().required("نام کلینیک الزامی است"),
    address: Yup.string().required("آدرس الزامی است"),
    phoneNumber: Yup.string()
      .required("شماره تلفن الزامی است")
      .test("is-valid-phone", "شماره تلفن معتبر نیست", (value) => {
        try {
          formatPhoneNumber(value);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }),
    description: Yup.string(),
    latitude: Yup.number()
      .nullable()
      .min(-90, "عرض جغرافیایی باید بین -90 تا 90 باشد")
      .max(90, "عرض جغرافیایی باید بین -90 تا 90 باشد"),
    longitude: Yup.number()
      .nullable()
      .min(-180, "طول جغرافیایی باید بین -180 تا 180 باشد")
      .max(180, "طول جغرافیایی باید بین -180 تا 180 باشد"),
  });

  const handleSubmit = async (
    values: {
      name: string;
      address: string;
      phoneNumber: string;
      description: string;
      latitude: number | null;
      longitude: number | null;
    },
    resetForm: () => void
  ) => {
    try {
      const data: {
        name: string;
        address: string;
        phoneNumber: string;
        description?: string;
        latitude?: number | null;
        longitude?: number | null;
      } = {
        name: values.name,
        address: values.address,
        phoneNumber: values.phoneNumber,
      };

      if (values.description) {
        data.description = values.description;
      }

      if (values.latitude !== null && values.latitude !== undefined) {
        data.latitude = values.latitude;
      }

      if (values.longitude !== null && values.longitude !== undefined) {
        data.longitude = values.longitude;
      }

      if (isEditMode && clinic?.id) {
        await updateClinic({ id: clinic.id, data });
        showSuccessToast("کلینیک با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["clinics"] });
        queryClient.invalidateQueries({ queryKey: ["clinic"] });        navigate("/admin/clinics-management");
      } else {
        await createClinic(data);
        showSuccessToast("کلینیک با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["clinics"] });
        queryClient.invalidateQueries({ queryKey: ["clinic"] });
        // اسکرول به بالای container اصلی
        const scrollContainer = document.querySelector(".overflow-auto");
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (isEditMode
          ? "خطایی در ویرایش کلینیک رخ داد"
          : "خطایی در ایجاد کلینیک رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        name: clinic?.name || "",
        address: clinic?.address || "",
        phoneNumber: clinic?.phoneNumber || "",
        description: clinic?.description || "",
        latitude: clinic?.latitude ?? null,
        longitude: clinic?.longitude ?? null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            name: values.name,
            address: values.address,
            phoneNumber: values.phoneNumber,
            description: values.description,
            latitude:
              values.latitude === null || values.latitude === undefined
                ? null
                : Number(values.latitude),
            longitude:
              values.longitude === null || values.longitude === undefined
                ? null
                : Number(values.longitude),
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="نام کلینیک"
                placeholder="نام کلینیک را وارد کنید"
                className="bg-white"
                requiredText
                {...formik.getFieldProps("name")}
                errorMessage={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
              />

              <CustomInput
                labelText="شماره تماس"
                placeholder="شماره تماس را وارد کنید"
                requiredText
                className="bg-white"
                {...formik.getFieldProps("phoneNumber")}
                inputType="phone"
                errorMessage={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />
            </div>

            <CustomInput
              labelText="آدرس"
              placeholder="آدرس کلینیک را وارد کنید"
              requiredText
              className="bg-white"
              {...formik.getFieldProps("address")}
              errorMessage={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : null
              }
            />

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات کلینیک را وارد کنید"
              optional
              rows={4}
              className="bg-white"
              {...formik.getFieldProps("description")}
              errorMessage={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="عرض جغرافیایی (Latitude)"
                placeholder="مثال: 35.6892"
                optional
                className="bg-white"
                name="latitude"
                type="number"
                step="any"
                value={
                  formik.values.latitude === null
                    ? ""
                    : formik.values.latitude?.toString() || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(
                    "latitude",
                    value === "" ? null : parseFloat(value)
                  );
                }}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.latitude && formik.errors.latitude
                    ? formik.errors.latitude
                    : null
                }
              />

              <CustomInput
                labelText="طول جغرافیایی (Longitude)"
                placeholder="مثال: 51.3890"
                optional
                className="bg-white"
                name="longitude"
                type="number"
                step="any"
                value={
                  formik.values.longitude === null
                    ? ""
                    : formik.values.longitude?.toString() || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(
                    "longitude",
                    value === "" ? null : parseFloat(value)
                  );
                }}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.longitude && formik.errors.longitude
                    ? formik.errors.longitude
                    : null
                }
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش کلینیک" : "ایجاد کلینیک"}
                {formik.isSubmitting && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                )}
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default ClinicManagementForm;
