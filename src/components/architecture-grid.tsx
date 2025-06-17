import type { Architecture, Pattern } from '@/lib/types';
import { ArchitectureCard } from './architecture-card';

interface ArchitectureGridProps {
  architectures: Architecture[];
  patterns: Pattern[];
}

export function ArchitectureGrid({ architectures, patterns }: ArchitectureGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {architectures.map((architecture) => {
        const count = patterns.filter((p) =>
          p.architectures.includes(architecture.slug)
        ).length;
        return (
          <ArchitectureCard
            key={architecture.slug}
            architecture={architecture}
            patternsCount={count}
          />
        );
      })}
    </div>
  );
}