import { patterns, architectures, favorites, generatedSnippets, type Pattern, type Architecture, type InsertPattern, type InsertArchitecture, type Favorite, type InsertFavorite, type GeneratedSnippet, type InsertSnippet } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Pattern operations
  getAllPatterns(): Promise<Pattern[]>;
  getPatternBySlug(slug: string): Promise<Pattern | undefined>;
  getPatternsByCategory(category: string): Promise<Pattern[]>;
  createPattern(pattern: InsertPattern): Promise<Pattern>;
  
  // Architecture operations
  getAllArchitectures(): Promise<Architecture[]>;
  getArchitectureBySlug(slug: string): Promise<Architecture | undefined>;
  createArchitecture(architecture: InsertArchitecture): Promise<Architecture>;
  
  // Favorites operations
  getFavorites(userId: string): Promise<Favorite[]>;
  addFavorite(patternId: number, userId: string): Promise<Favorite>;
  removeFavorite(patternId: number, userId: string): Promise<void>;
  
  // Generated snippets operations
  saveGeneratedSnippet(snippet: InsertSnippet): Promise<GeneratedSnippet>;
  getGeneratedSnippets(patternId: number): Promise<GeneratedSnippet[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllPatterns(): Promise<Pattern[]> {
    return await db.select().from(patterns);
  }

  async getPatternBySlug(slug: string): Promise<Pattern | undefined> {
    const [pattern] = await db.select().from(patterns).where(eq(patterns.slug, slug));
    return pattern || undefined;
  }

  async getPatternsByCategory(category: string): Promise<Pattern[]> {
    return await db.select().from(patterns).where(eq(patterns.category, category));
  }

  async createPattern(insertPattern: InsertPattern): Promise<Pattern> {
    const [pattern] = await db
      .insert(patterns)
      .values(insertPattern)
      .returning();
    return pattern;
  }

  async getAllArchitectures(): Promise<Architecture[]> {
    return await db.select().from(architectures);
  }

  async getArchitectureBySlug(slug: string): Promise<Architecture | undefined> {
    const [architecture] = await db.select().from(architectures).where(eq(architectures.slug, slug));
    return architecture || undefined;
  }

  async createArchitecture(insertArchitecture: InsertArchitecture): Promise<Architecture> {
    const [architecture] = await db
      .insert(architectures)
      .values(insertArchitecture)
      .returning();
    return architecture;
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async addFavorite(patternId: number, userId: string): Promise<Favorite> {
    const [favorite] = await db
      .insert(favorites)
      .values({ patternId, userId, createdAt: new Date().toISOString() })
      .returning();
    return favorite;
  }

  async removeFavorite(patternId: number, userId: string): Promise<void> {
    await db.delete(favorites)
      .where(and(eq(favorites.patternId, patternId), eq(favorites.userId, userId)));
  }

  async saveGeneratedSnippet(snippet: InsertSnippet): Promise<GeneratedSnippet> {
    const [generated] = await db
      .insert(generatedSnippets)
      .values({ ...snippet, createdAt: new Date().toISOString() })
      .returning();
    return generated;
  }

  async getGeneratedSnippets(patternId: number): Promise<GeneratedSnippet[]> {
    return await db.select().from(generatedSnippets).where(eq(generatedSnippets.patternId, patternId));
  }
}

export const storage = new DatabaseStorage();
