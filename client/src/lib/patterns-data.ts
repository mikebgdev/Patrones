import type { Pattern, Architecture } from "@shared/schema";

export const mockPatterns: Pattern[] = [
  {
    id: 1,
    name: "Singleton",
    slug: "singleton",
    description: "Asegura que una clase tenga una única instancia y proporciona acceso global a ella.",
    category: "creational",
    difficulty: 1,
    icon: "cube",
    color: "from-orange-400 to-red-500",
    tags: ["instance", "global", "access"],
    architectures: ["mvc", "layered"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Singleton garantiza que una clase tenga solo una instancia...",
    examples: {
      javascript: "class Singleton { static instance = null; static getInstance() { if (!this.instance) this.instance = new Singleton(); return this.instance; } }",
      php: "class Singleton { private static $instance = null; public static function getInstance() { if (self::$instance === null) self::$instance = new self(); return self::$instance; } }"
    },
    relatedPatterns: ["factory", "abstract-factory"]
  },
  {
    id: 2,
    name: "Factory Method",
    slug: "factory-method",
    description: "Proporciona una interfaz para crear objetos sin especificar sus clases concretas.",
    category: "creational",
    difficulty: 2,
    icon: "industry",
    color: "from-blue-400 to-indigo-500",
    tags: ["creation", "interface", "objects"],
    architectures: ["mvc", "hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Factory Method define una interfaz para crear objetos...",
    examples: {
      javascript: "class Creator { factoryMethod() { throw new Error('Must implement'); } } class ConcreteCreator extends Creator { factoryMethod() { return new ConcreteProduct(); } }",
      php: "abstract class Creator { abstract public function factoryMethod(); } class ConcreteCreator extends Creator { public function factoryMethod() { return new ConcreteProduct(); } }"
    },
    relatedPatterns: ["abstract-factory", "singleton"]
  },
  {
    id: 3,
    name: "Observer",
    slug: "observer",
    description: "Define una dependencia uno-a-muchos entre objetos para notificar cambios automáticamente.",
    category: "behavioral",
    difficulty: 2,
    icon: "eye",
    color: "from-green-400 to-teal-500",
    tags: ["notification", "dependency", "events"],
    architectures: ["event-driven", "mvc"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Observer define una dependencia de uno a muchos...",
    examples: {
      javascript: "class Subject { constructor() { this.observers = []; } }",
      java: "public interface Observer { void update(Object data); }"
    },
    relatedPatterns: ["mediator", "command"]
  },
  {
    id: 4,
    name: "Adapter",
    slug: "adapter",
    description: "Permite que clases con interfaces incompatibles trabajen juntas.",
    category: "structural",
    difficulty: 1,
    icon: "plug",
    color: "from-purple-400 to-pink-500",
    tags: ["interface", "compatibility", "wrapper"],
    architectures: ["hexagonal", "layered"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Adapter permite que interfaces incompatibles trabajen juntas...",
    examples: {
      java: "public class Adapter implements Target { private Adaptee adaptee; }",
      python: "class Adapter: def __init__(self, adaptee): self.adaptee = adaptee"
    },
    relatedPatterns: ["facade", "decorator"]
  },
  {
    id: 5,
    name: "Command",
    slug: "command",
    description: "Encapsula una petición como un objeto, permitiendo parametrizar y hacer cola de operaciones.",
    category: "behavioral",
    difficulty: 3,
    icon: "terminal",
    color: "from-red-400 to-orange-500",
    tags: ["encapsulation", "request", "queue"],
    architectures: ["cqrs", "event-driven"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Command encapsula una petición como un objeto...",
    examples: {
      csharp: "public interface ICommand { void Execute(); }",
      java: "public interface Command { void execute(); }"
    },
    relatedPatterns: ["observer", "memento"]
  },
  {
    id: 6,
    name: "Repository",
    slug: "repository",
    description: "Encapsula la lógica necesaria para acceder a fuentes de datos.",
    category: "architectural",
    difficulty: 2,
    icon: "database",
    color: "from-teal-400 to-cyan-500",
    tags: ["data", "access", "abstraction"],
    architectures: ["ddd", "hexagonal", "layered"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Repository encapsula la lógica para acceder a datos...",
    examples: {
      csharp: "public interface IRepository<T> { Task<T> GetByIdAsync(int id); }",
      java: "public interface Repository<T> { Optional<T> findById(Long id); }"
    },
    relatedPatterns: ["unit-of-work", "specification"]
  },
  {
    id: 7,
    name: "MVC",
    slug: "mvc",
    description: "Separa la aplicación en tres componentes interconectados: Modelo, Vista y Controlador.",
    category: "architectural",
    difficulty: 1,
    icon: "layer-group",
    color: "from-indigo-400 to-purple-500",
    tags: ["separation", "concerns", "ui"],
    architectures: ["mvc", "layered"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón MVC separa la aplicación en tres componentes...",
    examples: {
      javascript: "class Controller { constructor(model, view) { this.model = model; } }",
      csharp: "public class Controller : ControllerBase { private readonly IService _service; }"
    },
    relatedPatterns: ["mvp", "mvvm"]
  },
  {
    id: 8,
    name: "Strategy",
    slug: "strategy",
    description: "Define una familia de algoritmos, los encapsula y los hace intercambiables.",
    category: "behavioral",
    difficulty: 2,
    icon: "chess",
    color: "from-yellow-400 to-orange-500",
    tags: ["algorithm", "family", "interchangeable"],
    architectures: ["layered", "hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Strategy define una familia de algoritmos...",
    examples: {
      java: "public interface Strategy { void execute(); }",
      python: "class Strategy: def execute(self): pass"
    },
    relatedPatterns: ["state", "template-method"]
  }
];

export const mockArchitectures: Architecture[] = [
  {
    id: 1,
    name: "Hexagonal",
    slug: "hexagonal",
    description: "Separa la lógica de negocio de los detalles externos mediante puertos y adaptadores.",
    icon: "hexagon",
    color: "from-blue-500 to-indigo-600",
    patternCount: 12
  },
  {
    id: 2,
    name: "DDD",
    slug: "ddd",
    description: "Modela software alrededor de los conceptos del dominio del negocio.",
    icon: "sitemap",
    color: "from-green-500 to-teal-600",
    patternCount: 18
  },
  {
    id: 3,
    name: "CQRS",
    slug: "cqrs",
    description: "Separa las operaciones de lectura y escritura para optimizar rendimiento.",
    icon: "exchange-alt",
    color: "from-purple-500 to-pink-600",
    patternCount: 8
  },
  {
    id: 4,
    name: "Event-Driven",
    slug: "event-driven",
    description: "Arquitectura basada en la producción y consumo de eventos.",
    icon: "broadcast-tower",
    color: "from-orange-500 to-red-600",
    patternCount: 15
  }
];
