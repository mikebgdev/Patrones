import { Link } from 'wouter';
import type { Pattern } from '@/lib/types';
import { getIconComponent } from '@/lib/icon-map';

interface PatternMiniCardProps {
  pattern: Pattern;
}

export function PatternMiniCard({ pattern }: PatternMiniCardProps) {
  return (
    <Link href={`/pattern/${pattern.slug}`}>
      <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 bg-gradient-to-br ${pattern.color} rounded-lg flex items-center justify-center`}>
            {(() => { const Icon = getIconComponent(pattern.icon); return <Icon className="text-white" size={12} />; })()}
          </div>
          <h5 className="font-medium text-gray-900 dark:text-white">{pattern.name}</h5>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{pattern.description}</p>
      </div>
    </Link>
  );
}
