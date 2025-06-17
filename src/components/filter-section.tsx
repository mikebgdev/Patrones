import { Search, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/contexts/FilterContext";
import { useState, useEffect } from "react";
import { getLanguages } from "@/lib/firebase";
import type { Language } from "@/lib/types";

const patternCategories = [
  { key: "creational", label: "Creacionales" },
  { key: "structural", label: "Estructurales" },
  { key: "behavioral", label: "Comportamiento" },
  { key: "architectural", label: "Arquitecturales" }
];

const architectures = [
  { key: "hexagonal", label: "Hexagonal" },
  { key: "ddd", label: "DDD" },
  { key: "cqrs", label: "CQRS" },
  { key: "event-driven", label: "Event-Driven" },
  { key: "microservices", label: "Microservicios" }
];


export function FilterSection() {
  const { filters, updateFilter, searchQuery, setSearchQuery } = useFilters();
  const [languages, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    getLanguages().then(setLanguages);
  }, []);

  const isFilterActive = (key: keyof typeof filters, value: string) => {
    const current = filters[key];
    return Array.isArray(current) ? current.includes(value) : current === value;
  };

  const handleFilterClick = (key: string, value: string) => {
    const currentValue = filters[key as keyof typeof filters];
    updateFilter(key as keyof typeof filters, currentValue === value ? undefined : value);
  };

  return (
    <section className="py-12 border-b border-gray-200 dark:border-slate-700 filter-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Buscar patrones, arquitecturas o conceptos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Favoritos Toggle */}
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateFilter('favorites', !filters.favorites)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.favorites
                ? 'filter-button-active'
                : 'filter-button-inactive'
            }`}
          >
            <Heart className="h-4 w-4 mr-1" />
            Favoritos
          </Button>
        </div>

        {/* Filter Categories */}
        <div className="space-y-6">
          {/* Pattern Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categorías de Patrones</h3>
            <div className="flex flex-wrap gap-3">
              {patternCategories.map((category) => (
                <Button
                  key={category.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterClick("category", category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive("category", category.key)
                      ? "filter-button-active"
                      : "filter-button-inactive"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Architecture Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Arquitecturas Modernas</h3>
            <div className="flex flex-wrap gap-3">
              {architectures.map((arch) => (
                <Button
                  key={arch.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterClick("architectures", arch.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive("architectures", arch.key)
                      ? "filter-button-active"
                      : "filter-button-inactive"
                  }`}
                >
                  {arch.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Architectures */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Arquitecturas</h3>
            <div className="flex flex-wrap gap-3">
              {architectures.map((arch) => (
                <Button
                  key={arch.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const arr = filters.architectures || [];
                    const next = arr.includes(arch.key)
                      ? arr.filter((s) => s !== arch.key)
                      : [...arr, arch.key];
                    updateFilter('architectures', next);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive('architectures', arch.key)
                      ? 'filter-button-active'
                      : 'filter-button-inactive'
                  }`}
                >
                  {arch.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Lenguajes</h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <Button
                  key={lang.slug}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const arr = filters.languages || [];
                    const next = arr.includes(lang.slug)
                      ? arr.filter((s) => s !== lang.slug)
                      : [...arr, lang.slug];
                    updateFilter('languages', next);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive('languages', lang.slug)
                      ? 'filter-button-active'
                      : 'filter-button-inactive'
                  }`}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
