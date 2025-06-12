import type { Pattern, Architecture } from "@shared/schema";

export const mockPatterns: Pattern[] = [
  // CREATIONAL PATTERNS
  {
    id: 1,
    name: "Factory Method",
    slug: "factory-method",
    description: "Proporciona una interfaz para crear objetos en una superclase, pero permite a las subclases alterar el tipo de objetos que se crearán.",
    category: "creational",
    difficulty: 2,
    icon: "industry",
    color: "from-blue-500 to-blue-600",
    tags: ["creation", "interface", "objects"],
    architectures: ["hexagonal", "ddd"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Factory Method define una interfaz para crear objetos sin especificar sus clases exactas.",
    examples: {
      javascript: "class Creator { factoryMethod() { throw new Error('Must implement'); } } class ConcreteCreator extends Creator { factoryMethod() { return new ConcreteProduct(); } }",
      php: "abstract class Creator { abstract public function factoryMethod(); } class ConcreteCreator extends Creator { public function factoryMethod() { return new ConcreteProduct(); } }"
    },
    relatedPatterns: ["abstract-factory", "singleton"]
  },
  {
    id: 2,
    name: "Abstract Factory",
    slug: "abstract-factory",
    description: "Permite producir familias de objetos relacionados sin especificar sus clases concretas.",
    category: "creational",
    difficulty: 3,
    icon: "boxes",
    color: "from-indigo-500 to-indigo-600",
    tags: ["families", "objects", "abstract"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Abstract Factory proporciona una interfaz para crear familias de objetos relacionados.",
    examples: {
      javascript: "class AbstractFactory { createProductA() {} createProductB() {} } class ConcreteFactory extends AbstractFactory { createProductA() { return new ConcreteProductA(); } }",
      php: "interface AbstractFactory { public function createProductA(); public function createProductB(); } class ConcreteFactory implements AbstractFactory { public function createProductA() { return new ConcreteProductA(); } }"
    },
    relatedPatterns: ["factory-method", "singleton"]
  },
  {
    id: 3,
    name: "Builder",
    slug: "builder",
    description: "Permite construir objetos complejos paso a paso. El patrón permite producir distintos tipos y representaciones de un objeto empleando el mismo código de construcción.",
    category: "creational",
    difficulty: 2,
    icon: "hammer",
    color: "from-green-500 to-green-600",
    tags: ["construction", "complex", "step-by-step"],
    architectures: ["ddd"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Builder permite construir objetos complejos paso a paso utilizando el mismo proceso de construcción.",
    examples: {
      javascript: "class Builder { reset() {} buildStepA() {} buildStepB() {} getResult() {} } class ConcreteBuilder extends Builder { buildStepA() { this.product.addPart('A'); } }",
      php: "interface Builder { public function reset(); public function buildStepA(); public function getResult(); } class ConcreteBuilder implements Builder { public function buildStepA() { $this->product->addPart('A'); } }"
    },
    relatedPatterns: ["abstract-factory", "composite"]
  },
  {
    id: 4,
    name: "Prototype",
    slug: "prototype",
    description: "Permite copiar objetos existentes sin que el código dependa de sus clases.",
    category: "creational",
    difficulty: 2,
    icon: "copy",
    color: "from-teal-500 to-teal-600",
    tags: ["cloning", "copy", "prototype"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Prototype permite copiar objetos existentes sin hacer que el código dependa de sus clases.",
    examples: {
      javascript: "class Prototype { clone() { return Object.create(this); } } class ConcretePrototype extends Prototype { constructor(value) { super(); this.value = value; } }",
      php: "interface Prototype { public function clone(); } class ConcretePrototype implements Prototype { public function clone() { return clone $this; } }"
    },
    relatedPatterns: ["abstract-factory", "memento"]
  },
  {
    id: 5,
    name: "Singleton",
    slug: "singleton",
    description: "Asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a ella.",
    category: "creational",
    difficulty: 1,
    icon: "crown",
    color: "from-purple-500 to-purple-600",
    tags: ["instance", "global", "access"],
    architectures: ["hexagonal", "ddd"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Singleton garantiza que una clase tenga solo una instancia y proporciona acceso global a ella.",
    examples: {
      javascript: "class Singleton { static instance = null; static getInstance() { if (!this.instance) this.instance = new Singleton(); return this.instance; } }",
      php: "class Singleton { private static $instance = null; public static function getInstance() { if (self::$instance === null) self::$instance = new self(); return self::$instance; } }"
    },
    relatedPatterns: ["factory-method", "abstract-factory"]
  },
  
  // STRUCTURAL PATTERNS
  {
    id: 6,
    name: "Adapter",
    slug: "adapter",
    description: "Permite la colaboración entre objetos de interfaces incompatibles.",
    category: "structural",
    difficulty: 1,
    icon: "plug",
    color: "from-orange-500 to-orange-600",
    tags: ["interface", "compatibility", "wrapper"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Adapter permite que interfaces incompatibles trabajen juntas mediante un objeto intermediario.",
    examples: {
      javascript: "class Adapter { constructor(adaptee) { this.adaptee = adaptee; } request() { return this.adaptee.specificRequest(); } }",
      php: "class Adapter implements Target { private $adaptee; public function __construct($adaptee) { $this->adaptee = $adaptee; } public function request() { return $this->adaptee->specificRequest(); } }"
    },
    relatedPatterns: ["facade", "decorator"]
  },
  {
    id: 7,
    name: "Bridge",
    slug: "bridge",
    description: "Permite dividir una clase grande, o un grupo de clases estrechamente relacionadas, en dos jerarquías separadas que pueden desarrollarse independientemente.",
    category: "structural",
    difficulty: 3,
    icon: "project-diagram",
    color: "from-red-500 to-red-600",
    tags: ["abstraction", "implementation", "hierarchy"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Bridge separa una abstracción de su implementación para que ambas puedan variar independientemente.",
    examples: {
      javascript: "class Abstraction { constructor(implementation) { this.implementation = implementation; } operation() { return this.implementation.operationImpl(); } }",
      php: "class Abstraction { protected $implementation; public function __construct($implementation) { $this->implementation = $implementation; } public function operation() { return $this->implementation->operationImpl(); } }"
    },
    relatedPatterns: ["adapter", "state"]
  },
  {
    id: 8,
    name: "Composite",
    slug: "composite",
    description: "Permite componer objetos en estructuras de árbol y trabajar con esas estructuras como si fueran objetos individuales.",
    category: "structural",
    difficulty: 2,
    icon: "sitemap",
    color: "from-pink-500 to-pink-600",
    tags: ["tree", "structure", "composite"],
    architectures: ["ddd"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Composite permite componer objetos en estructuras de árbol para representar jerarquías parte-todo.",
    examples: {
      javascript: "class Component { operation() {} } class Composite extends Component { constructor() { super(); this.children = []; } operation() { this.children.forEach(child => child.operation()); } }",
      php: "abstract class Component { abstract public function operation(); } class Composite extends Component { private $children = []; public function operation() { foreach ($this->children as $child) { $child->operation(); } } }"
    },
    relatedPatterns: ["decorator", "visitor"]
  },
  {
    id: 9,
    name: "Decorator",
    slug: "decorator",
    description: "Permite añadir funcionalidades a objetos colocando estos objetos dentro de objetos encapsuladores especiales que contienen estas funcionalidades.",
    category: "structural",
    difficulty: 2,
    icon: "paint-brush",
    color: "from-yellow-500 to-yellow-600",
    tags: ["enhancement", "wrapper", "behavior"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Decorator permite añadir nuevas funcionalidades a objetos colocándolos dentro de objetos envolventes especiales.",
    examples: {
      javascript: "class Decorator { constructor(component) { this.component = component; } operation() { return this.component.operation(); } } class ConcreteDecorator extends Decorator { operation() { return 'Decorated(' + super.operation() + ')'; } }",
      php: "class Decorator { protected $component; public function __construct($component) { $this->component = $component; } public function operation() { return $this->component->operation(); } }"
    },
    relatedPatterns: ["adapter", "composite"]
  },
  {
    id: 10,
    name: "Facade",
    slug: "facade",
    description: "Proporciona una interfaz simplificada a una biblioteca, un framework o cualquier otro grupo complejo de clases.",
    category: "structural",
    difficulty: 1,
    icon: "window-restore",
    color: "from-cyan-500 to-cyan-600",
    tags: ["simplification", "interface", "subsystem"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Facade proporciona una interfaz simplificada a un subsistema complejo.",
    examples: {
      javascript: "class Facade { constructor() { this.subsystem1 = new Subsystem1(); this.subsystem2 = new Subsystem2(); } operation() { return this.subsystem1.operation1() + this.subsystem2.operation2(); } }",
      php: "class Facade { private $subsystem1; private $subsystem2; public function __construct() { $this->subsystem1 = new Subsystem1(); $this->subsystem2 = new Subsystem2(); } public function operation() { return $this->subsystem1->operation1() . $this->subsystem2->operation2(); } }"
    },
    relatedPatterns: ["adapter", "mediator"]
  },
  {
    id: 11,
    name: "Flyweight",
    slug: "flyweight",
    description: "Permite mantener más objetos dentro de la cantidad disponible de RAM compartiendo de manera eficiente las partes comunes del estado entre varios objetos.",
    category: "structural",
    difficulty: 3,
    icon: "feather-alt",
    color: "from-gray-500 to-gray-600",
    tags: ["memory", "sharing", "efficiency"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3"],
    content: "El patrón Flyweight permite ahorrar memoria compartiendo eficientemente grandes cantidades de objetos similares.",
    examples: {
      javascript: "class Flyweight { constructor(sharedState) { this.sharedState = sharedState; } operation(context) { console.log('Shared:', this.sharedState, 'Context:', context); } }",
      php: "class Flyweight { private $sharedState; public function __construct($sharedState) { $this->sharedState = $sharedState; } public function operation($context) { echo 'Shared: ' . $this->sharedState . ' Context: ' . $context; } }"
    },
    relatedPatterns: ["factory-method", "singleton"]
  },
  {
    id: 12,
    name: "Proxy",
    slug: "proxy",
    description: "Permite proporcionar un sustituto o marcador de posición para otro objeto. Un proxy controla el acceso al objeto original.",
    category: "structural",
    difficulty: 2,
    icon: "shield-alt",
    color: "from-slate-500 to-slate-600",
    tags: ["placeholder", "access", "control"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Proxy proporciona un sustituto o marcador de posición para otro objeto para controlar el acceso a él.",
    examples: {
      javascript: "class Proxy { constructor(realSubject) { this.realSubject = realSubject; } request() { if (this.checkAccess()) { return this.realSubject.request(); } return null; } }",
      php: "class Proxy { private $realSubject; public function __construct($realSubject) { $this->realSubject = $realSubject; } public function request() { if ($this->checkAccess()) { return $this->realSubject->request(); } return null; } }"
    },
    relatedPatterns: ["adapter", "decorator"]
  },
  
  // BEHAVIORAL PATTERNS
  {
    id: 13,
    name: "Chain of Responsibility",
    slug: "chain-of-responsibility",
    description: "Permite pasar solicitudes a lo largo de una cadena de manejadores. Al recibir una solicitud, cada manejador decide si la procesa o si la pasa al siguiente manejador.",
    category: "behavioral",
    difficulty: 2,
    icon: "link",
    color: "from-emerald-500 to-emerald-600",
    tags: ["chain", "handlers", "request"],
    architectures: ["hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Chain of Responsibility permite pasar solicitudes a lo largo de una cadena de manejadores potenciales.",
    examples: {
      javascript: "class Handler { setNext(handler) { this.nextHandler = handler; return handler; } handle(request) { if (this.nextHandler) { return this.nextHandler.handle(request); } return null; } }",
      php: "abstract class Handler { private $nextHandler; public function setNext($handler) { $this->nextHandler = $handler; return $handler; } public function handle($request) { if ($this->nextHandler) { return $this->nextHandler->handle($request); } return null; } }"
    },
    relatedPatterns: ["composite", "command"]
  },
  {
    id: 14,
    name: "Command",
    slug: "command",
    description: "Convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud.",
    category: "behavioral",
    difficulty: 2,
    icon: "terminal",
    color: "from-blue-500 to-blue-700",
    tags: ["encapsulation", "request", "queue"],
    architectures: ["cqrs", "event-driven"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Command encapsula una petición como un objeto, permitiendo parametrizar y hacer cola de operaciones.",
    examples: {
      javascript: "class Command { execute() { throw new Error('Must implement'); } } class ConcreteCommand extends Command { constructor(receiver) { super(); this.receiver = receiver; } execute() { this.receiver.action(); } }",
      php: "interface Command { public function execute(); } class ConcreteCommand implements Command { private $receiver; public function __construct($receiver) { $this->receiver = $receiver; } public function execute() { $this->receiver->action(); } }"
    },
    relatedPatterns: ["observer", "memento"]
  },
  {
    id: 15,
    name: "Iterator",
    slug: "iterator",
    description: "Permite recorrer elementos de una colección sin exponer su representación subyacente (lista, pila, árbol, etc.).",
    category: "behavioral",
    difficulty: 2,
    icon: "redo",
    color: "from-violet-500 to-violet-600",
    tags: ["traversal", "collection", "iteration"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Iterator proporciona una forma de acceder secuencialmente a los elementos de una colección.",
    examples: {
      javascript: "class Iterator { constructor(collection) { this.collection = collection; this.index = 0; } next() { return this.collection[this.index++]; } hasNext() { return this.index < this.collection.length; } }",
      php: "class Iterator implements IteratorInterface { private $collection; private $index = 0; public function __construct($collection) { $this->collection = $collection; } public function next() { return $this->collection[$this->index++]; } }"
    },
    relatedPatterns: ["composite", "factory-method"]
  },
  {
    id: 16,
    name: "Mediator",
    slug: "mediator",
    description: "Permite reducir las dependencias caóticas entre objetos. El patrón restringe las comunicaciones directas entre los objetos, forzándolos a colaborar únicamente a través de un objeto mediador.",
    category: "behavioral",
    difficulty: 2,
    icon: "comments",
    color: "from-rose-500 to-rose-600",
    tags: ["communication", "decoupling", "mediator"],
    architectures: ["event-driven"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Mediator define cómo un conjunto de objetos interactúan entre sí mediante un objeto mediador.",
    examples: {
      javascript: "class Mediator { notify(sender, event) { if (event === 'A') { this.componentB.doC(); } } } class Component { constructor(mediator) { this.mediator = mediator; } }",
      php: "interface Mediator { public function notify($sender, $event); } class ConcreteMediator implements Mediator { public function notify($sender, $event) { if ($event === 'A') { $this->componentB->doC(); } } }"
    },
    relatedPatterns: ["facade", "observer"]
  },
  {
    id: 17,
    name: "Memento",
    slug: "memento",
    description: "Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación.",
    category: "behavioral",
    difficulty: 3,
    icon: "save",
    color: "from-amber-500 to-amber-600",
    tags: ["state", "undo", "snapshot"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Memento permite capturar y externalizar el estado interno de un objeto sin violar su encapsulación.",
    examples: {
      javascript: "class Memento { constructor(state) { this.state = state; } getState() { return this.state; } } class Originator { setState(state) { this.state = state; } createMemento() { return new Memento(this.state); } }",
      php: "class Memento { private $state; public function __construct($state) { $this->state = $state; } public function getState() { return $this->state; } }"
    },
    relatedPatterns: ["command", "iterator"]
  },
  {
    id: 18,
    name: "Observer",
    slug: "observer",
    description: "Define un mecanismo de suscripción para notificar a varios objetos sobre cualquier evento que le suceda al objeto que están observando.",
    category: "behavioral",
    difficulty: 2,
    icon: "eye",
    color: "from-lime-500 to-lime-600",
    tags: ["notification", "dependency", "events"],
    architectures: ["event-driven"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Observer define una dependencia de uno a muchos entre objetos para notificar cambios automáticamente.",
    examples: {
      javascript: "class Subject { constructor() { this.observers = []; } attach(observer) { this.observers.push(observer); } notify(data) { this.observers.forEach(observer => observer.update(data)); } }",
      php: "class Subject { private $observers = []; public function attach($observer) { $this->observers[] = $observer; } public function notify($data) { foreach ($this->observers as $observer) { $observer->update($data); } } }"
    },
    relatedPatterns: ["mediator", "command"]
  },
  {
    id: 19,
    name: "State",
    slug: "state",
    description: "Permite a un objeto alterar su comportamiento cuando su estado interno cambia. Parece como si el objeto cambiara su clase.",
    category: "behavioral",
    difficulty: 2,
    icon: "exchange-alt",
    color: "from-sky-500 to-sky-600",
    tags: ["state", "behavior", "context"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón State permite a un objeto alterar su comportamiento cuando su estado interno cambia.",
    examples: {
      javascript: "class State { handle(context) {} } class ConcreteState extends State { handle(context) { context.setState(new AnotherState()); } } class Context { setState(state) { this.state = state; } }",
      php: "interface State { public function handle($context); } class ConcreteState implements State { public function handle($context) { $context->setState(new AnotherState()); } }"
    },
    relatedPatterns: ["strategy", "bridge"]
  },
  {
    id: 20,
    name: "Strategy",
    slug: "strategy",
    description: "Define una familia de algoritmos, los coloca en clases separadas y hace sus objetos intercambiables.",
    category: "behavioral",
    difficulty: 1,
    icon: "chess",
    color: "from-indigo-500 to-indigo-700",
    tags: ["algorithm", "family", "interchangeable"],
    architectures: ["ddd"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Strategy define una familia de algoritmos, los encapsula y los hace intercambiables.",
    examples: {
      javascript: "class Strategy { execute() { throw new Error('Must implement'); } } class ConcreteStrategy extends Strategy { execute() { console.log('Executing strategy A'); } }",
      php: "interface Strategy { public function execute(); } class ConcreteStrategy implements Strategy { public function execute() { echo 'Executing strategy A'; } }"
    },
    relatedPatterns: ["state", "template-method"]
  },
  {
    id: 21,
    name: "Template Method",
    slug: "template-method",
    description: "Define el esqueleto de un algoritmo en la superclase pero permite que las subclases sobrescriban pasos del algoritmo sin cambiar su estructura.",
    category: "behavioral",
    difficulty: 2,
    icon: "file-alt",
    color: "from-teal-500 to-teal-700",
    tags: ["template", "algorithm", "skeleton"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Template Method define el esqueleto de un algoritmo en una clase base.",
    examples: {
      javascript: "class AbstractClass { templateMethod() { this.step1(); this.step2(); this.step3(); } step1() {} step2() {} step3() {} } class ConcreteClass extends AbstractClass { step2() { console.log('ConcreteClass step2'); } }",
      php: "abstract class AbstractClass { public function templateMethod() { $this->step1(); $this->step2(); $this->step3(); } abstract protected function step2(); }"
    },
    relatedPatterns: ["factory-method", "strategy"]
  },
  {
    id: 22,
    name: "Visitor",
    slug: "visitor",
    description: "Permite separar algoritmos de los objetos sobre los que operan.",
    category: "behavioral",
    difficulty: 3,
    icon: "user-friends",
    color: "from-orange-500 to-orange-700",
    tags: ["operations", "separation", "double-dispatch"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Visitor permite definir nuevas operaciones sin cambiar las clases de los elementos sobre los que opera.",
    examples: {
      javascript: "class Visitor { visitConcreteElementA(element) {} visitConcreteElementB(element) {} } class Element { accept(visitor) {} } class ConcreteElement extends Element { accept(visitor) { visitor.visitConcreteElementA(this); } }",
      php: "interface Visitor { public function visitConcreteElementA($element); } interface Element { public function accept($visitor); } class ConcreteElement implements Element { public function accept($visitor) { $visitor->visitConcreteElementA($this); } }"
    },
    relatedPatterns: ["composite", "interpreter"]
  },
  
  // ARCHITECTURAL PATTERNS
  {
    id: 23,
    name: "Model-View-Controller (MVC)",
    slug: "mvc",
    description: "Separa la aplicación en tres componentes principales: Model (datos), View (interfaz de usuario) y Controller (lógica de control).",
    category: "architectural",
    difficulty: 2,
    icon: "layer-group",
    color: "from-blue-600 to-blue-800",
    tags: ["separation", "concerns", "ui"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón MVC separa la aplicación en tres componentes interconectados: Modelo, Vista y Controlador.",
    examples: {
      javascript: "class Model { getData() { return this.data; } } class View { render(data) { console.log('Rendering:', data); } } class Controller { constructor(model, view) { this.model = model; this.view = view; } updateView() { this.view.render(this.model.getData()); } }",
      php: "class Model { public function getData() { return $this->data; } } class View { public function render($data) { echo 'Rendering: ' . $data; } } class Controller { public function updateView() { $this->view->render($this->model->getData()); } }"
    },
    relatedPatterns: ["mvp", "mvvm"]
  },
  {
    id: 24,
    name: "Model-View-ViewModel (MVVM)",
    slug: "mvvm",
    description: "Una variación del patrón MVC que facilita la separación del desarrollo de la interfaz gráfica de usuario del desarrollo de la lógica de negocio.",
    category: "architectural",
    difficulty: 2,
    icon: "tv",
    color: "from-purple-600 to-purple-800",
    tags: ["binding", "data", "ui"],
    architectures: [],
    languages: ["javascript"],
    frameworks: ["vue3"],
    content: "El patrón MVVM facilita la separación entre la lógica de negocio y la interfaz de usuario mediante data binding.",
    examples: {
      javascript: "class ViewModel { constructor(model) { this.model = model; this.bindProperties(); } bindProperties() { Object.defineProperty(this, 'data', { get: () => this.model.getData(), set: (value) => this.model.setData(value) }); } }",
      php: "// MVVM es más común en frameworks de frontend con data binding"
    },
    relatedPatterns: ["mvc", "observer"]
  },
  {
    id: 25,
    name: "Repository",
    slug: "repository",
    description: "Encapsula la lógica necesaria para acceder a fuentes de datos. Centraliza funcionalidades de acceso a datos común, proporcionando un mejor mantenimiento y desacoplando la infraestructura.",
    category: "architectural",
    difficulty: 2,
    icon: "database",
    color: "from-green-600 to-green-800",
    tags: ["data", "access", "abstraction"],
    architectures: ["hexagonal", "ddd"],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Repository encapsula la lógica para acceder a datos, proporcionando una interfaz más orientada a objetos.",
    examples: {
      javascript: "class Repository { async findById(id) { return await this.dataSource.findById(id); } async save(entity) { return await this.dataSource.save(entity); } async findAll() { return await this.dataSource.findAll(); } }",
      php: "interface Repository { public function findById($id); public function save($entity); public function findAll(); } class UserRepository implements Repository { public function findById($id) { return $this->db->find($id); } }"
    },
    relatedPatterns: ["unit-of-work", "specification"]
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
  },
  {
    id: 5,
    name: "Layered",
    slug: "layered",
    description: "Organiza el sistema en capas horizontales con responsabilidades específicas.",
    icon: "layer-group",
    color: "from-gray-500 to-slate-600",
    patternCount: 10
  }
];