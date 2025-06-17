import { Link } from "wouter";
import { Moon, Sun, Menu, Code, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Code className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Design Patterns</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Catálogo de Patrones</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link href="/architectures" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Arquitecturas
            </Link>
            <Link href="/languages" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Lenguajes
            </Link>
            <Link href="/favorites" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <Heart className="h-4 w-4" />
              Favoritos
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
