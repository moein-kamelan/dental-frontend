import React from "react";
import Banner from "../../../components/templates/Main/Home/Banner/Banner";
import AboutUs from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import Services from "../../../components/templates/Main/Home/Services/Services";
import FAQSection from "../../../components/templates/Main/Home/FAQSection/FAQSection";
import Process from "../../../components/modules/Main/Process/Process";
import Appointment from "../../../components/modules/Main/Appointment/Appointment";
import Team from "../../../components/modules/Main/Team/Team";
import Review from "../../../components/templates/Main/Home/Review/Review";
import BlogSection from "../../../components/modules/Main/BlogSection/BlogSection";

function Home() {
  return (
    <>
      <Banner />
      <AboutUs />
      <Services />
      <FAQSection />
      <Process />
      <Appointment />
      <Team />
      <Review />
      <BlogSection />
    </>
  );
}

export default Home;
