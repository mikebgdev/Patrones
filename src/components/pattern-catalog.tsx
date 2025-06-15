import { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatternCard } from "./pattern-card";
import { useFilters } from "@/contexts/filter-context";
import { useQuery } from "@tanstack/react-query";
import type { Pattern } from "@shared/schema";

interface PatternCatalogProps {}

export function PatternCatalog() {
  const { filters, searchQuery } = useFilters();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const { data: patterns = [], isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const filteredPatterns = useMemo(() => {
    let filtered = patterns;

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(pattern => pattern.category === filters.category);
    }

    // Apply architecture filter
    if (filters.architecture) {
      filtered = filtered.filter(pattern => 
        pattern.architectures.includes(filters.architecture!)
      );
    }

    // Apply language/framework filter
    if (filters.language) {
      filtered = filtered.filter(pattern => 
        pattern.languages.includes(filters.language!)
      );
    }
    
    if (filters.framework) {
      filtered = filtered.filter(pattern => 
        pattern.frameworks.includes(filters.framework!)
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pattern => 
        pattern.name.toLowerCase().includes(query) ||
        pattern.description.toLowerCase().includes(query) ||
        pattern.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "difficulty":
        filtered.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case "recent":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // popular
        break;
    }

    return filtered;
  }, [patterns, filters, searchQuery, sortBy]);

  return (
    <main className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Catálogo de Patrones</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Mostrando {filteredPatterns.length} patrones de diseño
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="alphabetical">Alfabético A-Z</SelectItem>
                <SelectItem value="difficulty">Dificultad</SelectItem>
                <SelectItem value="recent">Más recientes</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Pattern Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Cargando patrones...
            </p>
          </div>
        ) : filteredPatterns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se encontraron patrones que coincidan con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredPatterns.map((pattern) => (
              <PatternCard 
                key={pattern.id} 
                pattern={pattern} 
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPatterns.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más patrones
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
