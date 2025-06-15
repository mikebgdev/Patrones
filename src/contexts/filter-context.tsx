import { createContext, useContext, useState, ReactNode } from "react";
import type { PatternFilters, PatternCategory } from "@shared/schema";

interface FilterContextType {
  filters: PatternFilters;
  updateFilter: (key: keyof PatternFilters, value: string | undefined) => void;
  clearFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<PatternFilters>({});
  const [searchQuery, setSearchQuery] = useState("");

  const updateFilter = (key: keyof PatternFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <FilterContext.Provider value={{
      filters,
      updateFilter,
      clearFilters,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
