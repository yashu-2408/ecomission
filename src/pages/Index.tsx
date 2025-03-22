
import React from "react";
import HeroSection from "../components/landing/HeroSection";
import PageTransition from "../components/common/PageTransition";

const Index: React.FC = () => {
  return (
    <PageTransition>
      <HeroSection />
    </PageTransition>
  );
};

export default Index;
