import { Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/contexts/FilterContext';
import { useState, useEffect } from 'react';
import { getLanguages, getArchitectures, getPatterns } from '@/lib/firebase';
import type { Language, Architecture } from '@/lib/types';

export function FilterSection() {
  const { filters, updateFilter, searchQuery, setSearchQuery, clearFilters } =
    useFilters();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [architectures, setArchitectures] = useState<Architecture[]>([]);
  const [categories, setCategories] = useState<
    { key: string; label: string }[]
  >([]);
  const [difficultyLevels, setDifficultyLevels] = useState<
    { level: number; label: string }[]
  >([]);

  useEffect(() => {
    Promise.all([getLanguages(), getArchitectures(), getPatterns()]).then(
      ([langs, archs, patterns]) => {
        setLanguages(langs);
        setArchitectures(archs);

        const catMap: Record<string, string> = {
          creational: 'Creacionales',
          structural: 'Estructurales',
          behavioral: 'Comportamiento',
          architectural: 'Arquitecturales',
        };
        const uniqueCats = Array.from(new Set(patterns.map((p) => p.category)));
        setCategories(
          uniqueCats.map((c) => ({ key: c, label: catMap[c] || c })),
        );

        const difficultyLabels: Record<number, string> = {
          1: 'Fácil',
          2: 'Intermedio',
          3: 'Avanzado',
          4: 'Experto',
          5: 'Maestro',
        };
        const diffs = Array.from(
          new Set(patterns.map((p) => p.difficulty)),
        ).sort((a, b) => a - b);
        setDifficultyLevels(
          diffs.map((level) => ({
            level,
            label: difficultyLabels[level] || `Nivel ${level}`,
          })),
        );
      },
    );
  }, []);

  const isFilterActive = (
    key: keyof typeof filters,
    value: string | number,
  ) => {
    const current = filters[key] as any;
    return Array.isArray(current) ? current.includes(value) : current === value;
  };

  const handleFilterClick = (key: string, value: string) => {
    const currentValue = filters[key as keyof typeof filters];
    updateFilter(
      key as keyof typeof filters,
      currentValue === value ? undefined : value,
    );
  };

  return (
    <section className="py-12 border-b border-gray-200 dark:border-slate-700 filter-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Categorías de Patrones
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterClick('category', category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive('category', category.key)
                      ? 'filter-button-active'
                      : 'filter-button-inactive'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Arquitecturas
            </h3>
            <div className="flex flex-wrap gap-3">
              {architectures.map((arch) => (
                <Button
                  key={arch.slug}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const arr = filters.architectures || [];
                    const next = arr.includes(arch.slug)
                      ? arr.filter((s) => s !== arch.slug)
                      : [...arr, arch.slug];
                    updateFilter('architectures', next);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive('architectures', arch.slug)
                      ? 'filter-button-active'
                      : 'filter-button-inactive'
                  }`}
                >
                  {arch.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Lenguajes
            </h3>
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

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Dificultad
            </h3>
            <div className="flex flex-wrap gap-3">
              {difficultyLevels.map((diff) => (
                <Button
                  key={diff.level}
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateFilter(
                      'difficulty',
                      filters.difficulty === diff.level
                        ? undefined
                        : diff.level,
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive('difficulty', diff.level)
                      ? 'filter-button-active'
                      : 'filter-button-inactive'
                  }`}
                >
                  {diff.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="sm" onClick={() => clearFilters()}>
            Limpiar filtros
          </Button>
        </div>
      </div>
    </section>
  );
}
