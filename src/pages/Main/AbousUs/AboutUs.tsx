import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import AboutUsSection from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import StatsCounter from "../../../components/templates/Main/AboutUs/StatsCounter/StatsCounter";
import Appointment from "../../../components/modules/Main/Appointment/Appointment";
import Process from "../../../components/modules/Main/Process/Process";
import Team from "../../../components/modules/Main/Team/Team";
import HelpLine from "../../../components/modules/Main/HelpLine/HelpLine";
import BlogSection from "../../../components/modules/Main/BlogSection/BlogSection";

function AboutUs() {
  return (
    <>
      <Breadcrumb />
      <AboutUsSection />
      <StatsCounter />
      <Appointment />
      <Process />
      <Team />
      <HelpLine />
      <BlogSection />
    </>
  );
}

export default AboutUs;
