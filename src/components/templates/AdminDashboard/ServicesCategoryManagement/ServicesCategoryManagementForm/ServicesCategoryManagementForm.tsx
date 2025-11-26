import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import {
  useCreateServiceCategory,
  useUpdateServiceCategory,
} from "../../../../../services/useCategories";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { ServiceCategory } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";

function ServicesCategoryManagementForm({
  category,
}: {
  category?: ServiceCategory;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createCategory } = useCreateServiceCategory();
  const { mutateAsync: updateCategory } = useUpdateServiceCategory();

  const isEditMode = !!category?.id;

  const validationSchema = Yup.object({
    name: Yup.string().required("نام دسته‌بندی الزامی است"),
    description: Yup.string(),
    order: Yup.number()
      .integer("ترتیب نمایش باید یک عدد صحیح باشد")
      .min(0, "ترتیب نمایش نمی‌تواند منفی باشد"),
    published: Yup.boolean(),
  });

  const handleSubmit = async (
    values: {
      name: string;
      description: string;
      order: number;
      published: boolean;
    },
    resetForm: () => void
  ) => {
    try {
      const data: {
        name: string;
        description?: string;
        order?: number;
        published?: boolean;
      } = {
        name: values.name,
      };

      if (values.description) {
        data.description = values.description;
      }

      if (values.order !== undefined && values.order !== null) {
        data.order = values.order;
      }

      if (values.published !== undefined) {
        data.published = values.published;
      }

      if (isEditMode && category?.id) {
        await updateCategory({ id: category.id, data });
        showSuccessToast("دسته‌بندی با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["serviceCategories"] });
        queryClient.invalidateQueries({ queryKey: ["serviceCategory"] });
        navigate("/admin-dashboard/services-category-management");
      } else {
        await createCategory(data);
        showSuccessToast("دسته‌بندی با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["serviceCategories"] });
        queryClient.invalidateQueries({ queryKey: ["serviceCategory"] });
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
          ? "خطایی در ویرایش دسته‌بندی رخ داد"
          : "خطایی در ایجاد دسته‌بندی رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        name: category?.name || "",
        description: category?.description || "",
        order: category?.order ?? 0,
        published: category?.published ?? true,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            name: values.name,
            description: values.description,
            order: Number(values.order),
            published: values.published,
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
                labelText="نام دسته‌بندی"
                placeholder="نام دسته‌بندی را وارد کنید"
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
                labelText="ترتیب نمایش"
                placeholder="ترتیب نمایش را وارد کنید"
                optional
                className="bg-white"
                name="order"
                type="number"
                value={formik.values.order?.toString() || "0"}
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(
                    "order",
                    value === "" ? 0 : parseInt(value, 10)
                  );
                }}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.order && formik.errors.order
                    ? formik.errors.order
                    : null
                }
              />
            </div>

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات دسته‌بندی را وارد کنید"
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

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formik.values.published}
                  onChange={(e) =>
                    formik.setFieldValue("published", e.target.checked)
                  }
                  className="w-5 h-5 rounded border-2 border-main-border-color text-primary focus:ring-primary"
                />
                <span className="text-dark font-estedad-lightbold">
                  منتشر شده
                </span>
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
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

export default ServicesCategoryManagementForm;

