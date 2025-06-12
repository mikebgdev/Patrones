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
    content: "El patrón Abstract Factory es como una 'super fábrica' que produce familias completas de objetos relacionados. Imagina una fábrica de muebles que puede producir diferentes estilos: moderno, clásico, rústico. Cada estilo requiere una silla, mesa y sofá que combinen entre sí.\n\nEste patrón es útil cuando necesitas asegurar que los objetos creados sean compatibles entre sí y pertenezcan a la misma 'familia'.\n\n**¿Cuándo usarlo?**\n• Cuando tu sistema debe ser independiente de cómo se crean sus objetos\n• Cuando quieres proporcionar una biblioteca de objetos revelando solo sus interfaces\n• Cuando una familia de objetos relacionados debe usarse conjuntamente\n• Cuando quieres imponer esta restricción a nivel de diseño\n\n**Ventajas:**\n• Aísla las clases concretas del cliente\n• Facilita el intercambio de familias de productos\n• Promueve la consistencia entre productos relacionados\n• Soporta nuevas variedades de productos fácilmente\n\n**Desventajas:**\n• Difícil extender para soportar nuevos tipos de productos\n• Puede resultar en muchas clases e interfaces\n• Complejidad adicional cuando solo necesitas un tipo de objeto",
    examples: {
      javascript: `// Productos abstractos - interfaces comunes
class Button {
  render() {
    throw new Error('Must implement render method');
  }
}

class Input {
  render() {
    throw new Error('Must implement render method');
  }
}

// Productos concretos para tema oscuro
class DarkButton extends Button {
  render() {
    return '<button class="dark-btn">Dark Button</button>';
  }
}

class DarkInput extends Input {
  render() {
    return '<input class="dark-input" type="text" />';
  }
}

// Productos concretos para tema claro
class LightButton extends Button {
  render() {
    return '<button class="light-btn">Light Button</button>';
  }
}

class LightInput extends Input {
  render() {
    return '<input class="light-input" type="text" />';
  }
}

// Abstract Factory
class UIFactory {
  createButton() {
    throw new Error('Must implement createButton');
  }
  
  createInput() {
    throw new Error('Must implement createInput');
  }
}

// Factorías concretas
class DarkThemeFactory extends UIFactory {
  createButton() {
    return new DarkButton();
  }
  
  createInput() {
    return new DarkInput();
  }
}

class LightThemeFactory extends UIFactory {
  createButton() {
    return new LightButton();
  }
  
  createInput() {
    return new LightInput();
  }
}

// Cliente que usa la factory
class Application {
  constructor(factory) {
    this.factory = factory;
    this.button = factory.createButton();
    this.input = factory.createInput();
  }
  
  render() {
    return this.button.render() + this.input.render();
  }
}

// Uso del patrón
const userPrefersDark = true;
const factory = userPrefersDark 
  ? new DarkThemeFactory() 
  : new LightThemeFactory();

const app = new Application(factory);
console.log(app.render()); // Renderiza elementos del tema correspondiente`,
      php: `<?php
// Productos abstractos
interface Button {
    public function render(): string;
}

interface Input {
    public function render(): string;
}

// Productos concretos para tema oscuro
class DarkButton implements Button {
    public function render(): string {
        return '<button class="dark-btn">Dark Button</button>';
    }
}

class DarkInput implements Input {
    public function render(): string {
        return '<input class="dark-input" type="text" />';
    }
}

// Productos concretos para tema claro
class LightButton implements Button {
    public function render(): string {
        return '<button class="light-btn">Light Button</button>';
    }
}

class LightInput implements Input {
    public function render(): string {
        return '<input class="light-input" type="text" />';
    }
}

// Abstract Factory
interface UIFactory {
    public function createButton(): Button;
    public function createInput(): Input;
}

// Factorías concretas
class DarkThemeFactory implements UIFactory {
    public function createButton(): Button {
        return new DarkButton();
    }
    
    public function createInput(): Input {
        return new DarkInput();
    }
}

class LightThemeFactory implements UIFactory {
    public function createButton(): Button {
        return new LightButton();
    }
    
    public function createInput(): Input {
        return new LightInput();
    }
}

// Cliente que usa la factory
class Application {
    private $factory;
    private $button;
    private $input;
    
    public function __construct(UIFactory $factory) {
        $this->factory = $factory;
        $this->button = $factory->createButton();
        $this->input = $factory->createInput();
    }
    
    public function render(): string {
        return $this->button->render() . $this->input->render();
    }
}

// Uso del patrón
$userPrefersDark = true;
$factory = $userPrefersDark 
    ? new DarkThemeFactory() 
    : new LightThemeFactory();

$app = new Application($factory);
echo $app->render(); // Renderiza elementos del tema correspondiente
?>`
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
    content: "El patrón Builder es como construir una casa: no puedes hacerlo de una vez, necesitas seguir pasos específicos. Primero los cimientos, luego las paredes, después el techo, etc. Este patrón te permite construir objetos complejos paso a paso.\n\nEs especialmente útil cuando tienes objetos con muchas configuraciones opcionales o cuando el proceso de construcción es complejo.\n\n**¿Cuándo usarlo?**\n• Cuando quieres crear objetos complejos con muchos parámetros opcionales\n• Cuando el algoritmo de construcción debe ser independiente de las partes del objeto\n• Cuando quieres construir diferentes representaciones del mismo objeto\n• Cuando quieres evitar constructores telescópicos (muchos parámetros)\n\n**Ventajas:**\n• Permite construir objetos paso a paso\n• Puedes crear diferentes representaciones del mismo producto\n• Aísla el código de construcción de la representación\n• Te da mejor control sobre el proceso de construcción\n\n**Desventajas:**\n• Aumenta la complejidad del código al crear múltiples clases nuevas\n• Puede ser overkill para objetos simples",
    examples: {
      javascript: `// Producto complejo que queremos construir
class House {
  constructor() {
    this.walls = '';
    this.roof = '';
    this.windows = '';
    this.doors = '';
    this.garage = false;
    this.garden = false;
    this.pool = false;
  }
  
  showHouse() {
    console.log(\`Casa construida:\`);
    console.log(\`- Paredes: \${this.walls}\`);
    console.log(\`- Techo: \${this.roof}\`);
    console.log(\`- Ventanas: \${this.windows}\`);
    console.log(\`- Puertas: \${this.doors}\`);
    console.log(\`- Garaje: \${this.garage ? 'Sí' : 'No'}\`);
    console.log(\`- Jardín: \${this.garden ? 'Sí' : 'No'}\`);
    console.log(\`- Piscina: \${this.pool ? 'Sí' : 'No'}\`);
  }
}

// Builder interface
class HouseBuilder {
  constructor() {
    this.house = new House();
  }
  
  reset() {
    this.house = new House();
    return this;
  }
  
  buildWalls(material) {
    this.house.walls = material;
    return this;
  }
  
  buildRoof(type) {
    this.house.roof = type;
    return this;
  }
  
  buildWindows(count, type) {
    this.house.windows = \`\${count} ventanas de \${type}\`;
    return this;
  }
  
  buildDoors(count, type) {
    this.house.doors = \`\${count} puertas de \${type}\`;
    return this;
  }
  
  addGarage() {
    this.house.garage = true;
    return this;
  }
  
  addGarden() {
    this.house.garden = true;
    return this;
  }
  
  addPool() {
    this.house.pool = true;
    return this;
  }
  
  getResult() {
    return this.house;
  }
}

// Director - conoce cómo construir casas específicas
class HouseDirector {
  constructor(builder) {
    this.builder = builder;
  }
  
  buildMinimalHouse() {
    return this.builder
      .reset()
      .buildWalls('Ladrillo básico')
      .buildRoof('Tejas de barro')
      .buildWindows(4, 'aluminio')
      .buildDoors(1, 'madera')
      .getResult();
  }
  
  buildLuxuryHouse() {
    return this.builder
      .reset()
      .buildWalls('Piedra natural')
      .buildRoof('Tejas de pizarra')
      .buildWindows(12, 'doble cristal')
      .buildDoors(3, 'roble macizo')
      .addGarage()
      .addGarden()
      .addPool()
      .getResult();
  }
  
  buildModernHouse() {
    return this.builder
      .reset()
      .buildWalls('Cristal y acero')
      .buildRoof('Plano con paneles solares')
      .buildWindows(8, 'cristal inteligente')
      .buildDoors(2, 'automáticas')
      .addGarage()
      .getResult();
  }
}

// Uso del patrón
const builder = new HouseBuilder();
const director = new HouseDirector(builder);

// Construir diferentes tipos de casas
console.log('=== Casa Básica ===');
const basicHouse = director.buildMinimalHouse();
basicHouse.showHouse();

console.log('\\n=== Casa de Lujo ===');
const luxuryHouse = director.buildLuxuryHouse();
luxuryHouse.showHouse();

console.log('\\n=== Casa Moderna ===');
const modernHouse = director.buildModernHouse();
modernHouse.showHouse();

// También puedes usar el builder directamente para personalizaciones
console.log('\\n=== Casa Personalizada ===');
const customHouse = builder
  .reset()
  .buildWalls('Madera sostenible')
  .buildRoof('Verde con vegetación')
  .buildWindows(6, 'triple cristal')
  .buildDoors(2, 'reciclada')
  .addGarden()
  .getResult();

customHouse.showHouse();`,
      php: `<?php
// Producto complejo que queremos construir
class House {
    public $walls = '';
    public $roof = '';
    public $windows = '';
    public $doors = '';
    public $garage = false;
    public $garden = false;
    public $pool = false;
    
    public function showHouse(): void {
        echo "Casa construida:\\n";
        echo "- Paredes: {$this->walls}\\n";
        echo "- Techo: {$this->roof}\\n";
        echo "- Ventanas: {$this->windows}\\n";
        echo "- Puertas: {$this->doors}\\n";
        echo "- Garaje: " . ($this->garage ? 'Sí' : 'No') . "\\n";
        echo "- Jardín: " . ($this->garden ? 'Sí' : 'No') . "\\n";
        echo "- Piscina: " . ($this->pool ? 'Sí' : 'No') . "\\n";
    }
}

// Builder interface
interface HouseBuilderInterface {
    public function reset(): self;
    public function buildWalls(string $material): self;
    public function buildRoof(string $type): self;
    public function buildWindows(int $count, string $type): self;
    public function buildDoors(int $count, string $type): self;
    public function addGarage(): self;
    public function addGarden(): self;
    public function addPool(): self;
    public function getResult(): House;
}

// Builder concreto
class HouseBuilder implements HouseBuilderInterface {
    private $house;
    
    public function __construct() {
        $this->house = new House();
    }
    
    public function reset(): self {
        $this->house = new House();
        return $this;
    }
    
    public function buildWalls(string $material): self {
        $this->house->walls = $material;
        return $this;
    }
    
    public function buildRoof(string $type): self {
        $this->house->roof = $type;
        return $this;
    }
    
    public function buildWindows(int $count, string $type): self {
        $this->house->windows = "{$count} ventanas de {$type}";
        return $this;
    }
    
    public function buildDoors(int $count, string $type): self {
        $this->house->doors = "{$count} puertas de {$type}";
        return $this;
    }
    
    public function addGarage(): self {
        $this->house->garage = true;
        return $this;
    }
    
    public function addGarden(): self {
        $this->house->garden = true;
        return $this;
    }
    
    public function addPool(): self {
        $this->house->pool = true;
        return $this;
    }
    
    public function getResult(): House {
        return $this->house;
    }
}

// Director - conoce cómo construir casas específicas
class HouseDirector {
    private $builder;
    
    public function __construct(HouseBuilderInterface $builder) {
        $this->builder = $builder;
    }
    
    public function buildMinimalHouse(): House {
        return $this->builder
            ->reset()
            ->buildWalls('Ladrillo básico')
            ->buildRoof('Tejas de barro')
            ->buildWindows(4, 'aluminio')
            ->buildDoors(1, 'madera')
            ->getResult();
    }
    
    public function buildLuxuryHouse(): House {
        return $this->builder
            ->reset()
            ->buildWalls('Piedra natural')
            ->buildRoof('Tejas de pizarra')
            ->buildWindows(12, 'doble cristal')
            ->buildDoors(3, 'roble macizo')
            ->addGarage()
            ->addGarden()
            ->addPool()
            ->getResult();
    }
    
    public function buildModernHouse(): House {
        return $this->builder
            ->reset()
            ->buildWalls('Cristal y acero')
            ->buildRoof('Plano con paneles solares')
            ->buildWindows(8, 'cristal inteligente')
            ->buildDoors(2, 'automáticas')
            ->addGarage()
            ->getResult();
    }
}

// Uso del patrón
$builder = new HouseBuilder();
$director = new HouseDirector($builder);

// Construir diferentes tipos de casas
echo "=== Casa Básica ===\\n";
$basicHouse = $director->buildMinimalHouse();
$basicHouse->showHouse();

echo "\\n=== Casa de Lujo ===\\n";
$luxuryHouse = $director->buildLuxuryHouse();
$luxuryHouse->showHouse();

echo "\\n=== Casa Moderna ===\\n";
$modernHouse = $director->buildModernHouse();
$modernHouse->showHouse();

// También puedes usar el builder directamente
echo "\\n=== Casa Personalizada ===\\n";
$customHouse = $builder
    ->reset()
    ->buildWalls('Madera sostenible')
    ->buildRoof('Verde con vegetación')
    ->buildWindows(6, 'triple cristal')
    ->buildDoors(2, 'reciclada')
    ->addGarden()
    ->getResult();

$customHouse->showHouse();
?>`
    },
    relatedPatterns: ["abstract-factory", "composite"]
  },
  {
    id: 4,
    name: "Prototype",
    slug: "prototype",
    description: "Permite copiar objetos existientes sin que el código dependa de sus clases.",
    category: "creational",
    difficulty: 2,
    icon: "copy",
    color: "from-teal-500 to-teal-600",
    tags: ["cloning", "copy", "prototype"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón Prototype es como usar una fotocopiadora: en lugar de crear documentos desde cero, copias uno existente y lo modificas según necesites. Esto es especialmente útil cuando crear un objeto es costoso o complejo.\n\nPiensa en un videojuego donde tienes enemigos: en lugar de crear cada enemigo desde cero, puedes tener un 'prototipo' de cada tipo y clonarlo cuando necesites más.\n\n**¿Cuándo usarlo?**\n• Cuando crear un objeto es más costoso que copiarlo\n• Cuando quieres evitar subclases de un Factory (como en Abstract Factory)\n• Cuando las instancias pueden tener solo unas pocas combinaciones de estado\n• Cuando quieres reducir el número de clases\n\n**Ventajas:**\n• Puede agregar y quitar productos en tiempo de ejecución\n• Especifica nuevos objetos variando valores\n• Especifica nuevos objetos variando estructura\n• Reduce el número de subclases\n• Configura dinámicamente una aplicación con clases\n\n**Desventajas:**\n• Implementar el método clone puede ser difícil si los objetos tienen referencias circulares\n• Cada subclase debe implementar la operación de clonado",
    examples: {
      javascript: `// Prototipo base para documentos
class DocumentPrototype {
  constructor() {
    this.title = '';
    this.content = '';
    this.author = '';
    this.template = '';
    this.metadata = {};
  }
  
  // Método de clonado que debe implementar cada tipo
  clone() {
    throw new Error('Clone method must be implemented');
  }
  
  setTitle(title) {
    this.title = title;
    return this;
  }
  
  setContent(content) {
    this.content = content;
    return this;
  }
  
  setAuthor(author) {
    this.author = author;
    return this;
  }
  
  display() {
    console.log(\`📄 \${this.template}\`);
    console.log(\`Título: \${this.title}\`);
    console.log(\`Autor: \${this.author}\`);
    console.log(\`Contenido: \${this.content.substring(0, 50)}...\`);
    console.log('---');
  }
}

// Prototipos concretos
class ReportPrototype extends DocumentPrototype {
  constructor() {
    super();
    this.template = 'Informe Ejecutivo';
    this.content = 'RESUMEN EJECUTIVO\\n\\n1. Introducción\\n2. Análisis\\n3. Conclusiones\\n4. Recomendaciones';
    this.metadata = {
      sections: ['resumen', 'análisis', 'conclusiones'],
      format: 'formal',
      confidentiality: 'internal'
    };
  }
  
  clone() {
    const cloned = new ReportPrototype();
    cloned.title = this.title;
    cloned.content = this.content;
    cloned.author = this.author;
    cloned.template = this.template;
    cloned.metadata = { ...this.metadata };
    return cloned;
  }
}

class ProposalPrototype extends DocumentPrototype {
  constructor() {
    super();
    this.template = 'Propuesta de Proyecto';
    this.content = 'PROPUESTA\\n\\n1. Objetivo\\n2. Alcance\\n3. Metodología\\n4. Cronograma\\n5. Presupuesto';
    this.metadata = {
      sections: ['objetivo', 'alcance', 'metodología', 'cronograma', 'presupuesto'],
      format: 'business',
      status: 'draft'
    };
  }
  
  clone() {
    const cloned = new ProposalPrototype();
    cloned.title = this.title;
    cloned.content = this.content;
    cloned.author = this.author;
    cloned.template = this.template;
    cloned.metadata = { ...this.metadata };
    return cloned;
  }
}

class ContractPrototype extends DocumentPrototype {
  constructor() {
    super();
    this.template = 'Contrato de Servicios';
    this.content = 'CONTRATO\\n\\nPARTES:\\nContratante: [NOMBRE]\\nContratista: [NOMBRE]\\n\\nCLÁUSULAS:\\n1. Objeto del contrato\\n2. Obligaciones\\n3. Términos de pago';
    this.metadata = {
      sections: ['partes', 'objeto', 'obligaciones', 'pagos', 'firma'],
      format: 'legal',
      requiresSignature: true
    };
  }
  
  clone() {
    const cloned = new ContractPrototype();
    cloned.title = this.title;
    cloned.content = this.content;
    cloned.author = this.author;
    cloned.template = this.template;
    cloned.metadata = { ...this.metadata };
    return cloned;
  }
}

// Gestor de prototipos (Registry)
class DocumentPrototypeRegistry {
  constructor() {
    this.prototypes = new Map();
    this.initializePrototypes();
  }
  
  initializePrototypes() {
    this.prototypes.set('report', new ReportPrototype());
    this.prototypes.set('proposal', new ProposalPrototype());
    this.prototypes.set('contract', new ContractPrototype());
  }
  
  getPrototype(type) {
    const prototype = this.prototypes.get(type);
    if (!prototype) {
      throw new Error(\`Prototype type '\${type}' not found\`);
    }
    return prototype.clone();
  }
  
  addPrototype(type, prototype) {
    this.prototypes.set(type, prototype);
  }
}

// Cliente que usa prototipos
class DocumentFactory {
  constructor() {
    this.registry = new DocumentPrototypeRegistry();
  }
  
  createDocument(type, title, author, customContent = null) {
    const doc = this.registry.getPrototype(type);
    doc.setTitle(title).setAuthor(author);
    
    if (customContent) {
      doc.setContent(customContent);
    }
    
    return doc;
  }
}

// Uso del patrón
const factory = new DocumentFactory();

// Crear diferentes documentos basados en prototipos
console.log('=== Creando documentos usando prototipos ===\\n');

const monthlyReport = factory.createDocument(
  'report',
  'Informe Mensual de Ventas',
  'Ana García'
);
monthlyReport.display();

const projectProposal = factory.createDocument(
  'proposal',
  'Propuesta de Modernización IT',
  'Carlos López',
  'Propuesta para modernizar la infraestructura tecnológica de la empresa...'
);
projectProposal.display();

const serviceContract = factory.createDocument(
  'contract',
  'Contrato de Desarrollo Web',
  'Legal Department'
);
serviceContract.display();

// Crear múltiples documentos del mismo tipo rápidamente
console.log('=== Clonación rápida para múltiples documentos ===\\n');

const reports = [
  'Informe Q1 2024',
  'Informe Q2 2024', 
  'Informe Q3 2024'
].map(title => factory.createDocument('report', title, 'Departamento Financiero'));

reports.forEach(report => report.display());`,
      php: `<?php
// Interfaz de prototipo
interface DocumentPrototype {
    public function clone(): self;
    public function setTitle(string $title): self;
    public function setContent(string $content): self;
    public function setAuthor(string $author): self;
    public function display(): void;
}

// Clase base abstracta para documentos
abstract class BaseDocument implements DocumentPrototype {
    protected $title = '';
    protected $content = '';
    protected $author = '';
    protected $template = '';
    protected $metadata = [];
    
    public function setTitle(string $title): self {
        $this->title = $title;
        return $this;
    }
    
    public function setContent(string $content): self {
        $this->content = $content;
        return $this;
    }
    
    public function setAuthor(string $author): self {
        $this->author = $author;
        return $this;
    }
    
    public function display(): void {
        echo "📄 {$this->template}\\n";
        echo "Título: {$this->title}\\n";
        echo "Autor: {$this->author}\\n";
        echo "Contenido: " . substr($this->content, 0, 50) . "...\\n";
        echo "---\\n";
    }
    
    abstract public function clone(): self;
}

// Prototipos concretos
class ReportPrototype extends BaseDocument {
    public function __construct() {
        $this->template = 'Informe Ejecutivo';
        $this->content = "RESUMEN EJECUTIVO\\n\\n1. Introducción\\n2. Análisis\\n3. Conclusiones\\n4. Recomendaciones";
        $this->metadata = [
            'sections' => ['resumen', 'análisis', 'conclusiones'],
            'format' => 'formal',
            'confidentiality' => 'internal'
        ];
    }
    
    public function clone(): self {
        $cloned = new ReportPrototype();
        $cloned->title = $this->title;
        $cloned->content = $this->content;
        $cloned->author = $this->author;
        $cloned->template = $this->template;
        $cloned->metadata = $this->metadata;
        return $cloned;
    }
}

class ProposalPrototype extends BaseDocument {
    public function __construct() {
        $this->template = 'Propuesta de Proyecto';
        $this->content = "PROPUESTA\\n\\n1. Objetivo\\n2. Alcance\\n3. Metodología\\n4. Cronograma\\n5. Presupuesto";
        $this->metadata = [
            'sections' => ['objetivo', 'alcance', 'metodología', 'cronograma', 'presupuesto'],
            'format' => 'business',
            'status' => 'draft'
        ];
    }
    
    public function clone(): self {
        $cloned = new ProposalPrototype();
        $cloned->title = $this->title;
        $cloned->content = $this->content;
        $cloned->author = $this->author;
        $cloned->template = $this->template;
        $cloned->metadata = $this->metadata;
        return $cloned;
    }
}

class ContractPrototype extends BaseDocument {
    public function __construct() {
        $this->template = 'Contrato de Servicios';
        $this->content = "CONTRATO\\n\\nPARTES:\\nContratante: [NOMBRE]\\nContratista: [NOMBRE]\\n\\nCLÁUSULAS:\\n1. Objeto del contrato\\n2. Obligaciones\\n3. Términos de pago";
        $this->metadata = [
            'sections' => ['partes', 'objeto', 'obligaciones', 'pagos', 'firma'],
            'format' => 'legal',
            'requiresSignature' => true
        ];
    }
    
    public function clone(): self {
        $cloned = new ContractPrototype();
        $cloned->title = $this->title;
        $cloned->content = $this->content;
        $cloned->author = $this->author;
        $cloned->template = $this->template;
        $cloned->metadata = $this->metadata;
        return $cloned;
    }
}

// Gestor de prototipos (Registry)
class DocumentPrototypeRegistry {
    private $prototypes = [];
    
    public function __construct() {
        $this->initializePrototypes();
    }
    
    private function initializePrototypes(): void {
        $this->prototypes['report'] = new ReportPrototype();
        $this->prototypes['proposal'] = new ProposalPrototype();
        $this->prototypes['contract'] = new ContractPrototype();
    }
    
    public function getPrototype(string $type): DocumentPrototype {
        if (!isset($this->prototypes[$type])) {
            throw new Exception("Prototype type '$type' not found");
        }
        
        return $this->prototypes[$type]->clone();
    }
    
    public function addPrototype(string $type, DocumentPrototype $prototype): void {
        $this->prototypes[$type] = $prototype;
    }
}

// Cliente que usa prototipos
class DocumentFactory {
    private $registry;
    
    public function __construct() {
        $this->registry = new DocumentPrototypeRegistry();
    }
    
    public function createDocument(string $type, string $title, string $author, ?string $customContent = null): DocumentPrototype {
        $doc = $this->registry->getPrototype($type);
        $doc->setTitle($title)->setAuthor($author);
        
        if ($customContent !== null) {
            $doc->setContent($customContent);
        }
        
        return $doc;
    }
}

// Uso del patrón
$factory = new DocumentFactory();

// Crear diferentes documentos basados en prototipos
echo "=== Creando documentos usando prototipos ===\\n\\n";

$monthlyReport = $factory->createDocument(
    'report',
    'Informe Mensual de Ventas',
    'Ana García'
);
$monthlyReport->display();

$projectProposal = $factory->createDocument(
    'proposal',
    'Propuesta de Modernización IT',
    'Carlos López',
    'Propuesta para modernizar la infraestructura tecnológica de la empresa...'
);
$projectProposal->display();

$serviceContract = $factory->createDocument(
    'contract',
    'Contrato de Desarrollo Web',
    'Legal Department'
);
$serviceContract->display();

// Crear múltiples documentos del mismo tipo rápidamente
echo "=== Clonación rápida para múltiples documentos ===\\n\\n";

$reportTitles = [
    'Informe Q1 2024',
    'Informe Q2 2024', 
    'Informe Q3 2024'
];

foreach ($reportTitles as $title) {
    $report = $factory->createDocument('report', $title, 'Departamento Financiero');
    $report->display();
}
?>`
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
    content: "El patrón Adapter es como un adaptador de enchufe para viajar: te permite conectar un aparato con un tipo de enchufe a una toma de corriente diferente. En programación, permite que clases con interfaces incompatibles trabajen juntas.\n\nEste patrón es especialmente útil cuando quieres usar bibliotecas externas o sistemas legacy que tienen interfaces diferentes a las que espera tu código.\n\n**¿Cuándo usarlo?**\n• Cuando quieres usar una clase existente con una interfaz incompatible\n• Cuando quieres crear una clase reutilizable que coopere con clases no relacionadas\n• Cuando necesitas usar varias subclases existentes, pero es impracticable adaptar sus interfaces por subclasificación\n• Cuando quieres integrar componentes de terceros\n\n**Ventajas:**\n• Permite que clases incompatibles trabajen juntas\n• Aumenta la reutilización de clases existentes\n• Separa la conversión de interfaz de la lógica de negocio\n• Principio de responsabilidad única: separas la conversión de datos\n\n**Desventajas:**\n• Aumenta la complejidad del código al introducir nuevas interfaces y clases\n• A veces es más simple cambiar la clase de servicio para que coincida con el resto del código",
    examples: {
      javascript: `// Sistema de pago legacy que no podemos modificar
class PayPalGateway {
  makePayment(amount) {
    console.log(\`Procesando $\${amount} a través de PayPal\`);
    return {
      transactionId: 'PP_' + Date.now(),
      status: 'completed',
      gateway: 'paypal'
    };
  }
  
  getTransactionStatus(transactionId) {
    console.log(\`Consultando estado de transacción PayPal: \${transactionId}\`);
    return 'completed';
  }
}

class StripeGateway {
  charge(amountInCents) {
    console.log(\`Cargando \${amountInCents} centavos via Stripe\`);
    return {
      id: 'ch_' + Date.now(),
      paid: true,
      service: 'stripe'
    };
  }
  
  retrieveCharge(chargeId) {
    console.log(\`Recuperando cargo de Stripe: \${chargeId}\`);
    return { id: chargeId, paid: true };
  }
}

// Interfaz que nuestro sistema espera
class PaymentProcessor {
  pay(amount) {
    throw new Error('Método pay debe ser implementado');
  }
  
  getStatus(transactionId) {
    throw new Error('Método getStatus debe ser implementado');
  }
}

// Adapter para PayPal
class PayPalAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.paypalGateway = new PayPalGateway();
  }
  
  pay(amount) {
    // Adaptamos la interfaz de PayPal a nuestra interfaz esperada
    const result = this.paypalGateway.makePayment(amount);
    
    return {
      transactionId: result.transactionId,
      success: result.status === 'completed',
      provider: 'paypal'
    };
  }
  
  getStatus(transactionId) {
    const status = this.paypalGateway.getTransactionStatus(transactionId);
    return status === 'completed' ? 'success' : 'pending';
  }
}

// Adapter para Stripe
class StripeAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.stripeGateway = new StripeGateway();
  }
  
  pay(amount) {
    // Convertimos dollars a centavos como espera Stripe
    const amountInCents = Math.round(amount * 100);
    const result = this.stripeGateway.charge(amountInCents);
    
    return {
      transactionId: result.id,
      success: result.paid,
      provider: 'stripe'
    };
  }
  
  getStatus(transactionId) {
    const charge = this.stripeGateway.retrieveCharge(transactionId);
    return charge.paid ? 'success' : 'pending';
  }
}

// Cliente que usa los adaptadores
class ECommerceSystem {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }
  
  processOrder(orderAmount) {
    console.log(\`\\nProcesando orden por $\${orderAmount}\`);
    
    try {
      const result = this.paymentProcessor.pay(orderAmount);
      
      if (result.success) {
        console.log(\`✅ Pago exitoso con \${result.provider}\`);
        console.log(\`   ID de transacción: \${result.transactionId}\`);
        
        // Verificar estado
        const status = this.paymentProcessor.getStatus(result.transactionId);
        console.log(\`   Estado: \${status}\`);
        
        return result;
      } else {
        console.log(\`❌ Pago fallido\`);
        return null;
      }
    } catch (error) {
      console.log(\`❌ Error procesando pago: \${error.message}\`);
      return null;
    }
  }
}

// Uso del patrón Adapter
console.log('=== Sistema de E-Commerce con diferentes gateways de pago ===');

// Usando PayPal
const paypalProcessor = new PayPalAdapter();
const storeWithPayPal = new ECommerceSystem(paypalProcessor);
storeWithPayPal.processOrder(99.99);

// Usando Stripe
const stripeProcessor = new StripeAdapter();
const storeWithStripe = new ECommerceSystem(stripeProcessor);
storeWithStripe.processOrder(149.50);

// El cliente (ECommerceSystem) no sabe qué gateway está usando
// Ambos adapters implementan la misma interfaz PaymentProcessor`,
      php: `<?php
// Sistema de pago legacy que no podemos modificar
class PayPalGateway {
    public function makePayment(float $amount): array {
        echo "Procesando $$amount a través de PayPal\\n";
        return [
            'transactionId' => 'PP_' . time(),
            'status' => 'completed',
            'gateway' => 'paypal'
        ];
    }
    
    public function getTransactionStatus(string $transactionId): string {
        echo "Consultando estado de transacción PayPal: $transactionId\\n";
        return 'completed';
    }
}

class StripeGateway {
    public function charge(int $amountInCents): array {
        echo "Cargando $amountInCents centavos via Stripe\\n";
        return [
            'id' => 'ch_' . time(),
            'paid' => true,
            'service' => 'stripe'
        ];
    }
    
    public function retrieveCharge(string $chargeId): array {
        echo "Recuperando cargo de Stripe: $chargeId\\n";
        return ['id' => $chargeId, 'paid' => true];
    }
}

// Interfaz que nuestro sistema espera
interface PaymentProcessor {
    public function pay(float $amount): array;
    public function getStatus(string $transactionId): string;
}

// Adapter para PayPal
class PayPalAdapter implements PaymentProcessor {
    private $paypalGateway;
    
    public function __construct() {
        $this->paypalGateway = new PayPalGateway();
    }
    
    public function pay(float $amount): array {
        // Adaptamos la interfaz de PayPal a nuestra interfaz esperada
        $result = $this->paypalGateway->makePayment($amount);
        
        return [
            'transactionId' => $result['transactionId'],
            'success' => $result['status'] === 'completed',
            'provider' => 'paypal'
        ];
    }
    
    public function getStatus(string $transactionId): string {
        $status = $this->paypalGateway->getTransactionStatus($transactionId);
        return $status === 'completed' ? 'success' : 'pending';
    }
}

// Adapter para Stripe
class StripeAdapter implements PaymentProcessor {
    private $stripeGateway;
    
    public function __construct() {
        $this->stripeGateway = new StripeGateway();
    }
    
    public function pay(float $amount): array {
        // Convertimos dollars a centavos como espera Stripe
        $amountInCents = round($amount * 100);
        $result = $this->stripeGateway->charge($amountInCents);
        
        return [
            'transactionId' => $result['id'],
            'success' => $result['paid'],
            'provider' => 'stripe'
        ];
    }
    
    public function getStatus(string $transactionId): string {
        $charge = $this->stripeGateway->retrieveCharge($transactionId);
        return $charge['paid'] ? 'success' : 'pending';
    }
}

// Cliente que usa los adaptadores
class ECommerceSystem {
    private $paymentProcessor;
    
    public function __construct(PaymentProcessor $paymentProcessor) {
        $this->paymentProcessor = $paymentProcessor;
    }
    
    public function processOrder(float $orderAmount): ?array {
        echo "\\nProcesando orden por $$orderAmount\\n";
        
        try {
            $result = $this->paymentProcessor->pay($orderAmount);
            
            if ($result['success']) {
                echo "✅ Pago exitoso con {$result['provider']}\\n";
                echo "   ID de transacción: {$result['transactionId']}\\n";
                
                // Verificar estado
                $status = $this->paymentProcessor->getStatus($result['transactionId']);
                echo "   Estado: $status\\n";
                
                return $result;
            } else {
                echo "❌ Pago fallido\\n";
                return null;
            }
        } catch (Exception $error) {
            echo "❌ Error procesando pago: {$error->getMessage()}\\n";
            return null;
        }
    }
}

// Uso del patrón Adapter
echo "=== Sistema de E-Commerce con diferentes gateways de pago ===\\n";

// Usando PayPal
$paypalProcessor = new PayPalAdapter();
$storeWithPayPal = new ECommerceSystem($paypalProcessor);
$storeWithPayPal->processOrder(99.99);

// Usando Stripe
$stripeProcessor = new StripeAdapter();
$storeWithStripe = new ECommerceSystem($stripeProcessor);
$storeWithStripe->processOrder(149.50);

// El cliente (ECommerceSystem) no sabe qué gateway está usando
// Ambos adapters implementan la misma interfaz PaymentProcessor
?>`
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
    content: "El patrón Bridge es como tener un control remoto universal: el control remoto (abstracción) puede funcionar con diferentes dispositivos (implementaciones) sin cambiar su diseño. Separa 'qué hace algo' de 'cómo lo hace'.\n\nEsto es útil cuando tienes una jerarquía que está creciendo en dos dimensiones diferentes: funcionalidad y plataforma.\n\n**¿Cuándo usarlo?**\n• Cuando quieres evitar una unión permanente entre una abstracción y su implementación\n• Cuando tanto las abstracciones como sus implementaciones deben ser extensibles por subclases\n• Cuando cambios en la implementación no deben impactar a los clientes\n• Cuando quieres compartir una implementación entre múltiples objetos\n\n**Ventajas:**\n• Puedes crear clases independientes de plataforma\n• El código cliente funciona con abstracciones de alto nivel\n• Principio Abierto/Cerrado: puedes introducir nuevas abstracciones e implementaciones independientemente\n• Principio de responsabilidad única: abstracciones se enfocan en lógica de alto nivel, implementaciones en detalles\n\n**Desventajas:**\n• Puede hacer el código más complicado aplicándolo a una clase muy cohesiva\n• Requiere mayor planificación inicial",
    examples: {
      javascript: `// Implementación - define la interfaz para clases de implementación
class NotificationSender {
  sendMessage(title, message) {
    throw new Error('sendMessage method must be implemented');
  }
}

// Implementaciones concretas
class EmailSender extends NotificationSender {
  constructor(emailConfig) {
    super();
    this.config = emailConfig;
  }
  
  sendMessage(title, message) {
    console.log(\`📧 Enviando EMAIL:\`);
    console.log(\`   Para: \${this.config.recipient}\`);
    console.log(\`   Asunto: \${title}\`);
    console.log(\`   Mensaje: \${message}\`);
    console.log(\`   Servidor SMTP: \${this.config.smtpServer}\`);
    return { sent: true, method: 'email' };
  }
}

class SMSSender extends NotificationSender {
  constructor(smsConfig) {
    super();
    this.config = smsConfig;
  }
  
  sendMessage(title, message) {
    console.log(\`📱 Enviando SMS:\`);
    console.log(\`   Para: \${this.config.phoneNumber}\`);
    console.log(\`   Mensaje: \${title}: \${message.substring(0, 140)}\`);
    console.log(\`   Proveedor: \${this.config.provider}\`);
    return { sent: true, method: 'sms' };
  }
}

class SlackSender extends NotificationSender {
  constructor(slackConfig) {
    super();
    this.config = slackConfig;
  }
  
  sendMessage(title, message) {
    console.log(\`💬 Enviando SLACK:\`);
    console.log(\`   Canal: \${this.config.channel}\`);
    console.log(\`   Título: \${title}\`);
    console.log(\`   Mensaje: \${message}\`);
    console.log(\`   Webhook: \${this.config.webhookUrl}\`);
    return { sent: true, method: 'slack' };
  }
}

// Abstracción - define la interfaz para la lógica de control
class Notification {
  constructor(sender) {
    this.sender = sender;
  }
  
  send(title, message) {
    return this.sender.sendMessage(title, message);
  }
}

// Abstracciones refinadas - extienden la interfaz base
class UrgentNotification extends Notification {
  send(title, message) {
    const urgentTitle = \`🚨 URGENTE: \${title}\`;
    console.log('⚡ Enviando notificación urgente...');
    return this.sender.sendMessage(urgentTitle, message);
  }
}

class DelayedNotification extends Notification {
  constructor(sender, delayMinutes = 5) {
    super(sender);
    this.delay = delayMinutes;
  }
  
  send(title, message) {
    console.log(\`⏰ Programando notificación para \${this.delay} minutos...\`);
    // Simular delay
    setTimeout(() => {
      this.sender.sendMessage(\`[Programado] \${title}\`, message);
    }, this.delay * 60 * 1000);
    return { scheduled: true, delay: this.delay };
  }
}

class BatchNotification extends Notification {
  constructor(sender) {
    super(sender);
    this.queue = [];
  }
  
  addToQueue(title, message) {
    this.queue.push({ title, message });
    console.log(\`📝 Agregado a cola: \${title} (Total: \${this.queue.length})\`);
  }
  
  sendBatch() {
    console.log(\`📦 Enviando lote de \${this.queue.length} notificaciones...\`);
    const results = this.queue.map(notification => 
      this.sender.sendMessage(notification.title, notification.message)
    );
    this.queue = []; // Limpiar cola
    return results;
  }
}

// Uso del patrón Bridge
console.log('=== Sistema de Notificaciones con Patrón Bridge ===\\n');

// Configuraciones
const emailConfig = {
  recipient: 'usuario@empresa.com',
  smtpServer: 'smtp.empresa.com'
};

const smsConfig = {
  phoneNumber: '+1234567890',
  provider: 'Twilio'
};

const slackConfig = {
  channel: '#alertas',
  webhookUrl: 'https://hooks.slack.com/...'
};

// Crear diferentes implementaciones
const emailSender = new EmailSender(emailConfig);
const smsSender = new SMSSender(smsConfig);
const slackSender = new SlackSender(slackConfig);

// Usar la misma abstracción con diferentes implementaciones
console.log('--- Notificaciones normales ---');
const emailNotification = new Notification(emailSender);
emailNotification.send('Reunión programada', 'Tu reunión está programada para las 3 PM');

const smsNotification = new Notification(smsSender);
smsNotification.send('Código de verificación', 'Tu código es: 123456');

console.log('\\n--- Notificaciones urgentes ---');
const urgentEmail = new UrgentNotification(emailSender);
urgentEmail.send('Sistema caído', 'El servidor principal ha dejado de responder');

const urgentSlack = new UrgentNotification(slackSender);
urgentSlack.send('Incidente de seguridad', 'Detectado acceso no autorizado');

console.log('\\n--- Notificaciones en lote ---');
const batchSlack = new BatchNotification(slackSender);
batchSlack.addToQueue('Deploy completado', 'Versión 2.1.0 desplegada exitosamente');
batchSlack.addToQueue('Backup finalizado', 'Backup nocturno completado');
batchSlack.addToQueue('Mantenimiento programado', 'Mantenimiento el próximo domingo');
batchSlack.sendBatch();`,
      php: `<?php
// Implementación - define la interfaz para clases de implementación
abstract class NotificationSender {
    abstract public function sendMessage(string $title, string $message): array;
}

// Implementaciones concretas
class EmailSender extends NotificationSender {
    private $config;
    
    public function __construct(array $emailConfig) {
        $this->config = $emailConfig;
    }
    
    public function sendMessage(string $title, string $message): array {
        echo "📧 Enviando EMAIL:\\n";
        echo "   Para: {$this->config['recipient']}\\n";
        echo "   Asunto: $title\\n";
        echo "   Mensaje: $message\\n";
        echo "   Servidor SMTP: {$this->config['smtpServer']}\\n";
        return ['sent' => true, 'method' => 'email'];
    }
}

class SMSSender extends NotificationSender {
    private $config;
    
    public function __construct(array $smsConfig) {
        $this->config = $smsConfig;
    }
    
    public function sendMessage(string $title, string $message): array {
        echo "📱 Enviando SMS:\\n";
        echo "   Para: {$this->config['phoneNumber']}\\n";
        echo "   Mensaje: $title: " . substr($message, 0, 140) . "\\n";
        echo "   Proveedor: {$this->config['provider']}\\n";
        return ['sent' => true, 'method' => 'sms'];
    }
}

class SlackSender extends NotificationSender {
    private $config;
    
    public function __construct(array $slackConfig) {
        $this->config = $slackConfig;
    }
    
    public function sendMessage(string $title, string $message): array {
        echo "💬 Enviando SLACK:\\n";
        echo "   Canal: {$this->config['channel']}\\n";
        echo "   Título: $title\\n";
        echo "   Mensaje: $message\\n";
        echo "   Webhook: {$this->config['webhookUrl']}\\n";
        return ['sent' => true, 'method' => 'slack'];
    }
}

// Abstracción - define la interfaz para la lógica de control
class Notification {
    protected $sender;
    
    public function __construct(NotificationSender $sender) {
        $this->sender = $sender;
    }
    
    public function send(string $title, string $message): array {
        return $this->sender->sendMessage($title, $message);
    }
}

// Abstracciones refinadas - extienden la interfaz base
class UrgentNotification extends Notification {
    public function send(string $title, string $message): array {
        $urgentTitle = "🚨 URGENTE: $title";
        echo "⚡ Enviando notificación urgente...\\n";
        return $this->sender->sendMessage($urgentTitle, $message);
    }
}

class DelayedNotification extends Notification {
    private $delay;
    
    public function __construct(NotificationSender $sender, int $delayMinutes = 5) {
        parent::__construct($sender);
        $this->delay = $delayMinutes;
    }
    
    public function send(string $title, string $message): array {
        echo "⏰ Programando notificación para {$this->delay} minutos...\\n";
        // En un sistema real, aquí usarías una cola de trabajo o scheduler
        return ['scheduled' => true, 'delay' => $this->delay];
    }
}

class BatchNotification extends Notification {
    private $queue = [];
    
    public function addToQueue(string $title, string $message): void {
        $this->queue[] = ['title' => $title, 'message' => $message];
        echo "📝 Agregado a cola: $title (Total: " . count($this->queue) . ")\\n";
    }
    
    public function sendBatch(): array {
        echo "📦 Enviando lote de " . count($this->queue) . " notificaciones...\\n";
        $results = [];
        
        foreach ($this->queue as $notification) {
            $results[] = $this->sender->sendMessage(
                $notification['title'], 
                $notification['message']
            );
        }
        
        $this->queue = []; // Limpiar cola
        return $results;
    }
}

// Uso del patrón Bridge
echo "=== Sistema de Notificaciones con Patrón Bridge ===\\n\\n";

// Configuraciones
$emailConfig = [
    'recipient' => 'usuario@empresa.com',
    'smtpServer' => 'smtp.empresa.com'
];

$smsConfig = [
    'phoneNumber' => '+1234567890',
    'provider' => 'Twilio'
];

$slackConfig = [
    'channel' => '#alertas',
    'webhookUrl' => 'https://hooks.slack.com/...'
];

// Crear diferentes implementaciones
$emailSender = new EmailSender($emailConfig);
$smsSender = new SMSSender($smsConfig);
$slackSender = new SlackSender($slackConfig);

// Usar la misma abstracción con diferentes implementaciones
echo "--- Notificaciones normales ---\\n";
$emailNotification = new Notification($emailSender);
$emailNotification->send('Reunión programada', 'Tu reunión está programada para las 3 PM');

$smsNotification = new Notification($smsSender);
$smsNotification->send('Código de verificación', 'Tu código es: 123456');

echo "\\n--- Notificaciones urgentes ---\\n";
$urgentEmail = new UrgentNotification($emailSender);
$urgentEmail->send('Sistema caído', 'El servidor principal ha dejado de responder');

$urgentSlack = new UrgentNotification($slackSender);
$urgentSlack->send('Incidente de seguridad', 'Detectado acceso no autorizado');

echo "\\n--- Notificaciones en lote ---\\n";
$batchSlack = new BatchNotification($slackSender);
$batchSlack->addToQueue('Deploy completado', 'Versión 2.1.0 desplegada exitosamente');
$batchSlack->addToQueue('Backup finalizado', 'Backup nocturno completado');
$batchSlack->addToQueue('Mantenimiento programado', 'Mantenimiento el próximo domingo');
$batchSlack->sendBatch();
?>`
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
    content: "El patrón Composite es como organizar archivos en carpetas: puedes tener archivos individuales y carpetas que contienen más archivos y carpetas. Tanto archivos como carpetas se pueden mover, copiar o eliminar de la misma manera.\n\nEste patrón te permite tratar objetos individuales y composiciones de objetos de forma uniforme.\n\n**¿Cuándo usarlo?**\n• Cuando quieres representar jerarquías parte-todo de objetos\n• Cuando quieres que los clientes ignoren la diferencia entre composiciones de objetos y objetos individuales\n• Cuando tienes estructuras de árbol complejas\n• Cuando necesitas aplicar operaciones uniformemente sobre elementos individuales y compuestos\n\n**Ventajas:**\n• Puedes trabajar con estructuras de árbol complejas más fácilmente\n• Principio Abierto/Cerrado: puedes introducir nuevos tipos de elementos sin romper código existente\n• Los clientes pueden tratar de manera uniforme objetos individuales y compuestos\n• Simplifica el código cliente al eliminar condicionales complejas\n\n**Desventajas:**\n• Puede ser difícil proporcionar una interfaz común para clases cuya funcionalidad difiere demasiado\n• Puede hacer el diseño demasiado general en algunos casos",
    examples: {
      javascript: `// Componente base - interfaz común para objetos simples y compuestos
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }
  
  // Operaciones que deben implementar tanto archivos como carpetas
  getSize() {
    throw new Error('getSize must be implemented');
  }
  
  display(indent = 0) {
    throw new Error('display must be implemented');
  }
  
  // Operaciones para manejo de estructura de árbol
  add(component) {
    throw new Error('add not supported');
  }
  
  remove(component) {
    throw new Error('remove not supported');
  }
  
  getChild(index) {
    throw new Error('getChild not supported');
  }
}

// Hoja - representa objetos finales del árbol
class File extends FileSystemComponent {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  
  getSize() {
    return this.size;
  }
  
  display(indent = 0) {
    const spaces = '  '.repeat(indent);
    console.log(\`\${spaces}📄 \${this.name} (\${this.size} KB)\`);
  }
}

// Compuesto - puede contener otros componentes
class Folder extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
    console.log(\`➕ Agregado \${component.name} a la carpeta \${this.name}\`);
  }
  
  remove(component) {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
      console.log(\`➖ Eliminado \${component.name} de la carpeta \${this.name}\`);
    }
  }
  
  getChild(index) {
    return this.children[index];
  }
  
  getSize() {
    // El tamaño de una carpeta es la suma de todos sus contenidos
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
  
  display(indent = 0) {
    const spaces = '  '.repeat(indent);
    console.log(\`\${spaces}📁 \${this.name}/ (\${this.getSize()} KB total)\`);
    
    // Mostrar todos los elementos hijos
    this.children.forEach(child => {
      child.display(indent + 1);
    });
  }
  
  // Métodos adicionales específicos para carpetas
  getFileCount() {
    return this.children.reduce((count, child) => {
      if (child instanceof File) {
        return count + 1;
      } else if (child instanceof Folder) {
        return count + child.getFileCount();
      }
      return count;
    }, 0);
  }
  
  getFolderCount() {
    return this.children.reduce((count, child) => {
      if (child instanceof Folder) {
        return count + 1 + child.getFolderCount();
      }
      return count;
    }, 0);
  }
  
  findByName(name) {
    // Buscar en la carpeta actual
    for (let child of this.children) {
      if (child.name === name) {
        return child;
      }
      
      // Si es una carpeta, buscar recursivamente
      if (child instanceof Folder) {
        const found = child.findByName(name);
        if (found) return found;
      }
    }
    return null;
  }
}

// Cliente que usa el patrón Composite
class FileManager {
  constructor() {
    this.root = new Folder('Sistema');
  }
  
  createStructure() {
    console.log('🏗️  Creando estructura de archivos...\\n');
    
    // Crear archivos
    const readme = new File('README.md', 2);
    const config = new File('config.json', 1);
    const mainJs = new File('main.js', 15);
    const stylesCss = new File('styles.css', 8);
    const indexHtml = new File('index.html', 5);
    const appJs = new File('app.js', 25);
    const utilsJs = new File('utils.js', 12);
    const testJs = new File('test.js', 18);
    
    // Crear carpetas
    const srcFolder = new Folder('src');
    const publicFolder = new Folder('public');
    const testsFolder = new Folder('tests');
    const assetsFolder = new Folder('assets');
    const imagesFolder = new Folder('images');
    
    // Construir estructura
    this.root.add(readme);
    this.root.add(config);
    this.root.add(srcFolder);
    this.root.add(publicFolder);
    this.root.add(testsFolder);
    
    srcFolder.add(mainJs);
    srcFolder.add(appJs);
    srcFolder.add(utilsJs);
    
    publicFolder.add(indexHtml);
    publicFolder.add(stylesCss);
    publicFolder.add(assetsFolder);
    
    assetsFolder.add(imagesFolder);
    imagesFolder.add(new File('logo.png', 45));
    imagesFolder.add(new File('background.jpg', 120));
    
    testsFolder.add(testJs);
  }
  
  showStatistics() {
    console.log('\\n📊 Estadísticas del sistema:');
    console.log(\`   Archivos totales: \${this.root.getFileCount()}\`);
    console.log(\`   Carpetas totales: \${this.root.getFolderCount()}\`);
    console.log(\`   Tamaño total: \${this.root.getSize()} KB\`);
  }
  
  searchFile(name) {
    console.log(\`\\n🔍 Buscando archivo: \${name}\`);
    const found = this.root.findByName(name);
    if (found) {
      console.log(\`   ✅ Encontrado: \${found.name} (\${found.getSize()} KB)\`);
    } else {
      console.log(\`   ❌ No encontrado: \${name}\`);
    }
  }
}

// Uso del patrón Composite
console.log('=== Sistema de Archivos con Patrón Composite ===\\n');

const fileManager = new FileManager();
fileManager.createStructure();

console.log('\\n🌳 Estructura completa:');
fileManager.root.display();

fileManager.showStatistics();
fileManager.searchFile('app.js');
fileManager.searchFile('missing.txt');

console.log('\\n🎯 El patrón Composite permite tratar archivos y carpetas uniformemente!');`,
      php: `<?php
// Componente base - interfaz común para objetos simples y compuestos
abstract class FileSystemComponent {
    protected $name;
    
    public function __construct(string $name) {
        $this->name = $name;
    }
    
    // Operaciones que deben implementar tanto archivos como carpetas
    abstract public function getSize(): int;
    abstract public function display(int $indent = 0): void;
    
    // Operaciones para manejo de estructura de árbol
    public function add(FileSystemComponent $component): void {
        throw new Exception('add not supported');
    }
    
    public function remove(FileSystemComponent $component): void {
        throw new Exception('remove not supported');
    }
    
    public function getChild(int $index): FileSystemComponent {
        throw new Exception('getChild not supported');
    }
    
    public function getName(): string {
        return $this->name;
    }
}

// Hoja - representa objetos finales del árbol
class File extends FileSystemComponent {
    private $size;
    
    public function __construct(string $name, int $size) {
        parent::__construct($name);
        $this->size = $size;
    }
    
    public function getSize(): int {
        return $this->size;
    }
    
    public function display(int $indent = 0): void {
        $spaces = str_repeat('  ', $indent);
        echo "{$spaces}📄 {$this->name} ({$this->size} KB)\\n";
    }
}

// Compuesto - puede contener otros componentes
class Folder extends FileSystemComponent {
    private $children = [];
    
    public function add(FileSystemComponent $component): void {
        $this->children[] = $component;
        echo "➕ Agregado {$component->getName()} a la carpeta {$this->name}\\n";
    }
    
    public function remove(FileSystemComponent $component): void {
        $index = array_search($component, $this->children);
        if ($index !== false) {
            unset($this->children[$index]);
            $this->children = array_values($this->children); // Re-indexar
            echo "➖ Eliminado {$component->getName()} de la carpeta {$this->name}\\n";
        }
    }
    
    public function getChild(int $index): FileSystemComponent {
        if (isset($this->children[$index])) {
            return $this->children[$index];
        }
        throw new Exception("Child at index $index not found");
    }
    
    public function getSize(): int {
        // El tamaño de una carpeta es la suma de todos sus contenidos
        $total = 0;
        foreach ($this->children as $child) {
            $total += $child->getSize();
        }
        return $total;
    }
    
    public function display(int $indent = 0): void {
        $spaces = str_repeat('  ', $indent);
        echo "{$spaces}📁 {$this->name}/ ({$this->getSize()} KB total)\\n";
        
        // Mostrar todos los elementos hijos
        foreach ($this->children as $child) {
            $child->display($indent + 1);
        }
    }
    
    // Métodos adicionales específicos para carpetas
    public function getFileCount(): int {
        $count = 0;
        foreach ($this->children as $child) {
            if ($child instanceof File) {
                $count++;
            } elseif ($child instanceof Folder) {
                $count += $child->getFileCount();
            }
        }
        return $count;
    }
    
    public function getFolderCount(): int {
        $count = 0;
        foreach ($this->children as $child) {
            if ($child instanceof Folder) {
                $count += 1 + $child->getFolderCount();
            }
        }
        return $count;
    }
    
    public function findByName(string $name): ?FileSystemComponent {
        // Buscar en la carpeta actual
        foreach ($this->children as $child) {
            if ($child->getName() === $name) {
                return $child;
            }
            
            // Si es una carpeta, buscar recursivamente
            if ($child instanceof Folder) {
                $found = $child->findByName($name);
                if ($found !== null) {
                    return $found;
                }
            }
        }
        return null;
    }
}

// Cliente que usa el patrón Composite
class FileManager {
    private $root;
    
    public function __construct() {
        $this->root = new Folder('Sistema');
    }
    
    public function createStructure(): void {
        echo "🏗️  Creando estructura de archivos...\\n\\n";
        
        // Crear archivos
        $readme = new File('README.md', 2);
        $config = new File('config.json', 1);
        $mainJs = new File('main.js', 15);
        $stylesCss = new File('styles.css', 8);
        $indexHtml = new File('index.html', 5);
        $appJs = new File('app.js', 25);
        $utilsJs = new File('utils.js', 12);
        $testJs = new File('test.js', 18);
        
        // Crear carpetas
        $srcFolder = new Folder('src');
        $publicFolder = new Folder('public');
        $testsFolder = new Folder('tests');
        $assetsFolder = new Folder('assets');
        $imagesFolder = new Folder('images');
        
        // Construir estructura
        $this->root->add($readme);
        $this->root->add($config);
        $this->root->add($srcFolder);
        $this->root->add($publicFolder);
        $this->root->add($testsFolder);
        
        $srcFolder->add($mainJs);
        $srcFolder->add($appJs);
        $srcFolder->add($utilsJs);
        
        $publicFolder->add($indexHtml);
        $publicFolder->add($stylesCss);
        $publicFolder->add($assetsFolder);
        
        $assetsFolder->add($imagesFolder);
        $imagesFolder->add(new File('logo.png', 45));
        $imagesFolder->add(new File('background.jpg', 120));
        
        $testsFolder->add($testJs);
    }
    
    public function showStatistics(): void {
        echo "\\n📊 Estadísticas del sistema:\\n";
        echo "   Archivos totales: {$this->root->getFileCount()}\\n";
        echo "   Carpetas totales: {$this->root->getFolderCount()}\\n";
        echo "   Tamaño total: {$this->root->getSize()} KB\\n";
    }
    
    public function searchFile(string $name): void {
        echo "\\n🔍 Buscando archivo: $name\\n";
        $found = $this->root->findByName($name);
        if ($found !== null) {
            echo "   ✅ Encontrado: {$found->getName()} ({$found->getSize()} KB)\\n";
        } else {
            echo "   ❌ No encontrado: $name\\n";
        }
    }
    
    public function getRoot(): Folder {
        return $this->root;
    }
}

// Uso del patrón Composite
echo "=== Sistema de Archivos con Patrón Composite ===\\n\\n";

$fileManager = new FileManager();
$fileManager->createStructure();

echo "\\n🌳 Estructura completa:\\n";
$fileManager->getRoot()->display();

$fileManager->showStatistics();
$fileManager->searchFile('app.js');
$fileManager->searchFile('missing.txt');

echo "\\n🎯 El patrón Composite permite tratar archivos y carpetas uniformemente!\\n";
?>`
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
    content: "El patrón Decorator es como vestir a una persona: puedes agregar capas de ropa (funcionalidades) sin cambiar a la persona en sí. Cada prenda añade una función específica: abrigo, protección, estilo.\n\nEste patrón te permite añadir comportamientos a objetos de forma dinámica sin alterar su estructura.\n\n**¿Cuándo usarlo?**\n• Cuando quieres añadir responsabilidades a objetos de forma dinámica y transparente\n• Cuando la extensión por herencia es impracticable (muchas combinaciones posibles)\n• Cuando quieres añadir o quitar responsabilidades de un objeto dinámicamente\n• Cuando las responsabilidades opcionales requieren muchas subclases\n\n**Ventajas:**\n• Más flexibilidad que la herencia estática\n• Evita clases con muchas características en los niveles superiores de la jerarquía\n• Puedes añadir o quitar responsabilidades en tiempo de ejecución\n• Puedes combinar varios comportamientos envolviendo un objeto en múltiples decoradores\n\n**Desventajas:**\n• Los decoradores y sus componentes no son idénticos\n• Muchos objetos pequeños que pueden ser difíciles de debuggear\n• Es difícil remover un decorador específico de la pila de decoradores",
    examples: {
      javascript: `// Componente base - interfaz común
class Coffee {
  cost() {
    throw new Error('cost method must be implemented');
  }
  
  description() {
    throw new Error('description method must be implemented');
  }
}

// Componente concreto - implementación base
class SimpleCoffee extends Coffee {
  cost() {
    return 2.0;
  }
  
  description() {
    return 'Café simple';
  }
}

// Decorador base - mantiene una referencia al componente
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost();
  }
  
  description() {
    return this.coffee.description();
  }
}

// Decoradores concretos - añaden funcionalidades específicas
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  cost() {
    return this.coffee.cost() + 0.5;
  }
  
  description() {
    return this.coffee.description() + ', Leche';
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  cost() {
    return this.coffee.cost() + 0.2;
  }
  
  description() {
    return this.coffee.description() + ', Azúcar';
  }
}

class WhipCreamDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  cost() {
    return this.coffee.cost() + 0.7;
  }
  
  description() {
    return this.coffee.description() + ', Crema batida';
  }
}

class VanillaDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  cost() {
    return this.coffee.cost() + 0.6;
  }
  
  description() {
    return this.coffee.description() + ', Vainilla';
  }
}

class ExtraShotDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  cost() {
    return this.coffee.cost() + 1.2;
  }
  
  description() {
    return this.coffee.description() + ', Shot extra';
  }
}

// Sistema de pedidos que usa decoradores
class CoffeeShop {
  constructor() {
    this.orders = [];
  }
  
  createOrder(customerName) {
    return new Order(customerName, this);
  }
  
  addOrder(order) {
    this.orders.push(order);
    console.log(\`📝 Pedido agregado para \${order.customerName}\`);
  }
  
  showTotalSales() {
    const total = this.orders.reduce((sum, order) => sum + order.coffee.cost(), 0);
    console.log(\`💰 Ventas totales: $\${total.toFixed(2)}\`);
  }
}

class Order {
  constructor(customerName, shop) {
    this.customerName = customerName;
    this.shop = shop;
    this.coffee = new SimpleCoffee();
  }
  
  addMilk() {
    this.coffee = new MilkDecorator(this.coffee);
    return this;
  }
  
  addSugar() {
    this.coffee = new SugarDecorator(this.coffee);
    return this;
  }
  
  addWhipCream() {
    this.coffee = new WhipCreamDecorator(this.coffee);
    return this;
  }
  
  addVanilla() {
    this.coffee = new VanillaDecorator(this.coffee);
    return this;
  }
  
  addExtraShot() {
    this.coffee = new ExtraShotDecorator(this.coffee);
    return this;
  }
  
  finishOrder() {
    this.shop.addOrder(this);
    console.log(\`☕ \${this.customerName}: \${this.coffee.description()}\`);
    console.log(\`   Precio: $\${this.coffee.cost().toFixed(2)}\`);
    return this;
  }
}

// Uso del patrón Decorator
console.log('=== Cafetería con Patrón Decorator ===\\n');

const coffeeShop = new CoffeeShop();

// Pedidos simples y complejos
console.log('--- Pedidos del día ---');

// Café simple
coffeeShop.createOrder('Ana')
  .finishOrder();

// Café con leche
coffeeShop.createOrder('Carlos')
  .addMilk()
  .finishOrder();

// Café complejo con múltiples decoradores
coffeeShop.createOrder('María')
  .addMilk()
  .addSugar()
  .addWhipCream()
  .addVanilla()
  .finishOrder();

// Café para amante del café fuerte
coffeeShop.createOrder('Diego')
  .addExtraShot()
  .addExtraShot()
  .addSugar()
  .finishOrder();

// Café dulce
coffeeShop.createOrder('Sofia')
  .addMilk()
  .addSugar()
  .addVanilla()
  .addWhipCream()
  .finishOrder();

console.log('\\n--- Resumen ---');
coffeeShop.showTotalSales();

console.log('\\n🎯 Cada decorador añade funcionalidad sin modificar el objeto base!');`,
      php: `<?php
// Componente base - interfaz común
abstract class Coffee {
    abstract public function cost(): float;
    abstract public function description(): string;
}

// Componente concreto - implementación base
class SimpleCoffee extends Coffee {
    public function cost(): float {
        return 2.0;
    }
    
    public function description(): string {
        return 'Café simple';
    }
}

// Decorador base - mantiene una referencia al componente
abstract class CoffeeDecorator extends Coffee {
    protected $coffee;
    
    public function __construct(Coffee $coffee) {
        $this->coffee = $coffee;
    }
    
    public function cost(): float {
        return $this->coffee->cost();
    }
    
    public function description(): string {
        return $this->coffee->description();
    }
}

// Decoradores concretos - añaden funcionalidades específicas
class MilkDecorator extends CoffeeDecorator {
    public function cost(): float {
        return $this->coffee->cost() + 0.5;
    }
    
    public function description(): string {
        return $this->coffee->description() . ', Leche';
    }
}

class SugarDecorator extends CoffeeDecorator {
    public function cost(): float {
        return $this->coffee->cost() + 0.2;
    }
    
    public function description(): string {
        return $this->coffee->description() . ', Azúcar';
    }
}

class WhipCreamDecorator extends CoffeeDecorator {
    public function cost(): float {
        return $this->coffee->cost() + 0.7;
    }
    
    public function description(): string {
        return $this->coffee->description() . ', Crema batida';
    }
}

class VanillaDecorator extends CoffeeDecorator {
    public function cost(): float {
        return $this->coffee->cost() + 0.6;
    }
    
    public function description(): string {
        return $this->coffee->description() . ', Vainilla';
    }
}

class ExtraShotDecorator extends CoffeeDecorator {
    public function cost(): float {
        return $this->coffee->cost() + 1.2;
    }
    
    public function description(): string {
        return $this->coffee->description() . ', Shot extra';
    }
}

// Sistema de pedidos que usa decoradores
class CoffeeShop {
    private $orders = [];
    
    public function createOrder(string $customerName): Order {
        return new Order($customerName, $this);
    }
    
    public function addOrder(Order $order): void {
        $this->orders[] = $order;
        echo "📝 Pedido agregado para {$order->getCustomerName()}\\n";
    }
    
    public function showTotalSales(): void {
        $total = array_reduce($this->orders, function($sum, $order) {
            return $sum + $order->getCoffee()->cost();
        }, 0);
        echo "💰 Ventas totales: $" . number_format($total, 2) . "\\n";
    }
}

class Order {
    private $customerName;
    private $shop;
    private $coffee;
    
    public function __construct(string $customerName, CoffeeShop $shop) {
        $this->customerName = $customerName;
        $this->shop = $shop;
        $this->coffee = new SimpleCoffee();
    }
    
    public function addMilk(): self {
        $this->coffee = new MilkDecorator($this->coffee);
        return $this;
    }
    
    public function addSugar(): self {
        $this->coffee = new SugarDecorator($this->coffee);
        return $this;
    }
    
    public function addWhipCream(): self {
        $this->coffee = new WhipCreamDecorator($this->coffee);
        return $this;
    }
    
    public function addVanilla(): self {
        $this->coffee = new VanillaDecorator($this->coffee);
        return $this;
    }
    
    public function addExtraShot(): self {
        $this->coffee = new ExtraShotDecorator($this->coffee);
        return $this;
    }
    
    public function finishOrder(): self {
        $this->shop->addOrder($this);
        echo "☕ {$this->customerName}: {$this->coffee->description()}\\n";
        echo "   Precio: $" . number_format($this->coffee->cost(), 2) . "\\n";
        return $this;
    }
    
    public function getCustomerName(): string {
        return $this->customerName;
    }
    
    public function getCoffee(): Coffee {
        return $this->coffee;
    }
}

// Uso del patrón Decorator
echo "=== Cafetería con Patrón Decorator ===\\n\\n";

$coffeeShop = new CoffeeShop();

// Pedidos simples y complejos
echo "--- Pedidos del día ---\\n";

// Café simple
$coffeeShop->createOrder('Ana')
    ->finishOrder();

// Café con leche
$coffeeShop->createOrder('Carlos')
    ->addMilk()
    ->finishOrder();

// Café complejo con múltiples decoradores
$coffeeShop->createOrder('María')
    ->addMilk()
    ->addSugar()
    ->addWhipCream()
    ->addVanilla()
    ->finishOrder();

// Café para amante del café fuerte
$coffeeShop->createOrder('Diego')
    ->addExtraShot()
    ->addExtraShot()
    ->addSugar()
    ->finishOrder();

// Café dulce
$coffeeShop->createOrder('Sofia')
    ->addMilk()
    ->addSugar()
    ->addVanilla()
    ->addWhipCream()
    ->finishOrder();

echo "\\n--- Resumen ---\\n";
$coffeeShop->showTotalSales();

echo "\\n🎯 Cada decorador añade funcionalidad sin modificar el objeto base!\\n";
?>`
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
    content: "El patrón Facade es como el mostrador de un restaurante: no necesitas ir a la cocina, hablar con el chef, gestionar inventario o lavar platos. Solo dices lo que quieres al mesero y él coordina todo el trabajo complejo detrás de escenas.\n\nEste patrón proporciona una interfaz simplificada para trabajar con un subsistema complejo.\n\n**¿Cuándo usarlo?**\n• Cuando quieres proporcionar una interfaz simple a un subsistema complejo\n• Cuando hay muchas dependencias entre clientes e implementación de una abstracción\n• Cuando quieres estructurar un subsistema en capas\n• Cuando necesitas desacoplar un subsistema de sus clientes\n\n**Ventajas:**\n• Aísla clientes de los componentes del subsistema\n• Promueve acoplamiento débil entre subsistema y clientes\n• No impide que las aplicaciones usen clases del subsistema si las necesitan\n• Simplifica la interfaz para casos de uso comunes\n\n**Desventajas:**\n• Un facade puede convertirse en un objeto dios acoplado a todas las clases de una aplicación\n• Puede agregar una capa innecesaria de abstracción",
    examples: {
      javascript: `// Subsistemas complejos que maneja el Facade
class VideoConverter {
  convert(filename, format) {
    console.log(\`🎬 Convirtiendo \${filename} a formato \${format}\`);
    return \`\${filename}.\${format}\`;
  }
}

class AudioProcessor {
  extractAudio(filename) {
    console.log(\`🎵 Extrayendo audio de \${filename}\`);
    return \`\${filename}_audio.wav\`;
  }
  
  processAudio(audioFile, effects) {
    console.log(\`🎛️  Procesando \${audioFile} con efectos: \${effects.join(', ')}\`);
    return \`processed_\${audioFile}\`;
  }
}

class FileManager {
  createTempFile(name) {
    console.log(\`📁 Creando archivo temporal: \${name}\`);
    return \`temp_\${name}\`;
  }
  
  deleteFile(filename) {
    console.log(\`🗑️  Eliminando archivo: \${filename}\`);
  }
  
  moveFile(source, destination) {
    console.log(\`📦 Moviendo \${source} a \${destination}\`);
    return destination;
  }
}

class CompressionEngine {
  compress(filename, quality) {
    console.log(\`🗜️  Comprimiendo \${filename} con calidad \${quality}%\`);
    return \`compressed_\${filename}\`;
  }
}

class MetadataExtractor {
  extractMetadata(filename) {
    console.log(\`📊 Extrayendo metadatos de \${filename}\`);
    return {
      duration: '00:03:45',
      resolution: '1920x1080',
      codec: 'H.264',
      size: '45.2 MB'
    };
  }
}

class ThumbnailGenerator {
  generateThumbnail(videoFile, timeStamp) {
    console.log(\`🖼️  Generando miniatura de \${videoFile} en \${timeStamp}\`);
    return \`\${videoFile}_thumb.jpg\`;
  }
}

// Facade - interfaz simplificada para el complejo subsistema multimedia
class MultimediaFacade {
  constructor() {
    this.videoConverter = new VideoConverter();
    this.audioProcessor = new AudioProcessor();
    this.fileManager = new FileManager();
    this.compression = new CompressionEngine();
    this.metadata = new MetadataExtractor();
    this.thumbnails = new ThumbnailGenerator();
  }
  
  // Operación simplificada para convertir video completo
  convertVideo(inputFile, outputFormat, options = {}) {
    console.log(\`\\n🚀 Iniciando conversión completa de \${inputFile}\`);
    
    try {
      // 1. Extraer metadatos
      const metadata = this.metadata.extractMetadata(inputFile);
      console.log(\`   Duración: \${metadata.duration}, Resolución: \${metadata.resolution}\`);
      
      // 2. Crear archivo temporal
      const tempFile = this.fileManager.createTempFile(inputFile);
      
      // 3. Convertir video
      const convertedFile = this.videoConverter.convert(tempFile, outputFormat);
      
      // 4. Comprimir si se solicita
      let finalFile = convertedFile;
      if (options.compress) {
        finalFile = this.compression.compress(convertedFile, options.quality || 85);
      }
      
      // 5. Generar miniatura
      if (options.generateThumbnail) {
        this.thumbnails.generateThumbnail(finalFile, '00:01:30');
      }
      
      // 6. Mover a destino final
      const outputFile = \`output/\${finalFile}\`;
      this.fileManager.moveFile(finalFile, outputFile);
      
      // 7. Limpiar archivos temporales
      this.fileManager.deleteFile(tempFile);
      if (finalFile !== convertedFile) {
        this.fileManager.deleteFile(convertedFile);
      }
      
      console.log(\`✅ Conversión completada: \${outputFile}\`);
      return outputFile;
      
    } catch (error) {
      console.log(\`❌ Error en conversión: \${error.message}\`);
      throw error;
    }
  }
  
  // Operación simplificada para extraer y procesar audio
  extractAndProcessAudio(videoFile, effects = []) {
    console.log(\`\\n🎵 Procesando audio de \${videoFile}\`);
    
    // 1. Extraer audio del video
    const audioFile = this.audioProcessor.extractAudio(videoFile);
    
    // 2. Procesar con efectos si se especifican
    let processedAudio = audioFile;
    if (effects.length > 0) {
      processedAudio = this.audioProcessor.processAudio(audioFile, effects);
    }
    
    // 3. Comprimir audio
    const compressedAudio = this.compression.compress(processedAudio, 90);
    
    console.log(\`✅ Audio procesado: \${compressedAudio}\`);
    return compressedAudio;
  }
  
  // Operación para crear resumen de video
  createVideoSummary(videoFile) {
    console.log(\`\\n📋 Creando resumen de \${videoFile}\`);
    
    // 1. Obtener metadatos completos
    const metadata = this.metadata.extractMetadata(videoFile);
    
    // 2. Generar múltiples miniaturas
    const thumbnails = [
      this.thumbnails.generateThumbnail(videoFile, '00:00:30'),
      this.thumbnails.generateThumbnail(videoFile, '00:01:30'),
      this.thumbnails.generateThumbnail(videoFile, '00:02:30')
    ];
    
    const summary = {
      file: videoFile,
      metadata: metadata,
      thumbnails: thumbnails,
      summary: 'Resumen automático generado'
    };
    
    console.log(\`✅ Resumen creado para \${videoFile}\`);
    return summary;
  }
}

// Cliente que usa el Facade
class VideoProcessingApp {
  constructor() {
    this.multimedia = new MultimediaFacade();
    this.processedVideos = [];
  }
  
  processVideo(filename, format, options) {
    console.log(\`🎯 Aplicación procesando: \${filename}\`);
    
    try {
      // Sin Facade, el cliente tendría que:
      // - Conocer 6 clases diferentes
      // - Coordinar manualmente 10+ operaciones
      // - Manejar el orden correcto de operaciones
      // - Gestionar archivos temporales
      // - Manejar errores en cada paso
      
      // Con Facade, es simple:
      const result = this.multimedia.convertVideo(filename, format, options);
      this.processedVideos.push(result);
      
      return result;
    } catch (error) {
      console.log(\`❌ Error en aplicación: \${error.message}\`);
      return null;
    }
  }
  
  showProcessedVideos() {
    console.log(\`\\n📊 Videos procesados: \${this.processedVideos.length}\`);
    this.processedVideos.forEach((video, index) => {
      console.log(\`   \${index + 1}. \${video}\`);
    });
  }
}

// Uso del patrón Facade
console.log('=== Procesador de Video con Patrón Facade ===');

const app = new VideoProcessingApp();

// El cliente solo necesita conocer el Facade, no los 6 subsistemas
app.processVideo('vacation.mp4', 'webm', { 
  compress: true, 
  quality: 85, 
  generateThumbnail: true 
});

app.processVideo('presentation.mov', 'mp4', { 
  compress: false, 
  generateThumbnail: true 
});

// Operaciones adicionales simplificadas
app.multimedia.extractAndProcessAudio('concert.mp4', ['reverb', 'normalize']);
app.multimedia.createVideoSummary('documentary.mp4');

app.showProcessedVideos();

console.log('\\n🎯 El Facade oculta la complejidad de 6 subsistemas diferentes!');`,
      php: `<?php
// Subsistemas complejos que maneja el Facade
class VideoConverter {
    public function convert(string $filename, string $format): string {
        echo "🎬 Convirtiendo $filename a formato $format\\n";
        return "$filename.$format";
    }
}

class AudioProcessor {
    public function extractAudio(string $filename): string {
        echo "🎵 Extrayendo audio de $filename\\n";
        return "{$filename}_audio.wav";
    }
    
    public function processAudio(string $audioFile, array $effects): string {
        $effectsList = implode(', ', $effects);
        echo "🎛️  Procesando $audioFile con efectos: $effectsList\\n";
        return "processed_$audioFile";
    }
}

class FileManager {
    public function createTempFile(string $name): string {
        echo "📁 Creando archivo temporal: $name\\n";
        return "temp_$name";
    }
    
    public function deleteFile(string $filename): void {
        echo "🗑️  Eliminando archivo: $filename\\n";
    }
    
    public function moveFile(string $source, string $destination): string {
        echo "📦 Moviendo $source a $destination\\n";
        return $destination;
    }
}

class CompressionEngine {
    public function compress(string $filename, int $quality): string {
        echo "🗜️  Comprimiendo $filename con calidad {$quality}%\\n";
        return "compressed_$filename";
    }
}

class MetadataExtractor {
    public function extractMetadata(string $filename): array {
        echo "📊 Extrayendo metadatos de $filename\\n";
        return [
            'duration' => '00:03:45',
            'resolution' => '1920x1080',
            'codec' => 'H.264',
            'size' => '45.2 MB'
        ];
    }
}

class ThumbnailGenerator {
    public function generateThumbnail(string $videoFile, string $timeStamp): string {
        echo "🖼️  Generando miniatura de $videoFile en $timeStamp\\n";
        return "{$videoFile}_thumb.jpg";
    }
}

// Facade - interfaz simplificada para el complejo subsistema multimedia
class MultimediaFacade {
    private $videoConverter;
    private $audioProcessor;
    private $fileManager;
    private $compression;
    private $metadata;
    private $thumbnails;
    
    public function __construct() {
        $this->videoConverter = new VideoConverter();
        $this->audioProcessor = new AudioProcessor();
        $this->fileManager = new FileManager();
        $this->compression = new CompressionEngine();
        $this->metadata = new MetadataExtractor();
        $this->thumbnails = new ThumbnailGenerator();
    }
    
    // Operación simplificada para convertir video completo
    public function convertVideo(string $inputFile, string $outputFormat, array $options = []): string {
        echo "\\n🚀 Iniciando conversión completa de $inputFile\\n";
        
        try {
            // 1. Extraer metadatos
            $metadata = $this->metadata->extractMetadata($inputFile);
            echo "   Duración: {$metadata['duration']}, Resolución: {$metadata['resolution']}\\n";
            
            // 2. Crear archivo temporal
            $tempFile = $this->fileManager->createTempFile($inputFile);
            
            // 3. Convertir video
            $convertedFile = $this->videoConverter->convert($tempFile, $outputFormat);
            
            // 4. Comprimir si se solicita
            $finalFile = $convertedFile;
            if ($options['compress'] ?? false) {
                $finalFile = $this->compression->compress($convertedFile, $options['quality'] ?? 85);
            }
            
            // 5. Generar miniatura
            if ($options['generateThumbnail'] ?? false) {
                $this->thumbnails->generateThumbnail($finalFile, '00:01:30');
            }
            
            // 6. Mover a destino final
            $outputFile = "output/$finalFile";
            $this->fileManager->moveFile($finalFile, $outputFile);
            
            // 7. Limpiar archivos temporales
            $this->fileManager->deleteFile($tempFile);
            if ($finalFile !== $convertedFile) {
                $this->fileManager->deleteFile($convertedFile);
            }
            
            echo "✅ Conversión completada: $outputFile\\n";
            return $outputFile;
            
        } catch (Exception $error) {
            echo "❌ Error en conversión: {$error->getMessage()}\\n";
            throw $error;
        }
    }
    
    // Operación simplificada para extraer y procesar audio
    public function extractAndProcessAudio(string $videoFile, array $effects = []): string {
        echo "\\n🎵 Procesando audio de $videoFile\\n";
        
        // 1. Extraer audio del video
        $audioFile = $this->audioProcessor->extractAudio($videoFile);
        
        // 2. Procesar con efectos si se especifican
        $processedAudio = $audioFile;
        if (!empty($effects)) {
            $processedAudio = $this->audioProcessor->processAudio($audioFile, $effects);
        }
        
        // 3. Comprimir audio
        $compressedAudio = $this->compression->compress($processedAudio, 90);
        
        echo "✅ Audio procesado: $compressedAudio\\n";
        return $compressedAudio;
    }
    
    // Operación para crear resumen de video
    public function createVideoSummary(string $videoFile): array {
        echo "\\n📋 Creando resumen de $videoFile\\n";
        
        // 1. Obtener metadatos completos
        $metadata = $this->metadata->extractMetadata($videoFile);
        
        // 2. Generar múltiples miniaturas
        $thumbnails = [
            $this->thumbnails->generateThumbnail($videoFile, '00:00:30'),
            $this->thumbnails->generateThumbnail($videoFile, '00:01:30'),
            $this->thumbnails->generateThumbnail($videoFile, '00:02:30')
        ];
        
        $summary = [
            'file' => $videoFile,
            'metadata' => $metadata,
            'thumbnails' => $thumbnails,
            'summary' => 'Resumen automático generado'
        ];
        
        echo "✅ Resumen creado para $videoFile\\n";
        return $summary;
    }
}

// Cliente que usa el Facade
class VideoProcessingApp {
    private $multimedia;
    private $processedVideos = [];
    
    public function __construct() {
        $this->multimedia = new MultimediaFacade();
    }
    
    public function processVideo(string $filename, string $format, array $options): ?string {
        echo "🎯 Aplicación procesando: $filename\\n";
        
        try {
            // Sin Facade, el cliente tendría que:
            // - Conocer 6 clases diferentes
            // - Coordinar manualmente 10+ operaciones
            // - Manejar el orden correcto de operaciones
            // - Gestionar archivos temporales
            // - Manejar errores en cada paso
            
            // Con Facade, es simple:
            $result = $this->multimedia->convertVideo($filename, $format, $options);
            $this->processedVideos[] = $result;
            
            return $result;
        } catch (Exception $error) {
            echo "❌ Error en aplicación: {$error->getMessage()}\\n";
            return null;
        }
    }
    
    public function showProcessedVideos(): void {
        echo "\\n📊 Videos procesados: " . count($this->processedVideos) . "\\n";
        foreach ($this->processedVideos as $index => $video) {
            echo "   " . ($index + 1) . ". $video\\n";
        }
    }
}

// Uso del patrón Facade
echo "=== Procesador de Video con Patrón Facade ===\\n";

$app = new VideoProcessingApp();

// El cliente solo necesita conocer el Facade, no los 6 subsistemas
$app->processVideo('vacation.mp4', 'webm', [
    'compress' => true,
    'quality' => 85,
    'generateThumbnail' => true
]);

$app->processVideo('presentation.mov', 'mp4', [
    'compress' => false,
    'generateThumbnail' => true
]);

// Operaciones adicionales simplificadas
$app->multimedia->extractAndProcessAudio('concert.mp4', ['reverb', 'normalize']);
$app->multimedia->createVideoSummary('documentary.mp4');

$app->showProcessedVideos();

echo "\\n🎯 El Facade oculta la complejidad de 6 subsistemas diferentes!\\n";
?>`
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
    content: "El patrón Flyweight es como compartir libros en una biblioteca: en lugar de que cada persona tenga su propia copia de 'Don Quijote', todos comparten las mismas copias. Solo el marcapáginas (contexto) es personal.\n\nEste patrón minimiza el uso de memoria cuando trabajas con gran cantidad de objetos similares.\n\n**¿Cuándo usarlo?**\n• Cuando una aplicación debe soportar una gran cantidad de objetos\n• Cuando el costo de almacenamiento es alto debido al gran número de objetos\n• Cuando grupos de objetos pueden ser reemplazados por pocos objetos compartidos\n• Cuando la aplicación no depende de la identidad del objeto\n\n**Ventajas:**\n• Puede ahorrar mucha RAM si tienes millones de objetos similares\n• Centraliza el estado que comparten múltiples objetos\n• Reduce el número total de objetos en memoria\n\n**Desventajas:**\n• Puedes estar intercambiando RAM por ciclos de CPU si el contexto cambia frecuentemente\n• El código se vuelve más complicado\n• Solo es útil cuando realmente tienes problemas de memoria",
    examples: {
      javascript: `// Flyweight - estado intrínseco compartido
class TreeType {
  constructor(name, color, sprite) {
    this.name = name;        // Estado intrínseco (compartido)
    this.color = color;      // Estado intrínseco (compartido)
    this.sprite = sprite;    // Estado intrínseco (compartido)
  }
  
  // Operación que recibe contexto extrínseco
  render(canvas, x, y, size) {
    console.log(\`🌳 Renderizando \${this.name} \${this.color} en (\${x}, \${y}) tamaño \${size}\`);
    // Aquí se renderizaría realmente usando this.sprite
    canvas.drawTree(this.sprite, x, y, size, this.color);
  }
  
  getInfo() {
    return \`\${this.name} (\${this.color})\`;
  }
}

// Factory para gestionar Flyweights
class TreeTypeFactory {
  static treeTypes = new Map();
  
  static getTreeType(name, color, sprite) {
    const key = \`\${name}_\${color}_\${sprite}\`;
    
    if (!TreeTypeFactory.treeTypes.has(key)) {
      console.log(\`🏭 Creando nuevo TreeType: \${name} \${color}\`);
      TreeTypeFactory.treeTypes.set(key, new TreeType(name, color, sprite));
    } else {
      console.log(\`♻️  Reutilizando TreeType existente: \${name} \${color}\`);
    }
    
    return TreeTypeFactory.treeTypes.get(key);
  }
  
  static getCreatedTreeTypes() {
    return TreeTypeFactory.treeTypes.size;
  }
  
  static listTreeTypes() {
    console.log('📋 Tipos de árboles creados:');
    TreeTypeFactory.treeTypes.forEach((treeType, key) => {
      console.log(\`   \${key}: \${treeType.getInfo()}\`);
    });
  }
}

// Contexto - contiene el estado extrínseco
class Tree {
  constructor(x, y, size, treeType) {
    this.x = x;              // Estado extrínseco (único por instancia)
    this.y = y;              // Estado extrínseco (único por instancia)
    this.size = size;        // Estado extrínseco (único por instancia)
    this.treeType = treeType; // Referencia al Flyweight
  }
  
  render(canvas) {
    this.treeType.render(canvas, this.x, this.y, this.size);
  }
  
  move(newX, newY) {
    this.x = newX;
    this.y = newY;
    console.log(\`🚶 Árbol movido a (\${newX}, \${newY})\`);
  }
}

// Canvas simple para simular renderizado
class Canvas {
  drawTree(sprite, x, y, size, color) {
    // Simulación de renderizado
    console.log(\`   🎨 Dibujando sprite '\${sprite}' en (\${x}, \${y})\`);
  }
}

// Forest - cliente que gestiona muchos árboles
class Forest {
  constructor() {
    this.trees = [];
    this.canvas = new Canvas();
  }
  
  plantTree(x, y, size, name, color, sprite) {
    // Obtener el flyweight (reutilizado si ya existe)
    const treeType = TreeTypeFactory.getTreeType(name, color, sprite);
    
    // Crear el contexto específico
    const tree = new Tree(x, y, size, treeType);
    this.trees.push(tree);
    
    console.log(\`🌱 Plantado \${name} \${color} en (\${x}, \${y})\`);
  }
  
  render() {
    console.log(\`\\n🎨 Renderizando bosque con \${this.trees.length} árboles...\`);
    this.trees.forEach(tree => tree.render(this.canvas));
  }
  
  getStats() {
    console.log(\`\\n📊 Estadísticas del bosque:\`);
    console.log(\`   Total de árboles: \${this.trees.length}\`);
    console.log(\`   Tipos únicos creados: \${TreeTypeFactory.getCreatedTreeTypes()}\`);
    
    const memoryWithoutFlyweight = this.trees.length * 100; // Estimación
    const memoryWithFlyweight = (this.trees.length * 20) + (TreeTypeFactory.getCreatedTreeTypes() * 80);
    
    console.log(\`   Memoria sin Flyweight: ~\${memoryWithoutFlyweight}KB\`);
    console.log(\`   Memoria con Flyweight: ~\${memoryWithFlyweight}KB\`);
    console.log(\`   Ahorro de memoria: ~\${memoryWithoutFlyweight - memoryWithFlyweight}KB\`);
  }
  
  moveTreesInArea(minX, minY, maxX, maxY, deltaX, deltaY) {
    console.log(\`\\n🌪️  Moviendo árboles en área (\${minX}, \${minY}) a (\${maxX}, \${maxY})\`);
    
    this.trees
      .filter(tree => tree.x >= minX && tree.x <= maxX && tree.y >= minY && tree.y <= maxY)
      .forEach(tree => tree.move(tree.x + deltaX, tree.y + deltaY));
  }
}

// Uso del patrón Flyweight
console.log('=== Simulador de Bosque con Patrón Flyweight ===\\n');

const forest = new Forest();

// Plantar muchos árboles (algunos del mismo tipo)
console.log('--- Plantando árboles ---');

// Robles
forest.plantTree(10, 20, 'grande', 'Roble', 'verde', 'oak_sprite.png');
forest.plantTree(50, 30, 'mediano', 'Roble', 'verde', 'oak_sprite.png');
forest.plantTree(80, 10, 'grande', 'Roble', 'verde', 'oak_sprite.png');

// Pinos
forest.plantTree(30, 40, 'alto', 'Pino', 'verde_oscuro', 'pine_sprite.png');
forest.plantTree(70, 50, 'alto', 'Pino', 'verde_oscuro', 'pine_sprite.png');

// Cerezos en flor
forest.plantTree(40, 60, 'mediano', 'Cerezo', 'rosa', 'cherry_sprite.png');
forest.plantTree(90, 70, 'pequeño', 'Cerezo', 'rosa', 'cherry_sprite.png');

// Más robles (reutilizarán el flyweight existente)
forest.plantTree(15, 80, 'mediano', 'Roble', 'verde', 'oak_sprite.png');
forest.plantTree(55, 90, 'grande', 'Roble', 'verde', 'oak_sprite.png');

// Árboles en otoño (nuevos flyweights)
forest.plantTree(25, 100, 'mediano', 'Roble', 'amarillo', 'oak_sprite.png');
forest.plantTree(65, 110, 'grande', 'Roble', 'rojo', 'oak_sprite.png');

TreeTypeFactory.listTreeTypes();
forest.getStats();

console.log('\\n--- Renderizando bosque ---');
forest.render();

console.log('\\n--- Simulando viento ---');
forest.moveTreesInArea(40, 40, 100, 100, 5, 5);

console.log('\\n🎯 Con Flyweight, 11 árboles solo necesitan 5 tipos únicos en memoria!');`,
      php: `<?php
// Flyweight - estado intrínseco compartido
class TreeType {
    private $name;
    private $color;
    private $sprite;
    
    public function __construct(string $name, string $color, string $sprite) {
        $this->name = $name;     // Estado intrínseco (compartido)
        $this->color = $color;   // Estado intrínseco (compartido)
        $this->sprite = $sprite; // Estado intrínseco (compartido)
    }
    
    // Operación que recibe contexto extrínseco
    public function render(Canvas $canvas, int $x, int $y, string $size): void {
        echo "🌳 Renderizando {$this->name} {$this->color} en ($x, $y) tamaño $size\\n";
        $canvas->drawTree($this->sprite, $x, $y, $size, $this->color);
    }
    
    public function getInfo(): string {
        return "{$this->name} ({$this->color})";
    }
}

// Factory para gestionar Flyweights
class TreeTypeFactory {
    private static $treeTypes = [];
    
    public static function getTreeType(string $name, string $color, string $sprite): TreeType {
        $key = "{$name}_{$color}_{$sprite}";
        
        if (!isset(self::$treeTypes[$key])) {
            echo "🏭 Creando nuevo TreeType: $name $color\\n";
            self::$treeTypes[$key] = new TreeType($name, $color, $sprite);
        } else {
            echo "♻️  Reutilizando TreeType existente: $name $color\\n";
        }
        
        return self::$treeTypes[$key];
    }
    
    public static function getCreatedTreeTypes(): int {
        return count(self::$treeTypes);
    }
    
    public static function listTreeTypes(): void {
        echo "📋 Tipos de árboles creados:\\n";
        foreach (self::$treeTypes as $key => $treeType) {
            echo "   $key: {$treeType->getInfo()}\\n";
        }
    }
}

// Contexto - contiene el estado extrínseco
class Tree {
    private $x;
    private $y;
    private $size;
    private $treeType;
    
    public function __construct(int $x, int $y, string $size, TreeType $treeType) {
        $this->x = $x;              // Estado extrínseco (único por instancia)
        $this->y = $y;              // Estado extrínseco (único por instancia)
        $this->size = $size;        // Estado extrínseco (único por instancia)
        $this->treeType = $treeType; // Referencia al Flyweight
    }
    
    public function render(Canvas $canvas): void {
        $this->treeType->render($canvas, $this->x, $this->y, $this->size);
    }
    
    public function move(int $newX, int $newY): void {
        $this->x = $newX;
        $this->y = $newY;
        echo "🚶 Árbol movido a ($newX, $newY)\\n";
    }
    
    public function getX(): int { return $this->x; }
    public function getY(): int { return $this->y; }
}

// Canvas simple para simular renderizado
class Canvas {
    public function drawTree(string $sprite, int $x, int $y, string $size, string $color): void {
        echo "   🎨 Dibujando sprite '$sprite' en ($x, $y)\\n";
    }
}

// Forest - cliente que gestiona muchos árboles
class Forest {
    private $trees = [];
    private $canvas;
    
    public function __construct() {
        $this->canvas = new Canvas();
    }
    
    public function plantTree(int $x, int $y, string $size, string $name, string $color, string $sprite): void {
        // Obtener el flyweight (reutilizado si ya existe)
        $treeType = TreeTypeFactory::getTreeType($name, $color, $sprite);
        
        // Crear el contexto específico
        $tree = new Tree($x, $y, $size, $treeType);
        $this->trees[] = $tree;
        
        echo "🌱 Plantado $name $color en ($x, $y)\\n";
    }
    
    public function render(): void {
        echo "\\n🎨 Renderizando bosque con " . count($this->trees) . " árboles...\\n";
        foreach ($this->trees as $tree) {
            $tree->render($this->canvas);
        }
    }
    
    public function getStats(): void {
        echo "\\n📊 Estadísticas del bosque:\\n";
        echo "   Total de árboles: " . count($this->trees) . "\\n";
        echo "   Tipos únicos creados: " . TreeTypeFactory::getCreatedTreeTypes() . "\\n";
        
        $memoryWithoutFlyweight = count($this->trees) * 100; // Estimación
        $memoryWithFlyweight = (count($this->trees) * 20) + (TreeTypeFactory::getCreatedTreeTypes() * 80);
        
        echo "   Memoria sin Flyweight: ~{$memoryWithoutFlyweight}KB\\n";
        echo "   Memoria con Flyweight: ~{$memoryWithFlyweight}KB\\n";
        echo "   Ahorro de memoria: ~" . ($memoryWithoutFlyweight - $memoryWithFlyweight) . "KB\\n";
    }
    
    public function moveTreesInArea(int $minX, int $minY, int $maxX, int $maxY, int $deltaX, int $deltaY): void {
        echo "\\n🌪️  Moviendo árboles en área ($minX, $minY) a ($maxX, $maxY)\\n";
        
        foreach ($this->trees as $tree) {
            if ($tree->getX() >= $minX && $tree->getX() <= $maxX && 
                $tree->getY() >= $minY && $tree->getY() <= $maxY) {
                $tree->move($tree->getX() + $deltaX, $tree->getY() + $deltaY);
            }
        }
    }
}

// Uso del patrón Flyweight
echo "=== Simulador de Bosque con Patrón Flyweight ===\\n\\n";

$forest = new Forest();

// Plantar muchos árboles (algunos del mismo tipo)
echo "--- Plantando árboles ---\\n";

// Robles
$forest->plantTree(10, 20, 'grande', 'Roble', 'verde', 'oak_sprite.png');
$forest->plantTree(50, 30, 'mediano', 'Roble', 'verde', 'oak_sprite.png');
$forest->plantTree(80, 10, 'grande', 'Roble', 'verde', 'oak_sprite.png');

// Pinos
$forest->plantTree(30, 40, 'alto', 'Pino', 'verde_oscuro', 'pine_sprite.png');
$forest->plantTree(70, 50, 'alto', 'Pino', 'verde_oscuro', 'pine_sprite.png');

// Cerezos en flor
$forest->plantTree(40, 60, 'mediano', 'Cerezo', 'rosa', 'cherry_sprite.png');
$forest->plantTree(90, 70, 'pequeño', 'Cerezo', 'rosa', 'cherry_sprite.png');

// Más robles (reutilizarán el flyweight existente)
$forest->plantTree(15, 80, 'mediano', 'Roble', 'verde', 'oak_sprite.png');
$forest->plantTree(55, 90, 'grande', 'Roble', 'verde', 'oak_sprite.png');

// Árboles en otoño (nuevos flyweights)
$forest->plantTree(25, 100, 'mediano', 'Roble', 'amarillo', 'oak_sprite.png');
$forest->plantTree(65, 110, 'grande', 'Roble', 'rojo', 'oak_sprite.png');

TreeTypeFactory::listTreeTypes();
$forest->getStats();

echo "\\n--- Renderizando bosque ---\\n";
$forest->render();

echo "\\n--- Simulando viento ---\\n";
$forest->moveTreesInArea(40, 40, 100, 100, 5, 5);

echo "\\n🎯 Con Flyweight, 11 árboles solo necesitan 5 tipos únicos en memoria!\\n";
?>`
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