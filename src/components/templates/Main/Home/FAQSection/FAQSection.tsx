import FAQItem from "../../../../modules/Main/FAQItem/FAQItem";
import { motion } from "motion/react";
import { useGetAllFaqs } from "../../../../../services/useFaqs";
import { Link } from "react-router-dom";

interface FaqType {
  id: string;
  question: string;
  answer: string;
}

function FAQSection() {
  const { data: faqs } = useGetAllFaqs(1, 4, true);
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4"
            style={{ fontFamily: 'var(--font-vazir)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            سوالات خود را از ما بپرسید
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
          <motion.p
            className="text-paragray text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            پاسخ سوالات رایج خود را در این بخش پیدا کنید
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs?.data?.faqs?.map((faq: FaqType, index: number) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>

          {/* View All FAQ Button */}
          {faqs?.data?.faqs && faqs.data.faqs.length > 0 && (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-accent text-accent rounded-2xl font-estedad-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>مشاهده همه سوالات</span>
                <i className="fas fa-arrow-left"></i>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
