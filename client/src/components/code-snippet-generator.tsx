import { useState } from "react";
import { Sparkles, Copy, Download, RefreshCw, Code, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Pattern, GeneratedSnippet } from "@shared/schema";

interface CodeSnippetGeneratorProps {
  pattern: Pattern;
  isOpen: boolean;
  onClose: () => void;
}

interface GenerateRequest {
  patternSlug: string;
  language: string;
  context: string;
}

const supportedLanguages = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "vue", label: "Vue 3" },
  { value: "symfony", label: "Symfony" }
];

const contextExamples = {
  javascript: "Una aplicación de e-commerce que necesita gestionar diferentes tipos de productos",
  php: "Un sistema de gestión de contenidos con múltiples tipos de publicaciones",
  vue: "Una aplicación web que maneja diferentes componentes de interfaz",
  symfony: "Una API REST que procesa diferentes tipos de solicitudes"
};

export function CodeSnippetGenerator({ pattern, isOpen, onClose }: CodeSnippetGeneratorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [context, setContext] = useState("");
  const [generatedSnippet, setGeneratedSnippet] = useState<GeneratedSnippet | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (request: GenerateRequest) => {
      return apiRequest(`/api/patterns/${request.patternSlug}/generate-code`, {
        method: "POST",
        body: JSON.stringify(request)
      });
    },
    onSuccess: (data) => {
      setGeneratedSnippet(data);
      toast({
        title: "Código generado",
        description: "Tu snippet personalizado está listo",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo generar el código. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleGenerate = () => {
    if (!context.trim()) {
      toast({
        title: "Contexto requerido",
        description: "Describe tu caso de uso para generar código relevante",
        variant: "destructive"
      });
      return;
    }

    generateMutation.mutate({
      patternSlug: pattern.slug,
      language: selectedLanguage,
      context: context.trim()
    });
  };

  const handleCopy = async () => {
    if (generatedSnippet?.code) {
      await navigator.clipboard.writeText(generatedSnippet.code);
      toast({
        title: "Copiado",
        description: "Código copiado al portapapeles",
      });
    }
  };

  const handleDownload = () => {
    if (generatedSnippet?.code) {
      const extension = selectedLanguage === 'javascript' ? 'js' : 
                       selectedLanguage === 'php' ? 'php' : 
                       selectedLanguage === 'vue' ? 'vue' : 'php';
      
      const blob = new Blob([generatedSnippet.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pattern.slug}-example.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Descargado",
        description: "Archivo guardado en tu dispositivo",
      });
    }
  };

  const useExampleContext = () => {
    setContext(contextExamples[selectedLanguage as keyof typeof contextExamples] || "");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Wand2 className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Generador de Código IA
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Patrón: {pattern.name}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Lenguaje de programación
                </label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contexto de tu proyecto
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={useExampleContext}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Usar ejemplo
                  </Button>
                </div>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Describe tu caso de uso específico para obtener código más relevante..."
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Mientras más específico seas, mejor será el resultado
                </p>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !context.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {generateMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generando código...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar código
                  </>
                )}
              </Button>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              {generatedSnippet ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Código generado
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{generatedSnippet.code}</code>
                    </pre>
                  </div>

                  {generatedSnippet.explanation && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        Explicación
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {generatedSnippet.explanation}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Code className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Tu código aparecerá aquí
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Describe tu contexto y genera código personalizado
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pattern Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Sobre este patrón
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {pattern.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {pattern.category}
              </Badge>
              <Badge variant="outline">
                Dificultad: {pattern.difficulty}/3
              </Badge>
              {pattern.languages.slice(0, 3).map((lang) => (
                <Badge key={lang} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}