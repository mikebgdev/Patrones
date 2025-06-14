import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PatternCard } from "@/components/pattern-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/favorites-context";
import { useQuery } from "@tanstack/react-query";
import type { Pattern } from "@shared/schema";

export function Favorites() {
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  const { data: patterns = [], isLoading: patternsLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    queryFn: async () => {
      const response = await fetch("/api/patterns");
      if (!response.ok) throw new Error("Failed to fetch patterns");
      return response.json();
    }
  });

  const favoritePatterns = patterns.filter(pattern => 
    favorites.some(fav => fav.patternId === pattern.id)
  );

  if (favoritesLoading || patternsLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Cargando favoritos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="text-white w-6 h-6 fill-current" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Mis Favoritos
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Tus patrones de diseño guardados para acceso rápido
            </p>
          </div>

          {/* Favorites Grid */}
          {favoritePatterns.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {favoritePatterns.length} patrón{favoritePatterns.length !== 1 ? 'es' : ''} guardado{favoritePatterns.length !== 1 ? 's' : ''}
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoritePatterns.map((pattern) => (
                  <PatternCard 
                    key={pattern.id} 
                    pattern={pattern}
                    onOpenCodeGenerator={() => handleOpenCodeGenerator(pattern)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No tienes favoritos aún
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Explora el catálogo de patrones y marca como favoritos los que más te interesen
              </p>
              <Button asChild>
                <a href="/">Explorar patrones</a>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Code Generator Modal */}
      {selectedPattern && (
        <CodeSnippetGenerator
          pattern={selectedPattern}
          isOpen={showCodeGenerator}
          onClose={handleCloseCodeGenerator}
        />
      )}
    </div>
  );
}