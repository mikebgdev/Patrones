export interface Pattern {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  difficulty: number;
  icon: string;
  color: string;
  tags: string[];
  architectures: string[];
  languages: string[];
  frameworks: string[];
  content: string;
  examples: Record<string, string>;
  relatedPatterns: string[];
}

export interface Architecture {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  patternCount: number;
}

export interface Favorite {
  id: string;
  patternId: number;
  userId: string;
  createdAt: string;
}

export interface GeneratedSnippet {
  id: string;
  patternId: number;
  language: string;
  context: string;
  code: string;
  explanation: string;
  createdAt: string;
}

export interface InsertSnippet {
  patternId: number;
  language: string;
  context: string;
  code: string;
  explanation: string;
}

export type PatternCategory = 'creational' | 'structural' | 'behavioral' | 'architectural';
export interface PatternFilters {
  category?: PatternCategory;
  architecture?: string;
  language?: string;
  framework?: string;
  difficulty?: number;
  search?: string;
}