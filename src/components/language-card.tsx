import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import type { Language } from '@/lib/types';

interface LanguageCardProps {
  language: Language;
  patternsCount: number;
}

export function LanguageCard({ language, patternsCount }: LanguageCardProps) {
  return (
    <Link href={`/patterns?language=${language.slug}`}>
      <div className="overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${language.color} rounded-xl flex items-center justify-center`}>
              <i className={`fab fa-${language.icon} text-white text-2xl`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{language.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{language.description}</p>
            </div>
          </div>
          <Badge variant="secondary">{patternsCount} patrones</Badge>
        </div>
      </div>
    </Link>
  );
}
