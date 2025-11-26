import React, { useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import { useCreateFaq, useUpdateFaq } from "../../../../../services/useFaqs";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt: string;
}

function FaqManagementForm({ faq }: { faq?: Faq }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createFaq } = useCreateFaq();
  const { mutateAsync: updateFaq } = useUpdateFaq();

  const isEditMode = !!faq?.id;

  const validationSchema = useMemo(
    () =>
      Yup.object({
        question: Yup.string()
          .required("سوال الزامی است")
          .min(10, "سوال باید حداقل ۱۰ کاراکتر باشد")
          .max(500, "سوال نباید بیشتر از ۵۰۰ کاراکتر باشد"),
        answer: Yup.string()
          .required("پاسخ الزامی است")
          .min(10, "پاسخ باید حداقل ۱۰ کاراکتر باشد"),
        order: Yup.number()
          .integer("ترتیب باید عدد صحیح باشد")
          .min(0, "ترتیب نمی‌تواند منفی باشد"),
        published: Yup.boolean(),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      question: string;
      answer: string;
      order: number;
      published: boolean;
    },
    resetForm: () => void
  ) => {
    try {
      if (isEditMode && faq?.id) {
        await updateFaq({
          id: faq.id,
          data: {
            question: values.question,
            answer: values.answer,
            order: values.order,
            published: values.published,
          },
        });
        showSuccessToast("سوال با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["faqs"] });
        queryClient.invalidateQueries({ queryKey: ["faq"] });
        navigate("/admin/faqs-management");
      } else {
        await createFaq({
          question: values.question,
          answer: values.answer,
          order: values.order,
          published: values.published,
        });
        showSuccessToast("سوال با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["faqs"] });
        queryClient.invalidateQueries({ queryKey: ["faq"] });
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
          ? "خطایی در ویرایش سوال رخ داد"
          : "خطایی در ایجاد سوال رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        question: faq?.question || "",
        answer: faq?.answer || "",
        order: faq?.order ?? 0,
        published: faq?.published ?? true,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            question: values.question,
            answer: values.answer,
            order: values.order,
            published: values.published,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <CustomTextArea
              labelText="سوال"
              placeholder="سوال را وارد کنید"
              className="bg-white"
              requiredText
              rows={3}
              {...formik.getFieldProps("question")}
              errorMessage={
                formik.touched.question && formik.errors.question
                  ? formik.errors.question
                  : null
              }
            />

            <CustomTextArea
              labelText="پاسخ"
              placeholder="پاسخ را وارد کنید"
              requiredText
              rows={6}
              className="bg-white"
              {...formik.getFieldProps("answer")}
              errorMessage={
                formik.touched.answer && formik.errors.answer
                  ? formik.errors.answer
                  : null
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="ترتیب"
                placeholder="ترتیب نمایش را وارد کنید"
                className="bg-white"
                inputType="number"
                {...formik.getFieldProps("order")}
                errorMessage={
                  formik.touched.order && formik.errors.order
                    ? formik.errors.order
                    : null
                }
              />

              <div className="flex items-center gap-4 pt-8">
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
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش سوال" : "ایجاد سوال"}
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

export default FaqManagementForm;
