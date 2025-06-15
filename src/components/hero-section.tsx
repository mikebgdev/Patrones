import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";

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
          <Link href="/">
            <Button 
              size="lg"
              className="px-8 py-4 font-semibold transform hover:scale-105 transition-all"
            >
              <Zap className="h-5 w-5 mr-2" />
              Explorar Catálogo
            </Button>
          </Link>
          <Link href="/recommendations">
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 font-semibold border-2 hover:border-primary hover:text-primary transition-all bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Recomendaciones IA
            </Button>
          </Link>
        </div>
        
        {/* AI Feature Highlight */}
        <div className="mt-12 max-w-2xl mx-auto p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-600">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Nuevo: Recomendaciones con IA
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Describe tu proyecto y recibe recomendaciones personalizadas de patrones de diseño 
            basadas en inteligencia artificial. Perfectas para tu contexto específico.
          </p>
        </div>
      </div>
    </section>
  );
}
