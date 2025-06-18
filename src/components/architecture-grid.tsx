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
        const related = patterns.filter((p) =>
          p.architectures.includes(architecture.slug)
        );
        return (
          <ArchitectureCard
            key={architecture.slug}
            architecture={architecture}
            patterns={related}
          />
        );
      })}
    </div>
  );
}