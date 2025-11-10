import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import FAQItem from "../../../components/modules/Main/FAQItem/FAQItem";
import { Link } from "react-router-dom";
import FaqForm from "../../../components/templates/Main/Faq/FaqFrom/FaqForm";
import FaqContent from "../../../components/templates/Main/Faq/FaqContent/FaqContent";

function FAQ() {
  return (
    <>
      <Breadcrumb />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 ">
            <div className="space-y-4">
              <FAQItem />
              <FAQItem />
              <FAQItem />
            </div>
            <div className="space-y-4">
              <FAQItem />
              <FAQItem />
              <FAQItem />
            </div>
          </div>
        </div>
      </section>

 
    </>
  );
}

export default FAQ;
