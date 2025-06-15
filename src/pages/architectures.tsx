import { useArchitectures, usePatterns } from "@/lib/hooks";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Architecture, Pattern } from "@shared/schema";

export function Architectures() {
  const { data: architectures = [], isLoading: architecturesLoading } = useArchitectures();

  const { data: patterns = [], isLoading: patternsLoading } = usePatterns();

  const isLoading = architecturesLoading || patternsLoading;

  const getPatternsByArchitecture = (archSlug: string) => {
    return patterns.filter(pattern => pattern.architectures.includes(archSlug));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Arquitecturas de Software
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explora los patrones arquitecturales modernos que definen cómo estructurar aplicaciones escalables y mantenibles.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando arquitecturas...
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {architectures.map((architecture) => {
                const relatedPatterns = getPatternsByArchitecture(architecture.slug);
                
                return (
                  <Card key={architecture.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${architecture.color} rounded-xl flex items-center justify-center`}>
                          <i className={`fas fa-${architecture.icon} text-white text-2xl`}></i>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{architecture.name}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-400">
                            {architecture.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {relatedPatterns.length} patrones
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    {relatedPatterns.length > 0 && (
                      <CardContent>
                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Patrones relacionados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {relatedPatterns.map((pattern) => (
                            <div
                              key={pattern.id}
                              className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-8 h-8 bg-gradient-to-br ${pattern.color} rounded-lg flex items-center justify-center`}>
                                  <i className={`fas fa-${pattern.icon} text-white text-xs`}></i>
                                </div>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {pattern.name}
                                </h5>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {pattern.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}