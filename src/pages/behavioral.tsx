import { usePatterns } from "@/lib/hooks";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PatternCard } from "@/components/pattern-card";
import type { Pattern } from "@shared/schema";

export function Behavioral() {
  const { data: patterns = [], isLoading } = usePatterns();

  const behavioralPatterns = patterns.filter(pattern => pattern.category === 'behavioral');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Patrones de Comportamiento
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Los patrones de comportamiento se centran en la comunicación entre objetos y la asignación 
              de responsabilidades entre ellos. Definen cómo los objetos interactúan y se comunican entre sí.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando patrones de comportamiento...
              </p>
            </div>
          ) : behavioralPatterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron patrones de comportamiento.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {behavioralPatterns.length} Patrón{behavioralPatterns.length !== 1 ? 'es' : ''} de Comportamiento
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Estos patrones están relacionados con algoritmos y la asignación de responsabilidades 
                  entre objetos, facilitando la comunicación y el flujo de control.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {behavioralPatterns.map((pattern) => (
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