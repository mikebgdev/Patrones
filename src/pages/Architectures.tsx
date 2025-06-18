import { useState, useEffect } from "react";
import { getArchitectures, getPatterns } from "@/lib/firebase";
import type { Architecture, Pattern } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArchitectureGrid } from "@/components/architecture-grid";

export function Architectures() {
  const [architectures, setArchitectures] = useState<Architecture[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getArchitectures(), getPatterns()]).then(([archs, pats]) => {
      setArchitectures(archs);
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
              Arquitecturas de Software
            </h1>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Cargando información...
              </p>
            </div>
          ) : (
            <ArchitectureGrid architectures={architectures} patterns={patterns} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}