import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="gradient-hero py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Patrones de Diseño
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Descubre y aprende los patrones de diseño de software más importantes, desde los clásicos GoF hasta arquitecturas modernas como DDD, CQRS y Event-Driven.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="px-8 py-4 font-semibold transform hover:scale-105 transition-all"
          >
            Explorar Catálogo
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 font-semibold border-2 hover:border-primary hover:text-primary transition-all"
          >
            Ver Arquitecturas
          </Button>
        </div>
      </div>
    </section>
  );
}
