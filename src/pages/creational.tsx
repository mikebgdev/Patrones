import { usePatterns } from "@/lib/hooks";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PatternCard } from "@/components/pattern-card";
import type { Pattern } from "@shared/schema";

export function Creational() {
  const { data: patterns = [], isLoading } = usePatterns();

  const creationalPatterns = patterns.filter(pattern => pattern.category === 'creational');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Patrones Creacionales
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Los patrones creacionales se ocupan de los mecanismos de creación de objetos, 
              intentando crear objetos de manera adecuada a la situación. La forma básica de 
              creación de objetos podría resultar en problemas de diseño o en una mayor complejidad del diseño.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando patrones creacionales...
              </p>
            </div>
          ) : creationalPatterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron patrones creacionales.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {creationalPatterns.length} Patrón{creationalPatterns.length !== 1 ? 'es' : ''} Creacional{creationalPatterns.length !== 1 ? 'es' : ''}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Estos patrones proporcionan varios mecanismos de creación de objetos que incrementan 
                  la flexibilidad y la reutilización del código existente.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creationalPatterns.map((pattern) => (
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