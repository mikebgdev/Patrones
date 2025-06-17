import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import type { Architecture } from '@/lib/types';

interface ArchitectureCardProps {
  architecture: Architecture;
  patternsCount: number;
}

export function ArchitectureCard({ architecture, patternsCount }: ArchitectureCardProps) {
  return (
    <Link href={`/patterns?architecture=${architecture.slug}`}> 
      <div className="overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${architecture.color} rounded-xl flex items-center justify-center`}>
              <i className={`fas fa-${architecture.icon} text-white text-2xl`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{architecture.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{architecture.description}</p>
            </div>
          </div>
          <Badge variant="secondary">{patternsCount} patrones</Badge>
        </div>
      </div>
    </Link>
  );
}