import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Lightbulb, Star, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface RecommendationRequest {
  projectDescription: string;
  preferredLanguages?: string[];
  preferredFrameworks?: string[];
  preferredArchitectures?: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  projectType?: string;
  teamSize?: string;
}

interface PatternRecommendation {
  patternSlug: string;
  patternName: string;
  relevanceScore: number;
  reason: string;
  useCase: string;
}

const availableLanguages = ['javascript', 'php'];
const availableFrameworks = ['vue3', 'symfony'];
const availableArchitectures = ['hexagonal', 'ddd', 'cqrs', 'event-driven', 'layered'];

export function Recommendations() {
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedArchitectures, setSelectedArchitectures] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  const [projectType, setProjectType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [recommendations, setRecommendations] = useState<PatternRecommendation[]>([]);

  const recommendationMutation = useMutation({
    mutationFn: async (request: RecommendationRequest) => {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setRecommendations(data.recommendations);
    },
    onError: (error) => {
      console.error('Error getting recommendations:', error);
    }
  });

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    }
  };

  const handleFrameworkChange = (framework: string, checked: boolean) => {
    if (checked) {
      setSelectedFrameworks([...selectedFrameworks, framework]);
    } else {
      setSelectedFrameworks(selectedFrameworks.filter(f => f !== framework));
    }
  };

  const handleArchitectureChange = (architecture: string, checked: boolean) => {
    if (checked) {
      setSelectedArchitectures([...selectedArchitectures, architecture]);
    } else {
      setSelectedArchitectures(selectedArchitectures.filter(a => a !== architecture));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (projectDescription.trim().length < 10) {
      return;
    }

    const request: RecommendationRequest = {
      projectDescription: projectDescription.trim(),
      preferredLanguages: selectedLanguages.length > 0 ? selectedLanguages : undefined,
      preferredFrameworks: selectedFrameworks.length > 0 ? selectedFrameworks : undefined,
      preferredArchitectures: selectedArchitectures.length > 0 ? selectedArchitectures : undefined,
      experienceLevel: experienceLevel as any || undefined,
      projectType: projectType || undefined,
      teamSize: teamSize || undefined
    };

    recommendationMutation.mutate(request);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getScoreStars = (score: number) => {
    const stars = Math.round(score / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < stars ? 'fill-current text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Recomendaciones IA
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Describe tu proyecto y recibe recomendaciones personalizadas de patrones de diseño 
              basadas en inteligencia artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Describe tu Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="description">Descripción del Proyecto *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu proyecto: funcionalidades, arquitectura esperada, problemas a resolver..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="min-h-[120px] mt-2"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Mínimo 10 caracteres. Sé específico para mejores recomendaciones.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nivel de Experiencia</Label>
                      <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecciona tu nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Principiante</SelectItem>
                          <SelectItem value="intermediate">Intermedio</SelectItem>
                          <SelectItem value="advanced">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tipo de Proyecto</Label>
                      <Select value={projectType} onValueChange={setProjectType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Tipo de proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-app">Aplicación Web</SelectItem>
                          <SelectItem value="api">API/Backend</SelectItem>
                          <SelectItem value="microservices">Microservicios</SelectItem>
                          <SelectItem value="monolith">Aplicación Monolítica</SelectItem>
                          <SelectItem value="library">Biblioteca/Framework</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Tamaño del Equipo</Label>
                    <Select value={teamSize} onValueChange={setTeamSize}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Tamaño del equipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo (1 persona)</SelectItem>
                        <SelectItem value="small">Pequeño (2-5 personas)</SelectItem>
                        <SelectItem value="medium">Mediano (6-15 personas)</SelectItem>
                        <SelectItem value="large">Grande (16+ personas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Lenguajes Preferidos</Label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableLanguages.map((lang) => (
                          <div key={lang} className="flex items-center space-x-2">
                            <Checkbox
                              id={`lang-${lang}`}
                              checked={selectedLanguages.includes(lang)}
                              onCheckedChange={(checked) => handleLanguageChange(lang, checked as boolean)}
                            />
                            <Label htmlFor={`lang-${lang}`} className="text-sm">
                              {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Frameworks Preferidos</Label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableFrameworks.map((fw) => (
                          <div key={fw} className="flex items-center space-x-2">
                            <Checkbox
                              id={`fw-${fw}`}
                              checked={selectedFrameworks.includes(fw)}
                              onCheckedChange={(checked) => handleFrameworkChange(fw, checked as boolean)}
                            />
                            <Label htmlFor={`fw-${fw}`} className="text-sm">
                              {fw.charAt(0).toUpperCase() + fw.slice(1)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Arquitecturas Preferidas</Label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableArchitectures.map((arch) => (
                          <div key={arch} className="flex items-center space-x-2">
                            <Checkbox
                              id={`arch-${arch}`}
                              checked={selectedArchitectures.includes(arch)}
                              onCheckedChange={(checked) => handleArchitectureChange(arch, checked as boolean)}
                            />
                            <Label htmlFor={`arch-${arch}`} className="text-sm">
                              {arch.toUpperCase()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={projectDescription.trim().length < 10 || recommendationMutation.isPending}
                  >
                    {recommendationMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Obtener Recomendaciones
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recommendations Results */}
            <div className="space-y-6">
              {recommendationMutation.isPending && (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Analizando tu proyecto y generando recomendaciones...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recommendations.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Patrones Recomendados
                  </h2>
                  
                  {recommendations.map((rec, index) => (
                    <Card key={rec.patternSlug} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              #{index + 1} {rec.patternName}
                            </CardTitle>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1">
                                {getScoreStars(rec.relevanceScore)}
                              </div>
                              <Badge 
                                variant="secondary" 
                                className={getScoreColor(rec.relevanceScore)}
                              >
                                Relevancia: {rec.relevanceScore}/10
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              ¿Por qué este patrón?
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                              {rec.reason}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              Caso de uso específico
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                              {rec.useCase}
                            </p>
                          </div>

                          <div className="pt-3">
                            <Link href={`/pattern/${rec.patternSlug}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                Ver Detalles del Patrón
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {recommendationMutation.isError && (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400">
                      Error al generar recomendaciones. Por favor, intenta nuevamente.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}