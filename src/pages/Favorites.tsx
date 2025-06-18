import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import { PatternCatalog } from '@/components/pattern-catalog';
import { useFilters } from '@/contexts/FilterContext';

export function Favorites() {
  const { updateFilter } = useFilters();

  useEffect(() => {
    updateFilter('favorites', true);
    return () => updateFilter('favorites', false);
  }, [updateFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Mis Favoritos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              Tus patrones de diseño guardados para acceso rápido
            </p>
          </div>

          <PatternCatalog />
        </div>
      </main>

      <Footer />
    </div>
  );
}
