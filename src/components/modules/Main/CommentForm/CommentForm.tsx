import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateComment } from "../../../../services/useComments";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastify";

const validationSchema = Yup.object({
  content: Yup.string()
    .required("متن نظر الزامی است")
    .min(3, "نظر باید حداقل ۳ کاراکتر باشد")
    .max(1000, "نظر نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
  rating: Yup.number()
    .integer("امتیاز باید عدد صحیح باشد")
    .min(1, "امتیاز باید بین ۱ تا ۵ باشد")
    .max(5, "امتیاز باید بین ۱ تا ۵ باشد")
    .required("امتیاز الزامی است"),
});

function CommentForm({
  doctorId,
  articleId,
  serviceId,
}: {
  doctorId?: string;
  articleId?: string;
  serviceId?: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: createComment, isPending } = useCreateComment();

  const handleSubmit = async (
    values: { content: string; rating: number },
    resetForm: () => void
  ) => {
    try {
      const id = doctorId || articleId || serviceId || "";
      const type = doctorId ? "doctor" : articleId ? "article" : "service";

      await createComment({
        comment: {
          content: values.content,
          rating: values.rating,
        },
        type,
        id,
      });
      showSuccessToast("نظر شما با موفقیت ثبت شد و در انتظار تایید مدیر است");

      // Invalidate infinite query
      queryClient.invalidateQueries({
        queryKey: ["comments-infinite", id, type],
      });

      // Also invalidate old query key for backward compatibility
      queryClient.invalidateQueries({
        queryKey: ["comments", id, type],
      });

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
      showErrorToast("خطایی در ثبت نظر رخ داد");
    }
  };

  return (
    <div className="p-4 md:p-7.5 section-border rounded-[10px]">
      <h2 className="text-2xl font-estedad-semibold text-dark mb-6">
        ارسال دیدگاه
      </h2>
      <Formik
        initialValues={{
          content: "",
          rating: 5,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex gap-1 mb-6">
              <i
                className={`fas fa-star text-xl cursor-pointer ${
                  formik.values.rating >= 1 ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", 1)}
              ></i>
              <i
                className={`fas fa-star text-xl cursor-pointer ${
                  formik.values.rating >= 2 ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", 2)}
              ></i>
              <i
                className={`fas fa-star text-xl cursor-pointer ${
                  formik.values.rating >= 3 ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", 3)}
              ></i>
              <i
                className={`fas fa-star text-xl cursor-pointer ${
                  formik.values.rating >= 4 ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", 4)}
              ></i>
              <i
                className={`fas fa-star text-xl cursor-pointer ${
                  formik.values.rating >= 5 ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", 5)}
              ></i>
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <div className="text-red-500 text-sm">{formik.errors.rating}</div>
            )}

            <div>
              <textarea
                rows={4}
                placeholder="ارسال دیدگاه..."
                className={`w-full px-6 py-4 border rounded-2xl focus:outline-none ${
                  formik.touched.content && formik.errors.content
                    ? "border-red-500"
                    : "border-gray-200 focus:border-accent"
                }`}
                {...formik.getFieldProps("content")}
              />
              {formik.touched.content && formik.errors.content && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.content}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-accent text-white px-8 py-4 rounded-full hover:bg-secondary transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending || !formik.isValid}
            >
              {isPending ? "در حال ارسال..." : "ارسال سریع"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CommentForm;
