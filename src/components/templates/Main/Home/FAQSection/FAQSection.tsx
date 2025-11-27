import FAQItem from "../../../../modules/Main/FAQItem/FAQItem";
import { motion } from "motion/react";
import { useGetAllFaqs } from "../../../../../services/useFaqs";

interface FaqType {
  id: string;
  question: string;
  answer: string;
}

function FAQSection() {
  const { data: faqs } = useGetAllFaqs(1, 4, true);
  return (
    <section className="py-20 md:py-24 bg-gray-50 ">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <h5 className="custom-sub-title mx-auto ">سوالات متداول</h5>
          <h2 className="custom-title text-center">
            سوالات خود را از ما بپرسید
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            {faqs?.data?.faqs?.map((faq: FaqType) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
