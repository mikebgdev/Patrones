import { patterns, architectures, type Pattern, type Architecture, type InsertPattern, type InsertArchitecture } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
