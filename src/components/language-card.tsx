import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PatternCard } from './pattern-card';
import type { Language, Pattern } from '@/lib/types';

interface LanguageCardProps {
  language: Language;
  patterns: Pattern[];
}

export function LanguageCard({ language, patterns }: LanguageCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${language.color} rounded-xl flex items-center justify-center`}
          >
            <i className={`fab fa-${language.icon} text-white text-2xl`} />
          </div>
          <div className="flex-1">
            <CardTitle className="font-semibold tracking-tight text-2xl mb-2">
              {language.name}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Patrones implementados en {language.name}
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {patterns.length} patrones
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
