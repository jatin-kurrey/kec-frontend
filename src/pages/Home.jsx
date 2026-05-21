import React, { useRef, useEffect } from "react";
import SEO from "../components/SEO";
import Herosection from "../components/Herosection";
import PlacementPartners from "../components/PlacementPartners";
import AchievementsMarquee from "../components/AchievementsMarquee";
import NoticeBoard from "../components/NoticeBoard";
import CoursesOffered from "../components/CoursesOffered";
import AboutSection from "../components/AboutSection";
import Leadership from "../components/Leadership";
import AlumniSection from "../components/alumni";
import UniversitySection from "../components/UniversitySection";
import AchievementsSection from "../components/AchievementsSection";
import SkillDevelopment from "../components/SkillDevelopment";

const Home = () => {


  const newsRef = useRef(null);

  // Scroll on page load if URL has hash
  useEffect(() => {
    if (window.location.hash === "#news-events") {
      newsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);


  return (
    <div>
      <SEO 
        title="Home" 
        description="Welcome to Krishna Engineering College (KEC) Bhilai. Discover excellence in engineering education, high placement rates, and innovative research."
        keywords="engineering college, Bhilai, Chhattisgarh, KEC, technical education, admissions 2026"
      />
      <Herosection />
      <CoursesOffered />
      <AchievementsSection/>
      <AchievementsMarquee />
      {/* <UniversitySection/> */}
      <Leadership />
      <AlumniSection />
      <PlacementPartners />
      <NoticeBoard ref={newsRef} />
      <SkillDevelopment/>
      <AboutSection />
     
     
    </div>
  );
};

export default Home;
