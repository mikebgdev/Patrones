import type { Language, Pattern } from '@/lib/types';
import { LanguageCard } from './language-card';

interface LanguageGridProps {
  languages: Language[];
  patterns: Pattern[];
}

export function LanguageGrid({ languages, patterns }: LanguageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {languages.map((language) => {
        const count = patterns.filter((p) =>
          p.languages.includes(language.slug)
        ).length;
        return (
          <LanguageCard
            key={language.slug}
            language={language}
            patternsCount={count}
          />
        );
      })}
    </div>
  );
}
