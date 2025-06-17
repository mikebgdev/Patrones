import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterSection } from "@/components/filter-section";
import { PatternCatalog } from "@/components/pattern-catalog";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { Footer } from "@/components/footer";

export function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FilterSection />
      <PatternCatalog />
      <ArchitectureShowcase />
      <Footer />
    </div>
  );
}
