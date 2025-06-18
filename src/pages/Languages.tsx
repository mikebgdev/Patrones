import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageGrid } from "@/components/language-grid";
import { getLanguages, getPatterns } from "@/lib/firebase";
import type { Language, Pattern } from "@/lib/types";

export function Languages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getLanguages(), getPatterns()]).then(([langs, pats]) => {
      setLanguages(langs);
      setPatterns(pats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lenguajes y Frameworks
            </h1>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando información...
              </p>
            </div>
          ) : (
            <LanguageGrid languages={languages} patterns={patterns} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}