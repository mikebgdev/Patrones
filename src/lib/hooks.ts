import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InsertSnippet } from '@/lib/types';
import {
  getPatterns,
  getPatternBySlug,
  getArchitectures,
  getArchitectureBySlug,
  getFavorites,
  addFavorite,
  removeFavorite,
  getGeneratedSnippets,
  saveGeneratedSnippet,
} from './firebase';

// Patterns
export function usePatterns() {
  return useQuery(['patterns'], getPatterns);
}

export function usePattern(slug: string) {
  return useQuery(['pattern', slug], () => getPatternBySlug(slug), {
    enabled: !!slug,
  });
}

// Architectures
export function useArchitectures() {
  return useQuery(['architectures'], getArchitectures);
}

export function useArchitecture(slug: string) {
  return useQuery(['architecture', slug], () => getArchitectureBySlug(slug), {
    enabled: !!slug,
  });
}

// Favorites
export function useFavorites(userId: string) {
  return useQuery(['favorites', userId], () => getFavorites(userId), {
    enabled: !!userId,
  });
}

export function useAddFavorite() {
  const qc = useQueryClient();
  return useMutation(
    ({ patternId, userId }: { patternId: number; userId: string }) =>
      addFavorite(patternId, userId),
    {
      onSuccess: () => {
        qc.invalidateQueries(['favorites']);
      },
    }
  );
}

export function useRemoveFavorite() {
  const qc = useQueryClient();
  return useMutation(
    ({ patternId, userId }: { patternId: number; userId: string }) =>
      removeFavorite(patternId, userId),
    {
      onSuccess: () => {
        qc.invalidateQueries(['favorites']);
      },
    }
  );
}

// Generated snippets
export function useGeneratedSnippets(patternId: number) {
  return useQuery(['generatedSnippets', patternId], () => getGeneratedSnippets(patternId), {
    enabled: !!patternId,
  });
}

export function useSaveGeneratedSnippet() {
  const qc = useQueryClient();
  return useMutation((snippet: InsertSnippet) => saveGeneratedSnippet(snippet), {
    onSuccess: () => {
      qc.invalidateQueries(['generatedSnippets']);
    },
  });
}