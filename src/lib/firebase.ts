import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type {
  Pattern,
  Architecture,
  Language,
  Favorite,
  GeneratedSnippet,
  InsertSnippet,
} from '@/lib/types';
import { firebaseConfig } from './env';

function normalizePattern(data: any): Pattern {
  return {
    id: data.id ?? 0,
    name: data.name ?? '',
    slug: data.slug ?? '',
    description: data.description ?? data.descriptionShort ?? '',
    category: data.category ?? data.type ?? '',
    difficulty: data.difficulty ?? 1,
    icon:
      data.icon ??
      (data.iconUrl
        ? data.iconUrl.replace(/^fa-(solid|regular)\s+fa-/, '')
        : 'cog'),
    color: data.color ?? 'from-blue-500 to-blue-600',
    tags: data.tags ?? [],
    architectures: data.architectures ?? [],
    languages: data.languages ?? [],
    frameworks: data.frameworks ?? [],
    content: data.content ?? data.descriptionLong ?? '',
    codeExamples: data.codeExamples ?? data.examples ?? {},
    relatedPatterns: data.relatedPatterns ?? [],
  };
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function getPatterns(): Promise<Pattern[]> {
  const snap = await getDocs(collection(db, 'patterns'));
  return snap.docs.map((d) => normalizePattern(d.data()));
}

export async function getPatternBySlug(slug: string): Promise<Pattern | null> {
  const q = query(collection(db, 'patterns'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return normalizePattern(snap.docs[0].data());
}

export async function getArchitectures(): Promise<Architecture[]> {
  const snap = await getDocs(collection(db, 'architectures'));
  return snap.docs.map((d) => d.data() as Architecture);
}

export async function getLanguages(): Promise<Language[]> {
  const snap = await getDocs(collection(db, 'languages'));
  return snap.docs.map((d) => d.data() as Language);
}

export async function getLanguageBySlug(
  slug: string,
): Promise<Language | null> {
  const q = query(collection(db, 'languages'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as Language;
}
export async function getArchitectureBySlug(
  slug: string,
): Promise<Architecture | null> {
  const q = query(collection(db, 'architectures'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as Architecture;
}

export async function getFavorites(userId: string): Promise<Favorite[]> {
  const q = query(collection(db, 'favorites'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Favorite);
}

export async function addFavorite(
  patternId: number,
  userId: string,
): Promise<Favorite> {
  const ref = await addDoc(collection(db, 'favorites'), {
    patternId,
    userId,
    createdAt: new Date().toISOString(),
  });
  const d = await getDoc(ref);
  return { id: ref.id, ...(d.data() as Omit<Favorite, 'id'>) };
}

export async function removeFavorite(
  patternId: number,
  userId: string,
): Promise<void> {
  const q = query(
    collection(db, 'favorites'),
    where('patternId', '==', patternId),
    where('userId', '==', userId),
  );
  const snap = await getDocs(q);
  if (snap.empty) return;
  await deleteDoc(doc(db, 'favorites', snap.docs[0].id));
}

export async function getGeneratedSnippets(
  patternId: number,
): Promise<GeneratedSnippet[]> {
  const q = query(
    collection(db, 'generatedSnippets'),
    where('patternId', '==', patternId),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as GeneratedSnippet);
}

export async function saveGeneratedSnippet(
  snippet: InsertSnippet,
): Promise<GeneratedSnippet> {
  const ref = await addDoc(collection(db, 'generatedSnippets'), {
    ...snippet,
    createdAt: new Date().toISOString(),
  });
  const d = await getDoc(ref);
  return { id: ref.id, ...(d.data() as Omit<GeneratedSnippet, 'id'>) };
}
