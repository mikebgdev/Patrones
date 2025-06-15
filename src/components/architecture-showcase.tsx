import { useArchitectures } from "@/lib/hooks";
import { Building2, Layers, Zap, Users, Database, GitBranch, Settings } from "lucide-react";
import type { Architecture } from "@/lib/types";

const getArchitectureIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'building': Building2,
    'layer-group': Layers,
    'bolt': Zap,
    'users': Users,
    'database': Database,
    'code-branch': GitBranch,
    'cog': Settings,
    'hexagon': Building2,
    'cube': Layers,
    'lightning': Zap
  };
  
  const IconComponent = iconMap[iconName] || Building2;
  return <IconComponent className="text-white" size={24} />;
};

export function ArchitectureShowcase() {
  const { data: architectures = [], isLoading } = useArchitectures();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">Cargando arquitecturas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Arquitecturas Modernas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explora patrones arquitecturales que están transformando el desarrollo de software moderno
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architectures.map((architecture) => (
            <div
              key={architecture.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${architecture.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                {getArchitectureIcon(architecture.icon)}
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-white">
                {architecture.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                {architecture.description}
              </p>
              <div className="text-center">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                  {architecture.patternCount} patrones
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
