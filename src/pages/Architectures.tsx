import { useState, useEffect } from "react";
import { getArchitectures, getPatterns } from "@/lib/firebase";
import type { Architecture, Pattern } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatternCard } from "@/components/pattern-card";
import { getIconComponent } from "@/lib/icon-map";

export function Architectures() {
  const [architectures, setArchitectures] = useState<Architecture[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getArchitectures(), getPatterns()]).then(([archs, pats]) => {
      setArchitectures(archs);
      setPatterns(pats);
      setLoading(false);
    });
  }, []);

  const getPatternsByArchitecture = (archSlug: string) =>
    patterns.filter((p) => p.architectures.includes(archSlug));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Arquitecturas de Software
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explora los patrones arquitecturales modernos que definen cómo estructurar
              aplicaciones escalables y mantenibles.
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
                  <Card key={architecture.slug} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${architecture.color} rounded-xl flex items-center justify-center`}
                        >
                          {(() => { const Icon = getIconComponent(architecture.icon); return <Icon className="text-white" size={24} />; })()}
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
                            <PatternCard key={pattern.slug} pattern={pattern} />
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