import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterSection } from "@/components/filter-section";
import { PatternCatalog } from "@/components/pattern-catalog";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { Footer } from "@/components/footer";

export function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FilterSection />
        <PatternCatalog />
        <ArchitectureShowcase />
      </main>
      <Footer />
    </div>
  );
}
