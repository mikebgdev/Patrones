import type { Language, Pattern } from '@/lib/types';
import { LanguageCard } from './language-card';

interface LanguageGridProps {
  languages: Language[];
  patterns: Pattern[];
}

export function LanguageGrid({ languages, patterns }: LanguageGridProps) {
  return (
    <div className="grid gap-8">
      {languages.map((language) => {
        const filtered = patterns.filter((p) =>
          p.languages.includes(language.slug),
        );
        return (
          <LanguageCard
            key={language.slug}
            language={language}
            patterns={filtered}
          />
        );
      })}
    </div>
  );
}
