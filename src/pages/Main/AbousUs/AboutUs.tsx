import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import AboutUsSection from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import SEO from "../../../components/SEO/SEO";

function AboutUs() {
  return (
    <>
      <SEO
        title="درباره ما - کلینیک دندان پزشکی طاها"
        description="درباره کلینیک دندان پزشکی طاها - تاریخچه، تیم پزشکی، تجهیزات و خدمات ما. ما با سال‌ها تجربه در زمینه دندانپزشکی در خدمت شما هستیم"
        keywords="درباره ما, کلینیک طاها, تاریخچه کلینیک, تیم پزشکی, تجهیزات دندانپزشکی"
        url="/about-us"
      />
      <Breadcrumb />
      <AboutUsSection />
    </>
  );
}

export default AboutUs;
