import { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from "react";
import type { PatternFilters } from "@/lib/types";

interface FilterContextType {
  filters: PatternFilters;
  searchQuery: string;
  updateFilter: (key: keyof PatternFilters, value: string | boolean | string[] | undefined) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  /** Mostrar solo patrones favoritos */
  favorites?: boolean;
}

type FilterState = {
  filters: PatternFilters;
  searchQuery: string;
};

type Action =
  | { type: "SET_FILTER"; key: keyof PatternFilters; value?: string | boolean | string[] }
  | { type: "SET_SEARCH"; query: string }
  | { type: "CLEAR_FILTERS" };

const initialState: FilterState = { filters: {}, searchQuery: "" };

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.query };
    case "CLEAR_FILTERS":
      return initialState;
    default:
      return state;
  }
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const updateFilter = useCallback(
    (
      key: keyof PatternFilters,
      value: string | boolean | string[] | undefined,
    ) => {
      dispatch({ type: "SET_FILTER", key, value });
    },
    [],
  );

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH", query });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, []);

  const value = useMemo(
    () => ({
      filters: state.filters,
      searchQuery: state.searchQuery,
      updateFilter,
      setSearchQuery,
      clearFilters,
    }),
    [state.filters, state.searchQuery, updateFilter, setSearchQuery, clearFilters],
  );

  return (
    <FilterContext.Provider
      value={value}
    >
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
