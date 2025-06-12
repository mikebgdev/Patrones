import { useParams } from "wouter";
import { ArrowLeft, BookOpen, Code, ExternalLink, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Pattern } from "@shared/schema";
import { useState } from "react";

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return <i className="fab fa-js-square text-yellow-500 text-lg"></i>;
      case 'php':
        return <i className="fab fa-php text-blue-600 text-lg"></i>;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return 'JavaScript';
      case 'php':
        return 'PHP';
      default:
        return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-3 rounded-t-lg border border-gray-700">
        <div className="flex items-center gap-2">
          {getLanguageIcon(language)}
          <span className="text-sm font-medium text-gray-200">
            {getLanguageLabel(language)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 dark:bg-black text-gray-100 p-6 rounded-b-lg overflow-x-auto text-sm leading-relaxed font-mono shadow-inner border-x border-b border-gray-700">
          <code className="text-gray-100">
            {code}
          </code>
        </pre>
        <div className="absolute top-3 right-3 flex gap-1 opacity-60">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function PatternDetail() {
  const { slug } = useParams();
  
  const { data: patterns = [], isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const pattern = patterns.find(p => p.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">Cargando patrón...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Patrón no encontrado</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              El patrón que buscas no existe o ha sido movido.
            </p>
            <Link href="/">
              <Button>Volver al catálogo</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    creational: "Creacional",
    structural: "Estructural",
    behavioral: "Comportamiento",
    architectural: "Arquitectural"
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return "Básico";
      case 2: return "Intermedio";
      case 3: return "Avanzado";
      default: return "Básico";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Link>
          </div>

          {/* Pattern Header */}
          <div className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${pattern.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <i className={`fas fa-${pattern.icon} text-white text-3xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {pattern.name}
                  </h1>
                  <Badge variant="secondary">
                    {categoryLabels[pattern.category]}
                  </Badge>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {pattern.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dificultad:
                    </span>
                    <Badge variant={pattern.difficulty === 1 ? "default" : pattern.difficulty === 2 ? "secondary" : "destructive"}>
                      {getDifficultyLabel(pattern.difficulty)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lenguajes</h3>
                <div className="flex flex-wrap gap-2">
                  {pattern.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {pattern.frameworks.map((framework) => (
                    <Badge key={framework} variant="outline">
                      {framework.charAt(0).toUpperCase() + framework.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Arquitecturas</h3>
                <div className="flex flex-wrap gap-2">
                  {pattern.architectures.map((arch) => (
                    <Badge key={arch} variant="outline">
                      {arch.charAt(0).toUpperCase() + arch.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Descripción
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none dark:prose-invert">
                    {pattern.content.split('\n').map((paragraph, index) => {
                      if (paragraph.trim() === '') return <br key={index} />;
                      
                      // Handle bold markdown **text**
                      if (paragraph.includes('**')) {
                        const parts = paragraph.split(/(\*\*.*?\*\*)/);
                        return (
                          <p key={index} className="mb-3">
                            {parts.map((part, partIndex) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      }
                      
                      // Handle bullet points
                      if (paragraph.trim().startsWith('•')) {
                        return (
                          <li key={index} className="ml-4 mb-1">
                            {paragraph.trim().substring(1).trim()}
                          </li>
                        );
                      }
                      
                      return <p key={index} className="mb-3">{paragraph}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Code Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Ejemplos de Código
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(pattern.examples as Record<string, string>).map(([lang, code]) => (
                      <CodeBlock key={lang} language={lang} code={code} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle>Patrones Relacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pattern.relatedPatterns.map((relatedSlug: string) => {
                      const relatedPattern = patterns.find(p => p.slug === relatedSlug);
                      return relatedPattern ? (
                        <Link key={relatedSlug} href={`/pattern/${relatedSlug}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                            <div className={`w-8 h-8 bg-gradient-to-br ${relatedPattern.color} rounded-lg flex items-center justify-center`}>
                              <i className={`fas fa-${relatedPattern.icon} text-white text-xs`}></i>
                            </div>
                            <span className="text-sm font-medium">{relatedPattern.name}</span>
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Enlaces Útiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href={`https://refactoring.guru/es/design-patterns/${pattern.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver en Refactoring Guru
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
