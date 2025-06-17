import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Favorite, Pattern } from "@/lib/types";

interface FavoritesContextType {
  favorites: Favorite[];
  favoritePatternIds: Set<number>;
  toggleFavorite: (patternId: number) => void;
  isFavorite: (patternId: number) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Generate a simple user ID for session-based favorites
const getUserId = () => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('user_id', userId);
  }
  return userId;
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const userId = getUserId();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["/api/favorites", userId],
    queryFn: async (): Promise<Favorite[]> => {
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error("Failed to fetch favorites");
      }
      return response.json();
    }
  });

  const favoritePatternIds = new Set(favorites.map(fav => fav.patternId));

  const addFavoriteMutation = useMutation({
    mutationFn: async (patternId: number) => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patternId, userId })
      });
      if (!response.ok) throw new Error("Failed to add favorite");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites", userId] });
    }
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (patternId: number) => {
      const response = await fetch(`/api/favorites/${patternId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      if (!response.ok) throw new Error("Failed to remove favorite");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites", userId] });
    }
  });

  const toggleFavorite = (patternId: number) => {
    if (favoritePatternIds.has(patternId)) {
      removeFavoriteMutation.mutate(patternId);
    } else {
      addFavoriteMutation.mutate(patternId);
    }
  };

  const isFavorite = (patternId: number) => {
    return favoritePatternIds.has(patternId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritePatternIds,
      toggleFavorite,
      isFavorite,
      isLoading
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}