import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PatternCard } from "@/components/pattern-card";
import type { Pattern } from "@shared/schema";

export function Architectural() {
  const { data: patterns = [], isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const architecturalPatterns = patterns.filter(pattern => pattern.category === 'architectural');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Patrones Arquitecturales
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Los patrones arquitecturales definen la estructura fundamental de las aplicaciones de software. 
              Proporcionan plantillas para resolver problemas recurrentes en la arquitectura de sistemas.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando patrones arquitecturales...
              </p>
            </div>
          ) : architecturalPatterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron patrones arquitecturales.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {architecturalPatterns.length} Patrón{architecturalPatterns.length !== 1 ? 'es' : ''} Arquitectural{architecturalPatterns.length !== 1 ? 'es' : ''}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Estos patrones abordan varias limitaciones en aplicaciones complejas, 
                  proporcionando soluciones probadas para organizar componentes y subsistemas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {architecturalPatterns.map((pattern) => (
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