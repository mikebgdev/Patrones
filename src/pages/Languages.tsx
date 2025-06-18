import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatternCard } from "@/components/pattern-card";
import { getLanguages, getPatterns } from "@/lib/firebase";
import type { Language, Pattern } from "@/lib/types";

export function Languages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getLanguages(), getPatterns()]).then(([langs, pats]) => {
      setLanguages(langs);
      setPatterns(pats);
      setLoading(false);
    });
  }, []);

  const languageList = languages.filter((l) => !l.isFramework);
  const frameworkList = languages.filter((l) => l.isFramework);

  const getPatternsByTechnology = (tech: string, isFramework: boolean) =>
    patterns.filter((p) =>
      isFramework ? p.frameworks.includes(tech) : p.languages.includes(tech)
    );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lenguajes y Frameworks
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Descubre cómo implementar patrones de diseño en diferentes lenguajes de programación y frameworks.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando información...
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Languages Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Lenguajes de Programación
                </h2>
                <div className="grid gap-8">
                  {languageList.map((language) => {
                    const languagePatterns = getPatternsByTechnology(language.slug, false);

                    return (
                      <Card key={language.slug} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-br ${language.color} rounded-xl flex items-center justify-center`}
                            >
                              <i className={`fab fa-${language.icon} text-white text-2xl`} />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">{language.name}</CardTitle>
                              <p className="text-gray-600 dark:text-gray-400">
                                Patrones implementados en {language.name}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-auto">
                              {languagePatterns.length} patrones
                            </Badge>
                          </div>
                        </CardHeader>

                        {languagePatterns.length > 0 && (
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {languagePatterns.map((pattern) => (
                                <PatternCard key={pattern.slug} pattern={pattern} />
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* Frameworks Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Frameworks
                </h2>
                <div className="grid gap-8">
                  {frameworkList.map((framework) => {
                    const frameworkPatterns = getPatternsByTechnology(framework.slug, true);

                    return (
                      <Card key={framework.slug} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-br ${framework.color} rounded-xl flex items-center justify-center`}
                            >
                              <i className={`fab fa-${framework.icon} text-white text-2xl`} />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">{framework.name}</CardTitle>
                              <p className="text-gray-600 dark:text-gray-400">
                                Patrones implementados con {framework.name}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-auto">
                              {frameworkPatterns.length} patrones
                            </Badge>
                          </div>
                        </CardHeader>

                        {frameworkPatterns.length > 0 && (
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {frameworkPatterns.map((pattern) => (
                                <PatternCard key={pattern.slug} pattern={pattern} />
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}