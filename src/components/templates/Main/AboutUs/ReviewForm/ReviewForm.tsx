import { motion } from "motion/react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import { useCreateReview } from "../../../../../services/useReviews";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { ChangeEvent } from "react";

function ReviewForm() {
  const { mutateAsync: createReview, isPending } = useCreateReview();
  const queryClient = useQueryClient();

  const handleSubmit = async (
    values: {
      name: string;
      content: string;
      rating: number;
      profileImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("content", values.content);
      formData.append("rating", values.rating.toString());

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      const response = await createReview(formData);
      showSuccessToast(
        response.message ||
          "نظر شما با موفقیت ثبت شد. پس از تایید ادمین نمایش داده خواهد شد."
      );
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      resetForm();
    } catch (error) {
      console.log(error);
      showErrorToast("خطایی در ثبت نظر رخ داد");
    }
  };

  return (
    <section className="py-12 overflow-x-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 overflow-x-hidden">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-estedad-bold text-dark mb-3">
            دیدگاه خود را ثبت کنید
          </h2>
          <p className="text-paragray text-base md:text-lg max-w-2xl mx-auto">
            نظرات و پیشنهادات شما برای ما ارزشمند است
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Formik
              initialValues={{
                name: "",
                content: "",
                rating: 5,
                profileImage: null as File | null,
              }}
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
              validationSchema={Yup.object({
                name: Yup.string().required("نام الزامی است"),
                content: Yup.string()
                  .required("متن نظر الزامی است")
                  .min(10, "متن نظر باید حداقل 10 کاراکتر باشد"),
                rating: Yup.number()
                  .required("امتیاز الزامی است")
                  .min(1, "امتیاز باید بین 1 تا 5 باشد")
                  .max(5, "امتیاز باید بین 1 تا 5 باشد"),
              })}
            >
              {(formik) => {
                return (
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <CustomInput
                      labelText="نام"
                      placeholder="نام خود را وارد کنید"
                      requiredText
                      {...formik.getFieldProps("name")}
                      errorMessage={
                        formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null
                      }
                    />

                    <div>
                      <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                        امتیاز
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="flex items-center gap-2 mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => formik.setFieldValue("rating", star)}
                            className={`text-2xl transition-colors ${
                              star <= formik.values.rating
                                ? "text-secondary"
                                : "text-gray-300"
                            } hover:text-secondary`}
                          >
                            <i className="fas fa-star"></i>
                          </button>
                        ))}
                        <span className="text-paragray text-sm mr-2">
                          ({formik.values.rating} از 5)
                        </span>
                      </div>
                      {formik.touched.rating && formik.errors.rating && (
                        <div className="text-red-500 text-sm mt-1 mr-4">
                          {formik.errors.rating}
                        </div>
                      )}
                    </div>

                    <CustomTextArea
                      labelText="متن نظر"
                      placeholder="نظر خود را بنویسید..."
                      rows={5}
                      requiredText
                      className="min-h-[120px] w-full"
                      {...formik.getFieldProps("content")}
                      errorMessage={
                        formik.touched.content && formik.errors.content
                          ? formik.errors.content
                          : null
                      }
                    />

                    <div>
                      <CustomInput
                        inputType="file"
                        labelText="تصویر پروفایل (اختیاری)"
                        placeholder="تصویر پروفایل را انتخاب کنید"
                        optional
                        accept="image/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0] || null;
                          formik.setFieldValue("profileImage", file);
                        }}
                        errorMessage={
                          formik.touched.profileImage &&
                          formik.errors.profileImage
                            ? formik.errors.profileImage
                            : null
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full main-btn mt-6"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <div className="btn-loader"></div>
                      ) : (
                        "ثبت نظر"
                      )}
                    </button>
                  </form>
                );
              }}
            </Formik>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;

