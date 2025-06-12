import { Link } from "wouter";
import { Code, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Code className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Design Patterns</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              La guía más completa de patrones de diseño y arquitecturas modernas de software. Aprende, practica y domina los conceptos fundamentales.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Patrones
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/creational" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Creacionales
                </Link>
              </li>
              <li>
                <Link href="/structural" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Estructurales
                </Link>
              </li>
              <li>
                <Link href="/behavioral" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Comportamiento
                </Link>
              </li>
              <li>
                <Link href="/architectural" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Arquitecturales
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/exercises" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Ejercicios
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Design Patterns. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Construido con ❤️ para desarrolladores
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
