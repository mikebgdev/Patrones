import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterSection } from "@/components/filter-section";
import { PatternCatalog } from "@/components/pattern-catalog";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { Footer } from "@/components/footer";
import { OnboardingTutorial } from "@/components/onboarding-tutorial";

import type { Pattern } from "@shared/schema";

export function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Disable automatic onboarding for now - can be manually triggered
    // const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
    // if (!hasSeenOnboarding) {
    //   setShowOnboarding(true);
    // }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('has_seen_onboarding', 'true');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FilterSection />
      <PatternCatalog />
      <ArchitectureShowcase />
      <Footer />
      
      {/* Onboarding Tutorial */}
      <OnboardingTutorial 
        isOpen={showOnboarding} 
        onClose={handleCloseOnboarding} 
      />
      

    </div>
  );
}
