import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import FAQItem from "../../../components/modules/Main/FAQItem/FAQItem";
import FaqContent from "../../../components/templates/Main/Faq/FaqContent/FaqContent";
import FaqForm from "../../../components/templates/Main/Faq/FaqFrom/FaqForm";
import { useGetAllFaqs } from "../../../services/useFaqs";

interface FaqType {
  id: string;
  question: string;
  answer: string;
}

function FAQ() {
  const { data: faqs } = useGetAllFaqs(1, 10, true);
  return (
    <>
      <Breadcrumb />

      <section className="pt-10 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* استفاده از grid با items-start تا هر آیتم ارتفاع مستقل داشته باشه */}
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-start">
            {faqs?.data?.faqs?.map((faq: FaqType) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 ">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <FaqContent />
            <FaqForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
