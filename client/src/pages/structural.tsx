import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PatternCard } from "@/components/pattern-card";
import type { Pattern } from "@shared/schema";

export function Structural() {
  const { data: patterns = [], isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const structuralPatterns = patterns.filter(pattern => pattern.category === 'structural');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Patrones Estructurales
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Los patrones estructurales explican cómo ensamblar objetos y clases en estructuras más grandes, 
              manteniendo estas estructuras flexibles y eficientes. Se ocupan de la composición de clases u objetos.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando patrones estructurales...
              </p>
            </div>
          ) : structuralPatterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron patrones estructurales.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {structuralPatterns.length} Patrón{structuralPatterns.length !== 1 ? 'es' : ''} Estructural{structuralPatterns.length !== 1 ? 'es' : ''}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Estos patrones facilitan el diseño identificando una manera sencilla de realizar 
                  relaciones entre entidades, simplificando el diseño.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {structuralPatterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}