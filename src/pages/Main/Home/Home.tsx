import Banner from "../../../components/templates/Main/Home/Banner/Banner";
import AboutUs from "../../../components/modules/Main/AboutUsSection/AboutUsSection";
import Services from "../../../components/templates/Main/Home/Services/Services";
import FAQSection from "../../../components/templates/Main/Home/FAQSection/FAQSection";
import Process from "../../../components/modules/Main/Process/Process";
// import Appointment from "../../../components/modules/Main/Appointment/Appointment";
import Team from "../../../components/modules/Main/Team/Team";
import Review from "../../../components/templates/Main/Home/Review/Review";
import BlogSection from "../../../components/modules/Main/BlogSection/BlogSection";
import SEO from "../../../components/SEO/SEO";
import { generateMedicalBusinessSchema } from "../../../utils/structuredData";

function Home() {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  
  // Structured Data for Medical Business
  const medicalBusinessSchema = generateMedicalBusinessSchema({
    name: "کلینیک دندان پزشکی طاها",
    description: "کلینیک دندان پزشکی طاها ارائه دهنده بهترین خدمات دندانپزشکی با کادری مجرب و تجهیزات مدرن",
    url: `${siteUrl}/home`,
    image: `${siteUrl}/images/logo.png`,
    address: {
      addressLocality: "تهران",
      addressCountry: "IR",
    },
  });

  return (
    <>
      <SEO
        title="کلینیک دندان پزشکی طاها - بهترین خدمات دندانپزشکی"
        description="کلینیک دندان پزشکی طاها ارائه دهنده بهترین خدمات دندانپزشکی با کادری مجرب و تجهیزات مدرن. خدمات شامل: ایمپلنت، ارتودنسی، زیبایی دندان و سایر خدمات تخصصی"
        keywords="دندانپزشکی, کلینیک دندانپزشکی, دندانپزشک, خدمات دندانپزشکی, ایمپلنت, ارتودنسی, زیبایی دندان, کلینیک طاها"
        url="/home"
        structuredData={medicalBusinessSchema}
      />
      <Banner />
      <AboutUs />
      <Services />
      <FAQSection />
      {/* <Process /> */}
      {/* <Appointment /> */}
      <Team />
      <Review />
      <BlogSection />
    </>
  );
}

export default Home;
