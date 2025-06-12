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
    content: "El patrón Factory Method es una solución elegante cuando necesitas crear objetos pero no sabes exactamente qué tipo hasta el momento de la ejecución.\n\nImagínate que estás construyendo una aplicación de logística que maneja diferentes tipos de transporte (camiones, barcos, aviones). En lugar de decidir directamente qué tipo crear, defines un 'método fábrica' que se encarga de la creación.\n\n**¿Cuándo usarlo?**\n• Cuando no sabes de antemano qué tipos exactos de objetos necesitarás\n• Cuando quieres que los usuarios de tu biblioteca puedan extender sus componentes internos\n• Cuando quieres reutilizar objetos existentes en lugar de reconstruirlos\n\n**Ventajas:**\n• Evita el acoplamiento fuerte entre el creador y los productos concretos\n• Principio de responsabilidad única: mueves la creación de productos a un lugar específico\n• Principio abierto/cerrado: puedes introducir nuevos tipos sin romper el código existente\n\n**Desventajas:**\n• El código puede volverse más complicado al introducir muchas subclases nuevas",
    examples: {
      javascript: `// Interfaz común para todos los productos
class Transport {
  deliver() {
    throw new Error('Must implement deliver method');
  }
}

// Productos concretos
class Truck extends Transport {
  deliver() {
    return 'Entrega por tierra en cajas';
  }
}

class Ship extends Transport {
  deliver() {
    return 'Entrega por mar en contenedores';
  }
}

// Creador base con el Factory Method
class Logistics {
  // Este es el Factory Method que las subclases deben implementar
  createTransport() {
    throw new Error('Must implement createTransport method');
  }
  
  // Lógica de negocio que usa el Factory Method
  planDelivery() {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

// Creadores concretos
class RoadLogistics extends Logistics {
  createTransport() {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport() {
    return new Ship();
  }
}

// Uso del patrón
const roadLogistics = new RoadLogistics();
console.log(roadLogistics.planDelivery()); // "Entrega por tierra en cajas"

const seaLogistics = new SeaLogistics();
console.log(seaLogistics.planDelivery()); // "Entrega por mar en contenedores"`,
      php: `<?php
// Interfaz común para todos los productos
interface Transport {
    public function deliver(): string;
}

// Productos concretos
class Truck implements Transport {
    public function deliver(): string {
        return 'Entrega por tierra en cajas';
    }
}

class Ship implements Transport {
    public function deliver(): string {
        return 'Entrega por mar en contenedores';
    }
}

// Creador base con el Factory Method
abstract class Logistics {
    // Este es el Factory Method que las subclases deben implementar
    abstract public function createTransport(): Transport;
    
    // Lógica de negocio que usa el Factory Method
    public function planDelivery(): string {
        $transport = $this->createTransport();
        return $transport->deliver();
    }
}

// Creadores concretos
class RoadLogistics extends Logistics {
    public function createTransport(): Transport {
        return new Truck();
    }
}

class SeaLogistics extends Logistics {
    public function createTransport(): Transport {
        return new Ship();
    }
}

// Uso del patrón
$roadLogistics = new RoadLogistics();
echo $roadLogistics->planDelivery(); // "Entrega por tierra en cajas"

$seaLogistics = new SeaLogistics();
echo $seaLogistics->planDelivery(); // "Entrega por mar en contenedores"
?>`
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
    content: "El patrón Singleton es uno de los más simples pero controvertidos. Su objetivo es garantizar que una clase tenga exactamente una instancia durante toda la ejecución del programa.\n\nPiensa en el Singleton como el 'CEO de una empresa': solo puede haber uno al mando. Casos típicos incluyen configuraciones de aplicación, conexiones a base de datos, o loggers.\n\n**¿Cuándo usarlo?**\n• Cuando necesitas exactamente una instancia de una clase (como configuración global)\n• Cuando quieres un punto de acceso global a esa instancia\n• Cuando la instancia debe ser accesible desde cualquier parte del código\n\n**Ventajas:**\n• Garantiza una sola instancia\n• Acceso global controlado\n• Inicialización perezosa (lazy initialization)\n• Ahorra memoria al reutilizar la misma instancia\n\n**Desventajas:**\n• Viola el principio de responsabilidad única\n• Dificulta las pruebas unitarias\n• Puede crear dependencias ocultas\n• Problemático en aplicaciones multihilo\n\n**⚠️ Advertencia:** Muchos consideran el Singleton un antipatrón. Úsalo con precaución y considera alternativas como inyección de dependencias.",
    examples: {
      javascript: `// Implementación básica del Singleton
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      throw new Error('Solo puede existir una instancia de DatabaseConnection');
    }
    
    // Simular configuración de conexión
    this.host = 'localhost';
    this.port = 5432;
    this.connected = false;
    
    DatabaseConnection.instance = this;
  }
  
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  connect() {
    if (!this.connected) {
      console.log(\`Conectando a \${this.host}:\${this.port}\`);
      this.connected = true;
    }
    return this;
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('Debes conectarte primero');
    }
    console.log(\`Ejecutando: \${sql}\`);
    return { results: [] };
  }
}

// Uso del Singleton
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true - Es la misma instancia

db1.connect().query('SELECT * FROM users');
db2.query('SELECT * FROM products'); // Usa la misma conexión

// Versión más moderna con módulos ES6
class ConfigManager {
  constructor() {
    this.settings = {
      apiUrl: 'https://api.ejemplo.com',
      timeout: 5000,
      retries: 3
    };
  }
  
  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  getSetting(key) {
    return this.settings[key];
  }
  
  setSetting(key, value) {
    this.settings[key] = value;
  }
}

// Exportar la instancia directamente (patrón de módulo)
export const config = ConfigManager.getInstance();`,
      php: `<?php
// Implementación clásica del Singleton
class DatabaseConnection {
    private static $instance = null;
    private $host;
    private $port;
    private $connected;
    
    // Constructor privado para prevenir instanciación directa
    private function __construct() {
        $this->host = 'localhost';
        $this->port = 5432;
        $this->connected = false;
    }
    
    // Prevenir clonación
    private function __clone() {}
    
    // Prevenir deserialización
    public function __wakeup() {
        throw new Exception("No se puede deserializar un Singleton");
    }
    
    public static function getInstance(): DatabaseConnection {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function connect(): self {
        if (!$this->connected) {
            echo "Conectando a {$this->host}:{$this->port}\\n";
            $this->connected = true;
        }
        return $this;
    }
    
    public function query(string $sql): array {
        if (!$this->connected) {
            throw new Exception('Debes conectarte primero');
        }
        echo "Ejecutando: {$sql}\\n";
        return ['results' => []];
    }
}

// Uso del Singleton
$db1 = DatabaseConnection::getInstance();
$db2 = DatabaseConnection::getInstance();

var_dump($db1 === $db2); // bool(true) - Es la misma instancia

$db1->connect()->query('SELECT * FROM users');
$db2->query('SELECT * FROM products'); // Usa la misma conexión

// Implementación thread-safe (más avanzada)
class ThreadSafeSingleton {
    private static $instance = null;
    private static $lock = false;
    
    private function __construct() {
        // Inicialización costosa aquí
    }
    
    public static function getInstance(): self {
        if (self::$instance === null) {
            if (self::$lock) {
                // Esperar si otro hilo está creando la instancia
                while (self::$lock) {
                    usleep(1000); // Esperar 1ms
                }
                return self::$instance;
            }
            
            self::$lock = true;
            if (self::$instance === null) {
                self::$instance = new self();
            }
            self::$lock = false;
        }
        
        return self::$instance;
    }
    
    private function __clone() {}
    public function __wakeup() {
        throw new Exception("No se puede deserializar un Singleton");
    }
}
?>`
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
    content: "El patrón Observer es como un sistema de suscripciones a un periódico. Los lectores (observadores) se suscriben al periódico (sujeto), y cuando sale una nueva edición, todos los suscriptores reciben automáticamente una copia.\n\nEste patrón es fundamental en programación porque resuelve el problema de mantener sincronizados múltiples objetos cuando uno de ellos cambia.\n\n**¿Cuándo usarlo?**\n• Cuando cambios en un objeto requieren cambiar otros objetos\n• Cuando no sabes de antemano cuántos objetos necesitan ser notificados\n• Cuando quieres que el acoplamiento entre objetos sea mínimo\n• En interfaces de usuario (el modelo notifica a las vistas)\n\n**Ventajas:**\n• Principio abierto/cerrado: puedes agregar nuevos observadores sin modificar el sujeto\n• Puedes establecer relaciones entre objetos en tiempo de ejecución\n• Bajo acoplamiento entre el sujeto y los observadores\n\n**Desventajas:**\n• Los observadores son notificados en orden aleatorio\n• Si no se manejan bien, pueden crear ciclos de dependencias\n• Dificultad para debuggear el flujo de notificaciones",
    examples: {
      javascript: `// Interfaz para observadores
class Observer {
  update(data) {
    throw new Error('Método update debe ser implementado');
  }
}

// Sujeto que será observado
class Newsletter {
  constructor() {
    this.observers = [];
    this.articles = [];
  }
  
  // Suscribir un observador
  subscribe(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      console.log('Nuevo suscriptor agregado');
    }
  }
  
  // Desuscribir un observador
  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log('Suscriptor removido');
    }
  }
  
  // Notificar a todos los observadores
  notify(article) {
    console.log('Notificando a todos los suscriptores...');
    this.observers.forEach(observer => {
      observer.update(article);
    });
  }
  
  // Agregar nuevo artículo y notificar
  addArticle(title, content) {
    const article = { title, content, date: new Date() };
    this.articles.push(article);
    this.notify(article);
  }
}

// Observadores concretos
class EmailSubscriber extends Observer {
  constructor(email) {
    super();
    this.email = email;
  }
  
  update(article) {
    console.log(\`📧 Email enviado a \${this.email}:\`);
    console.log(\`   Nuevo artículo: "\${article.title}"\`);
  }
}

class SMSSubscriber extends Observer {
  constructor(phone) {
    super();
    this.phone = phone;
  }
  
  update(article) {
    console.log(\`📱 SMS enviado a \${this.phone}:\`);
    console.log(\`   Nuevo artículo disponible: "\${article.title}"\`);
  }
}

class WebNotificationSubscriber extends Observer {
  update(article) {
    console.log(\`🔔 Notificación web:\`);
    console.log(\`   \${article.title} - \${article.content.substring(0, 50)}...\`);
  }
}

// Uso del patrón
const newsletter = new Newsletter();

// Crear suscriptores
const emailUser = new EmailSubscriber('juan@email.com');
const smsUser = new SMSSubscriber('+34 123 456 789');
const webUser = new WebNotificationSubscriber();

// Suscribir observadores
newsletter.subscribe(emailUser);
newsletter.subscribe(smsUser);
newsletter.subscribe(webUser);

// Publicar nuevo artículo - todos los suscriptores serán notificados
newsletter.addArticle(
  'Nuevas funciones en JavaScript 2024',
  'Descubre las últimas características que han llegado a JavaScript...'
);

// Un usuario se desuscribe
newsletter.unsubscribe(smsUser);

// Publicar otro artículo - solo email y web recibirán notificación
newsletter.addArticle(
  'Patrones de diseño explicados',
  'Una guía completa sobre los patrones de diseño más importantes...'
);`,
      php: `<?php
// Interfaz para observadores
interface Observer {
    public function update($data): void;
}

// Sujeto observable
class Newsletter {
    private $observers = [];
    private $articles = [];
    
    public function subscribe(Observer $observer): void {
        if (!in_array($observer, $this->observers, true)) {
            $this->observers[] = $observer;
            echo "Nuevo suscriptor agregado\\n";
        }
    }
    
    public function unsubscribe(Observer $observer): void {
        $key = array_search($observer, $this->observers, true);
        if ($key !== false) {
            unset($this->observers[$key]);
            echo "Suscriptor removido\\n";
        }
    }
    
    public function notify(array $article): void {
        echo "Notificando a todos los suscriptores...\\n";
        foreach ($this->observers as $observer) {
            $observer->update($article);
        }
    }
    
    public function addArticle(string $title, string $content): void {
        $article = [
            'title' => $title,
            'content' => $content,
            'date' => new DateTime()
        ];
        
        $this->articles[] = $article;
        $this->notify($article);
    }
    
    public function getArticles(): array {
        return $this->articles;
    }
}

// Observadores concretos
class EmailSubscriber implements Observer {
    private $email;
    
    public function __construct(string $email) {
        $this->email = $email;
    }
    
    public function update($article): void {
        echo "📧 Email enviado a {$this->email}:\\n";
        echo "   Nuevo artículo: \\"{$article['title']}\\"\\n";
    }
}

class SMSSubscriber implements Observer {
    private $phone;
    
    public function __construct(string $phone) {
        $this->phone = $phone;
    }
    
    public function update($article): void {
        echo "📱 SMS enviado a {$this->phone}:\\n";
        echo "   Nuevo artículo disponible: \\"{$article['title']}\\"\\n";
    }
}

class WebNotificationSubscriber implements Observer {
    public function update($article): void {
        $preview = substr($article['content'], 0, 50) . '...';
        echo "🔔 Notificación web:\\n";
        echo "   {$article['title']} - {$preview}\\n";
    }
}

// Uso del patrón
$newsletter = new Newsletter();

// Crear suscriptores
$emailUser = new EmailSubscriber('juan@email.com');
$smsUser = new SMSSubscriber('+34 123 456 789');
$webUser = new WebNotificationSubscriber();

// Suscribir observadores
$newsletter->subscribe($emailUser);
$newsletter->subscribe($smsUser);
$newsletter->subscribe($webUser);

// Publicar nuevo artículo
$newsletter->addArticle(
    'Nuevas funciones en PHP 8.3',
    'Descubre las últimas características que han llegado a PHP...'
);

// Un usuario se desuscribe
$newsletter->unsubscribe($smsUser);

// Publicar otro artículo
$newsletter->addArticle(
    'Patrones de diseño en PHP',
    'Una guía completa sobre los patrones de diseño más importantes...'
);
?>`
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
    content: "El patrón Strategy es como tener diferentes rutas para llegar al mismo destino. Imagina una aplicación de navegación: puedes elegir la ruta más rápida, la más corta, o la que evita peajes. Cada ruta es una 'estrategia' diferente para resolver el mismo problema.\n\nEste patrón es perfecto cuando tienes múltiples formas de hacer la misma tarea y quieres poder cambiar entre ellas fácilmente.\n\n**¿Cuándo usarlo?**\n• Cuando tienes múltiples formas de realizar una tarea\n• Cuando quieres cambiar algoritmos en tiempo de ejecución\n• Cuando quieres evitar condicionales complejas (if/else o switch)\n• Cuando diferentes clientes necesitan diferentes variantes de un algoritmo\n\n**Ventajas:**\n• Puedes intercambiar algoritmos en tiempo de ejecución\n• Puedes aislar los detalles de implementación de un algoritmo\n• Puedes introducir nuevas estrategias sin cambiar el contexto\n• Principio abierto/cerrado: abierto para extensión, cerrado para modificación\n\n**Desventajas:**\n• Los clientes deben conocer las diferencias entre estrategias\n• Muchas estrategias modernas pueden ser reemplazadas por funciones lambda\n• Incrementa el número de objetos en la aplicación",
    examples: {
      javascript: `// Interfaz común para todas las estrategias
class PaymentStrategy {
  pay(amount) {
    throw new Error('Método pay debe ser implementado');
  }
}

// Estrategias concretas
class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, expiryDate, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
  }
  
  pay(amount) {
    console.log(\`Procesando pago de $\${amount} con tarjeta de crédito\`);
    console.log(\`Tarjeta: ****-****-****-\${this.cardNumber.slice(-4)}\`);
    
    // Simular validación y procesamiento
    if (this.validateCard()) {
      console.log('✅ Pago con tarjeta de crédito exitoso');
      return { success: true, transactionId: 'CC' + Date.now() };
    }
    
    return { success: false, error: 'Tarjeta inválida' };
  }
  
  validateCard() {
    return this.cardNumber.length === 16 && this.cvv.length === 3;
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  pay(amount) {
    console.log(\`Procesando pago de $\${amount} con PayPal\`);
    console.log(\`Email: \${this.email}\`);
    
    if (this.authenticate()) {
      console.log('✅ Pago con PayPal exitoso');
      return { success: true, transactionId: 'PP' + Date.now() };
    }
    
    return { success: false, error: 'Credenciales de PayPal inválidas' };
  }
  
  authenticate() {
    return this.email.includes('@') && this.password.length > 6;
  }
}

class CryptoPayment extends PaymentStrategy {
  constructor(walletAddress, privateKey) {
    super();
    this.walletAddress = walletAddress;
    this.privateKey = privateKey;
  }
  
  pay(amount) {
    console.log(\`Procesando pago de $\${amount} con criptomoneda\`);
    console.log(\`Wallet: \${this.walletAddress.slice(0, 6)}...\${this.walletAddress.slice(-4)}\`);
    
    if (this.validateWallet()) {
      console.log('✅ Pago con criptomoneda exitoso');
      return { success: true, transactionId: 'CRYPTO' + Date.now() };
    }
    
    return { success: false, error: 'Wallet inválida' };
  }
  
  validateWallet() {
    return this.walletAddress.length === 42 && this.walletAddress.startsWith('0x');
  }
}

// Contexto que usa las estrategias
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(name, price) {
    this.items.push({ name, price });
    console.log(\`Agregado: \${name} - $\${price}\`);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
    console.log('Método de pago configurado');
  }
  
  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  
  checkout() {
    if (!this.paymentStrategy) {
      throw new Error('Debe seleccionar un método de pago');
    }
    
    const total = this.getTotal();
    console.log(\`\\n--- Checkout ---\`);
    console.log(\`Total a pagar: $\${total}\`);
    
    return this.paymentStrategy.pay(total);
  }
}

// Uso del patrón Strategy
const cart = new ShoppingCart();

// Agregar productos
cart.addItem('Laptop', 1200);
cart.addItem('Mouse', 25);
cart.addItem('Teclado', 75);

// Estrategia 1: Pago con tarjeta de crédito
console.log('\\n=== Pago con Tarjeta ===');
cart.setPaymentStrategy(
  new CreditCardPayment('1234567890123456', '12/25', '123')
);
let result = cart.checkout();
console.log('Resultado:', result);

// Estrategia 2: Pago con PayPal
console.log('\\n=== Pago con PayPal ===');
cart.setPaymentStrategy(
  new PayPalPayment('usuario@email.com', 'password123')
);
result = cart.checkout();
console.log('Resultado:', result);

// Estrategia 3: Pago con criptomoneda
console.log('\\n=== Pago con Crypto ===');
cart.setPaymentStrategy(
  new CryptoPayment('0x742d35Cc6634C0532925a3b8D45d2C5c5C8fC542', 'private_key')
);
result = cart.checkout();
console.log('Resultado:', result);`,
      php: `<?php
// Interfaz para todas las estrategias
interface PaymentStrategy {
    public function pay(float $amount): array;
}

// Estrategias concretas
class CreditCardPayment implements PaymentStrategy {
    private $cardNumber;
    private $expiryDate;
    private $cvv;
    
    public function __construct(string $cardNumber, string $expiryDate, string $cvv) {
        $this->cardNumber = $cardNumber;
        $this->expiryDate = $expiryDate;
        $this->cvv = $cvv;
    }
    
    public function pay(float $amount): array {
        echo "Procesando pago de $$amount con tarjeta de crédito\\n";
        echo "Tarjeta: ****-****-****-" . substr($this->cardNumber, -4) . "\\n";
        
        if ($this->validateCard()) {
            echo "✅ Pago con tarjeta de crédito exitoso\\n";
            return ['success' => true, 'transactionId' => 'CC' . time()];
        }
        
        return ['success' => false, 'error' => 'Tarjeta inválida'];
    }
    
    private function validateCard(): bool {
        return strlen($this->cardNumber) === 16 && strlen($this->cvv) === 3;
    }
}

class PayPalPayment implements PaymentStrategy {
    private $email;
    private $password;
    
    public function __construct(string $email, string $password) {
        $this->email = $email;
        $this->password = $password;
    }
    
    public function pay(float $amount): array {
        echo "Procesando pago de $$amount con PayPal\\n";
        echo "Email: {$this->email}\\n";
        
        if ($this->authenticate()) {
            echo "✅ Pago con PayPal exitoso\\n";
            return ['success' => true, 'transactionId' => 'PP' . time()];
        }
        
        return ['success' => false, 'error' => 'Credenciales de PayPal inválidas'];
    }
    
    private function authenticate(): bool {
        return strpos($this->email, '@') !== false && strlen($this->password) > 6;
    }
}

class CryptoPayment implements PaymentStrategy {
    private $walletAddress;
    private $privateKey;
    
    public function __construct(string $walletAddress, string $privateKey) {
        $this->walletAddress = $walletAddress;
        $this->privateKey = $privateKey;
    }
    
    public function pay(float $amount): array {
        echo "Procesando pago de $$amount con criptomoneda\\n";
        $shortWallet = substr($this->walletAddress, 0, 6) . '...' . substr($this->walletAddress, -4);
        echo "Wallet: $shortWallet\\n";
        
        if ($this->validateWallet()) {
            echo "✅ Pago con criptomoneda exitoso\\n";
            return ['success' => true, 'transactionId' => 'CRYPTO' . time()];
        }
        
        return ['success' => false, 'error' => 'Wallet inválida'];
    }
    
    private function validateWallet(): bool {
        return strlen($this->walletAddress) === 42 && strpos($this->walletAddress, '0x') === 0;
    }
}

// Contexto que usa las estrategias
class ShoppingCart {
    private $items = [];
    private $paymentStrategy;
    
    public function addItem(string $name, float $price): void {
        $this->items[] = ['name' => $name, 'price' => $price];
        echo "Agregado: $name - $$price\\n";
    }
    
    public function setPaymentStrategy(PaymentStrategy $strategy): void {
        $this->paymentStrategy = $strategy;
        echo "Método de pago configurado\\n";
    }
    
    public function getTotal(): float {
        return array_sum(array_column($this->items, 'price'));
    }
    
    public function checkout(): array {
        if ($this->paymentStrategy === null) {
            throw new Exception('Debe seleccionar un método de pago');
        }
        
        $total = $this->getTotal();
        echo "\\n--- Checkout ---\\n";
        echo "Total a pagar: $$total\\n";
        
        return $this->paymentStrategy->pay($total);
    }
}

// Uso del patrón Strategy
$cart = new ShoppingCart();

// Agregar productos
$cart->addItem('Laptop', 1200);
$cart->addItem('Mouse', 25);
$cart->addItem('Teclado', 75);

// Estrategia 1: Pago con tarjeta de crédito
echo "\\n=== Pago con Tarjeta ===\\n";
$cart->setPaymentStrategy(
    new CreditCardPayment('1234567890123456', '12/25', '123')
);
$result = $cart->checkout();
print_r($result);

// Estrategia 2: Pago con PayPal
echo "\\n=== Pago con PayPal ===\\n";
$cart->setPaymentStrategy(
    new PayPalPayment('usuario@email.com', 'password123')
);
$result = $cart->checkout();
print_r($result);

// Estrategia 3: Pago con criptomoneda
echo "\\n=== Pago con Crypto ===\\n";
$cart->setPaymentStrategy(
    new CryptoPayment('0x742d35Cc6634C0532925a3b8D45d2C5c5C8fC542', 'private_key')
);
$result = $cart->checkout();
print_r($result);
?>`
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