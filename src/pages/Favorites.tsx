import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useEffect } from 'react';
import { PatternCatalog } from '@/components/pattern-catalog';
import { useFilters } from '@/contexts/FilterContext';

export function Favorites() {
  const { updateFilter } = useFilters();

  // Aplicar filtro de favoritos sólo en esta página
  useEffect(() => {
    updateFilter('favorites', true);
    return () => updateFilter('favorites', false);
  }, [updateFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <PatternCatalog />
      <Footer />
    </div>
  );
}