import { 
  ArrowRight, Factory, Layers, Settings, Building2, 
  Wrench, Box, Zap, Users, Database, Code, 
  Target, Repeat, Eye, GitBranch, Shield, Grid3x3, Heart, Wand2
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/favorites-context";
import type { Pattern } from "@/lib/types";

interface PatternCardProps {
  pattern: Pattern;
}

const categoryColors: Record<string, string> = {
  creational: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  structural: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  behavioral: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  architectural: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
};

const categoryLabels: Record<string, string> = {
  creational: "Creacional",
  structural: "Estructural",
  behavioral: "Comportamiento",
  architectural: "Arquitectural"
};

const difficultyColors = [
  "bg-green-400",
  "bg-yellow-400",
  "bg-red-400"
];

const getPatternIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'cog': Settings,
    'industry': Factory,
    'tools': Wrench,
    'clone': Box,
    'layer-group': Layers,
    'link': GitBranch,
    'shield-alt': Shield,
    'filter': Target,
    'puzzle-piece': Grid3x3,
    'sync-alt': Repeat,
    'eye': Eye,
    'bolt': Zap,
    'users': Users,
    'database': Database,
    'code': Code,
    'building': Building2
  };
  
  const IconComponent = iconMap[iconName] || Settings;
  return <IconComponent className="text-white" size={20} />;
};

export function PatternCard({ pattern }: PatternCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const getDifficultyDots = (difficulty: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < difficulty ? difficultyColors[i] : "bg-gray-300 dark:bg-gray-600"
        }`}
      />
    ));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pattern.id);
  };



  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden pattern-card-hover group relative">
      <Link href={`/pattern/${pattern.slug}`} className="block">
        <div className="p-6">
          {/* Header with icon and category badge */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${pattern.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              {getPatternIcon(pattern.icon)}
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[pattern.category] || categoryColors.creational}`}>
                {categoryLabels[pattern.category] || "Patrón"}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleFavoriteClick}
                className={`h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${isFavorite(pattern.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite(pattern.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {pattern.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {pattern.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {pattern.languages.slice(0, 3).map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </span>
            ))}
          </div>
          
          {/* Difficulty */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Dificultad:</span>
              <div className="flex space-x-1">
                {getDifficultyDots(pattern.difficulty)}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
    </div>
  );
}
