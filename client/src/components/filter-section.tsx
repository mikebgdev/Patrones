import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/contexts/filter-context";

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

const technologies = [
  { key: "javascript", label: "JavaScript" },
  { key: "php", label: "PHP" },
  { key: "vue3", label: "Vue 3" },
  { key: "symfony", label: "Symfony" }
];

export function FilterSection() {
  const { filters, updateFilter, searchQuery, setSearchQuery } = useFilters();

  const isFilterActive = (key: string, value: string) => {
    return filters[key as keyof typeof filters] === value;
  };

  const handleFilterClick = (key: string, value: string) => {
    const currentValue = filters[key as keyof typeof filters];
    updateFilter(key as keyof typeof filters, currentValue === value ? undefined : value);
  };

  return (
    <section className="py-12 border-b border-gray-200 dark:border-slate-700">
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
                  onClick={() => handleFilterClick("architecture", arch.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive("architecture", arch.key)
                      ? "filter-button-active"
                      : "filter-button-inactive"
                  }`}
                >
                  {arch.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Languages/Frameworks */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Lenguajes y Frameworks</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <Button
                  key={tech.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const currentValue = filters.language || filters.framework;
                    const filterKey = ['javascript', 'php'].includes(tech.key) ? 'language' : 'framework';
                    updateFilter('language', undefined);
                    updateFilter('framework', undefined);
                    if (currentValue !== tech.key) {
                      updateFilter(filterKey, tech.key);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive("language", tech.key) || isFilterActive("framework", tech.key)
                      ? "filter-button-active"
                      : "filter-button-inactive"
                  }`}
                >
                  {tech.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
