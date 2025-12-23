import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import AboutUsSection from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import StatsCounter from "../../../components/templates/Main/AboutUs/StatsCounter/StatsCounter";

function AboutUs() {
  return (
    <>
      <Breadcrumb />
      <AboutUsSection />
      <StatsCounter />
    </>
  );
}

export default AboutUs;
