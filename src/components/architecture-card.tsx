import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PatternMiniCard } from './pattern-mini-card';
import type { Architecture, Pattern } from '@/lib/types';

interface ArchitectureCardProps {
  architecture: Architecture;
  patterns: Pattern[];
}

export function ArchitectureCard({ architecture, patterns }: ArchitectureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${architecture.color} rounded-xl flex items-center justify-center`}>
            <i className={`fas fa-${architecture.icon} text-white text-2xl`} />
          </div>
          <div className="flex-1">
            <CardTitle className="mb-2">{architecture.name}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{architecture.description}</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {patterns.length} patrones
          </Badge>
        </div>
      </CardHeader>
      {patterns.length > 0 && (
        <CardContent>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Patrones relacionados</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patterns.map((p) => (
              <PatternMiniCard key={p.slug} pattern={p} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}