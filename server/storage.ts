import { patterns, architectures, type Pattern, type Architecture, type InsertPattern, type InsertArchitecture } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private patterns: Map<number, Pattern>;
  private architectures: Map<number, Architecture>;
  private currentPatternId: number;
  private currentArchitectureId: number;

  constructor() {
    this.patterns = new Map();
    this.architectures = new Map();
    this.currentPatternId = 1;
    this.currentArchitectureId = 1;
    
    // Initialize with some default data
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // This would be populated with real data in a production app
    // For now, we'll rely on the frontend mock data
  }

  async getAllPatterns(): Promise<Pattern[]> {
    return Array.from(this.patterns.values());
  }

  async getPatternBySlug(slug: string): Promise<Pattern | undefined> {
    return Array.from(this.patterns.values()).find(pattern => pattern.slug === slug);
  }

  async getPatternsByCategory(category: string): Promise<Pattern[]> {
    return Array.from(this.patterns.values()).filter(pattern => pattern.category === category);
  }

  async createPattern(insertPattern: InsertPattern): Promise<Pattern> {
    const id = this.currentPatternId++;
    const pattern: Pattern = { ...insertPattern, id };
    this.patterns.set(id, pattern);
    return pattern;
  }

  async getAllArchitectures(): Promise<Architecture[]> {
    return Array.from(this.architectures.values());
  }

  async getArchitectureBySlug(slug: string): Promise<Architecture | undefined> {
    return Array.from(this.architectures.values()).find(arch => arch.slug === slug);
  }

  async createArchitecture(insertArchitecture: InsertArchitecture): Promise<Architecture> {
    const id = this.currentArchitectureId++;
    const architecture: Architecture = { ...insertArchitecture, id };
    this.architectures.set(id, architecture);
    return architecture;
  }
}

export const storage = new MemStorage();
