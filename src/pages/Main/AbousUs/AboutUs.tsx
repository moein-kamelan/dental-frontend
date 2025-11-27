import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import AboutUsSection from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import StatsCounter from "../../../components/templates/Main/AboutUs/StatsCounter/StatsCounter";
import Appointment from "../../../components/modules/Main/Appointment/Appointment";
import BlogSection from "../../../components/modules/Main/BlogSection/BlogSection";

function AboutUs() {
  return (
    <>
      <Breadcrumb />
      <AboutUsSection />
      <StatsCounter />
      <Appointment />
      <BlogSection />
    </>
  );
}

export default AboutUs;
