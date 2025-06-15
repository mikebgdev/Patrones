import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatternCard } from "@/components/pattern-card";
import type { Pattern } from "@shared/schema";

export function Languages() {
  const { data: patterns = [], isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const languages = [
    { key: "javascript", label: "JavaScript", icon: "js-square", color: "from-yellow-400 to-orange-500" },
    { key: "php", label: "PHP", icon: "php", color: "from-purple-400 to-indigo-500" }
  ];

  const frameworks = [
    { key: "vue3", label: "Vue 3", icon: "vuejs", color: "from-green-400 to-teal-500" },
    { key: "symfony", label: "Symfony", icon: "symfony", color: "from-gray-600 to-gray-700" }
  ];

  const getPatternsByTechnology = (tech: string, type: 'language' | 'framework') => {
    return patterns.filter(pattern => 
      type === 'language' 
        ? pattern.languages.includes(tech)
        : pattern.frameworks.includes(tech)
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
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
                  {languages.map((language) => {
                    const languagePatterns = getPatternsByTechnology(language.key, 'language');
                    
                    return (
                      <Card key={language.key} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${language.color} rounded-xl flex items-center justify-center`}>
                              <i className={`fab fa-${language.icon} text-white text-2xl`}></i>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">{language.label}</CardTitle>
                              <p className="text-gray-600 dark:text-gray-400">
                                Patrones implementados en {language.label}
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
                                <PatternCard key={pattern.id} pattern={pattern} />
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
                  {frameworks.map((framework) => {
                    const frameworkPatterns = getPatternsByTechnology(framework.key, 'framework');
                    
                    return (
                      <Card key={framework.key} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${framework.color} rounded-xl flex items-center justify-center`}>
                              <i className={`fab fa-${framework.icon} text-white text-2xl`}></i>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">{framework.label}</CardTitle>
                              <p className="text-gray-600 dark:text-gray-400">
                                Patrones implementados con {framework.label}
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
                                <PatternCard key={pattern.id} pattern={pattern} />
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