import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const patterns = pgTable("patterns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // creational, structural, behavioral, architectural
  difficulty: integer("difficulty").notNull(), // 1-3
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  tags: text("tags").array().notNull(),
  architectures: text("architectures").array().notNull(),
  languages: text("languages").array().notNull(),
  frameworks: text("frameworks").array().notNull(),
  content: text("content").notNull(), // detailed explanation
  examples: jsonb("examples").notNull(), // code examples in different languages
  relatedPatterns: text("related_patterns").array().notNull(),
});

export const architectures = pgTable("architectures", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  patternCount: integer("pattern_count").notNull(),
});

export const insertPatternSchema = createInsertSchema(patterns).omit({
  id: true,
});

export const insertArchitectureSchema = createInsertSchema(architectures).omit({
  id: true,
});

export type Pattern = typeof patterns.$inferSelect;
export type InsertPattern = z.infer<typeof insertPatternSchema>;
export type Architecture = typeof architectures.$inferSelect;
export type InsertArchitecture = z.infer<typeof insertArchitectureSchema>;

// Filter types
export type PatternCategory = "creational" | "structural" | "behavioral" | "architectural";
export type DifficultyLevel = 1 | 2 | 3;

export interface PatternFilters {
  category?: PatternCategory;
  architecture?: string;
  language?: string;
  framework?: string;
  difficulty?: DifficultyLevel;
  search?: string;
}
