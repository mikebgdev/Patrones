import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterSection } from "@/components/filter-section";
import { PatternCatalog } from "@/components/pattern-catalog";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { Footer } from "@/components/footer";
import { OnboardingTutorial } from "@/components/onboarding-tutorial";
import { CodeSnippetGenerator } from "@/components/code-snippet-generator";
import type { Pattern } from "@shared/schema";

export function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  useEffect(() => {
    // Show onboarding for first-time users
    const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('has_seen_onboarding', 'true');
  };

  const handleOpenCodeGenerator = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    setShowCodeGenerator(true);
  };

  const handleCloseCodeGenerator = () => {
    setShowCodeGenerator(false);
    setSelectedPattern(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FilterSection />
      <PatternCatalog onOpenCodeGenerator={handleOpenCodeGenerator} />
      <ArchitectureShowcase />
      <Footer />
      
      {/* Onboarding Tutorial */}
      <OnboardingTutorial 
        isOpen={showOnboarding} 
        onClose={handleCloseOnboarding} 
      />
      
      {/* Code Generator Modal */}
      {selectedPattern && (
        <CodeSnippetGenerator
          pattern={selectedPattern}
          isOpen={showCodeGenerator}
          onClose={handleCloseCodeGenerator}
        />
      )}
    </div>
  );
}
