import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles, Code, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  target?: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  characterMessage: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenido a Design Patterns!",
    description: "Te ayudaré a descubrir patrones de diseño de manera interactiva. ¡Empecemos!",
    position: "center",
    characterMessage: "¡Hola! Soy Pat, tu guía en el mundo de los patrones de diseño. ¿Listo para aprender?"
  },
  {
    id: 2,
    title: "Explora el catálogo",
    description: "Aquí encontrarás 21 patrones de diseño organizados por categorías",
    target: ".pattern-catalog",
    position: "top",
    characterMessage: "Estos son todos los patrones disponibles. Cada uno resuelve problemas específicos en programación."
  },
  {
    id: 3,
    title: "Usa los filtros",
    description: "Filtra patrones por categoría, arquitectura o tecnología",
    target: ".filter-section",
    position: "bottom",
    characterMessage: "Los filtros te ayudan a encontrar exactamente lo que necesitas. ¡Pruébalos!"
  },
  {
    id: 4,
    title: "Busca con IA",
    description: "Obtén recomendaciones personalizadas basadas en tu proyecto",
    target: "[href='/recommendations']",
    position: "bottom",
    characterMessage: "La IA puede sugerir patrones perfectos para tu proyecto específico. ¡Es súper útil!"
  },
  {
    id: 5,
    title: "Guarda favoritos",
    description: "Marca patrones como favoritos para acceso rápido",
    target: ".favorite-button",
    position: "left",
    characterMessage: "¿Te gusta un patrón? ¡Guárdalo en favoritos! Los encontrarás fácilmente después."
  }
];

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingTutorial({ isOpen, onClose }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCharacter, setShowCharacter] = useState(true);

  const currentTutorialStep = tutorialSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Character Guide */}
      {showCharacter && (
        <div className="fixed bottom-8 left-8 z-[60] animate-bounce">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>
      )}

      {/* Tutorial Card */}
      <Card className="fixed z-[60] p-6 bg-white dark:bg-slate-800 shadow-2xl border-2 border-primary/20 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div 
          className={`
            ${currentTutorialStep.position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
            ${currentTutorialStep.position === "top" ? "top-8 left-8" : ""}
            ${currentTutorialStep.position === "bottom" ? "bottom-8 right-8" : ""}
            ${currentTutorialStep.position === "left" ? "top-1/2 left-8 -translate-y-1/2" : ""}
            ${currentTutorialStep.position === "right" ? "top-1/2 right-8 -translate-y-1/2" : ""}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pat te guía
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {currentTutorialStep.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {currentTutorialStep.description}
            </p>
            
            {/* Character Speech Bubble */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-3 rounded-lg border border-primary/20">
              <p className="text-sm text-primary dark:text-primary-foreground font-medium">
                💬 {currentTutorialStep.characterMessage}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Paso {currentStep + 1} de {tutorialSteps.length}</span>
              <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={skipTutorial}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Saltar tutorial
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" />
                Anterior
              </Button>
              <Button
                onClick={nextStep}
                size="sm"
                className="flex items-center gap-1 bg-gradient-to-r from-primary to-purple-600"
              >
                {currentStep === tutorialSteps.length - 1 ? "Finalizar" : "Siguiente"}
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Spotlight effect for targeted elements */}
      {currentTutorialStep.target && (
        <div className="fixed inset-0 z-[55] pointer-events-none">
          <style>
            {`
              .tutorial-spotlight {
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                animation: pulse-spotlight 2s infinite;
              }
              @keyframes pulse-spotlight {
                0%, 100% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8); }
                50% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}