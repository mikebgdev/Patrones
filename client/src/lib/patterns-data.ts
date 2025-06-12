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
      javascript: "class Subject { constructor() { this.observers = []; } notify(data) { this.observers.forEach(observer => observer.update(data)); } }",
      php: "class Subject { private $observers = []; public function notify($data) { foreach ($this->observers as $observer) { $observer->update($data); } } }"
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
      javascript: "class Adapter { constructor(adaptee) { this.adaptee = adaptee; } request() { return this.adaptee.specificRequest(); } }",
      php: "class Adapter implements Target { private $adaptee; public function __construct($adaptee) { $this->adaptee = $adaptee; } public function request() { return $this->adaptee->specificRequest(); } }"
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
      javascript: "class Command { execute() { throw new Error('Must implement'); } } class ConcreteCommand extends Command { execute() { this.receiver.action(); } }",
      php: "interface Command { public function execute(); } class ConcreteCommand implements Command { public function execute() { $this->receiver->action(); } }"
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
      javascript: "class Repository { async findById(id) { return await this.dataSource.findById(id); } async save(entity) { return await this.dataSource.save(entity); } }",
      php: "interface Repository { public function findById($id); public function save($entity); } class UserRepository implements Repository { public function findById($id) { return $this->db->find($id); } }"
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
      javascript: "class Controller { constructor(model, view) { this.model = model; this.view = view; } updateView() { this.view.render(this.model.getData()); } }",
      php: "class Controller { private $model; private $view; public function __construct($model, $view) { $this->model = $model; $this->view = $view; } public function updateView() { $this->view->render($this->model->getData()); } }"
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
      javascript: "class Strategy { execute() { throw new Error('Must implement'); } } class ConcreteStrategy extends Strategy { execute() { console.log('Executing strategy'); } }",
      php: "interface Strategy { public function execute(); } class ConcreteStrategy implements Strategy { public function execute() { echo 'Executing strategy'; } }"
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
