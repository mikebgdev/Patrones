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
    content: "El patrón Proxy es como un guardia de seguridad en un edificio: controla quien puede acceder a recursos específicos, puede hacer verificaciones adicionales, y puede realizar tareas de mantenimiento sin que el cliente se entere.\n\nEste patrón proporciona un sustituto que controla el acceso al objeto real.\n\n**¿Cuándo usarlo?**\n• Cuando quieres controlar el acceso a un objeto (proxy de protección)\n• Cuando quieres crear objetos costosos bajo demanda (proxy virtual)\n• Cuando necesitas una referencia local a un objeto remoto (proxy remoto)\n• Cuando quieres añadir funcionalidad adicional al acceder a un objeto (proxy inteligente)\n\n**Ventajas:**\n• Controla el acceso al objeto real\n• Puede implementar lazy loading para objetos costosos\n• Puede añadir funcionalidad sin cambiar el objeto real\n• Principio Abierto/Cerrado: puedes introducir nuevos proxies sin cambiar código existente\n\n**Desventajas:**\n• El código puede volverse más complicado\n• La respuesta del servicio puede retrasarse",
    examples: {
      javascript: `// Interfaz común para el servicio real y el proxy
class ImageService {
  display() {
    throw new Error('display method must be implemented');
  }
  
  getInfo() {
    throw new Error('getInfo method must be implemented');
  }
}

// Servicio real - operación costosa de cargar imagen
class RealImageService extends ImageService {
  constructor(filename) {
    super();
    this.filename = filename;
    this.loadFromDisk();
  }
  
  loadFromDisk() {
    console.log(\`💿 Cargando imagen desde disco: \${this.filename}\`);
    // Simular operación costosa
    console.log(\`   📊 Procesando imagen de alta resolución...\`);
    console.log(\`   🎨 Aplicando filtros y optimizaciones...\`);
    console.log(\`   ✅ Imagen \${this.filename} cargada en memoria\`);
  }
  
  display() {
    console.log(\`🖼️  Mostrando imagen: \${this.filename}\`);
  }
  
  getInfo() {
    return {
      filename: this.filename,
      size: '2.5MB',
      resolution: '4K',
      format: 'PNG'
    };
  }
}

// Proxy Virtual - lazy loading y cache
class ImageProxy extends ImageService {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImageService = null;
    this.accessCount = 0;
  }
  
  display() {
    this.accessCount++;
    console.log(\`🔍 Proxy: Acceso #\${this.accessCount} a \${this.filename}\`);
    
    // Lazy loading - crear el objeto real solo cuando se necesita
    if (!this.realImageService) {
      console.log(\`⚡ Proxy: Creando instancia real por primera vez\`);
      this.realImageService = new RealImageService(this.filename);
    } else {
      console.log(\`♻️  Proxy: Reutilizando instancia cargada\`);
    }
    
    return this.realImageService.display();
  }
  
  getInfo() {
    // Información básica sin cargar la imagen
    if (!this.realImageService) {
      return {
        filename: this.filename,
        status: 'No cargada',
        accessCount: this.accessCount
      };
    }
    
    return {
      ...this.realImageService.getInfo(),
      accessCount: this.accessCount,
      status: 'Cargada'
    };
  }
}

// Proxy de Protección - control de acceso
class ProtectedImageProxy extends ImageService {
  constructor(filename, userRole) {
    super();
    this.filename = filename;
    this.userRole = userRole;
    this.realImageService = null;
    this.accessLog = [];
  }
  
  checkAccess() {
    const allowedRoles = ['admin', 'editor', 'viewer'];
    const isAuthorized = allowedRoles.includes(this.userRole);
    
    this.accessLog.push({
      timestamp: new Date().toISOString(),
      role: this.userRole,
      authorized: isAuthorized,
      action: 'display'
    });
    
    return isAuthorized;
  }
  
  display() {
    console.log(\`🛡️  ProtectedProxy: Verificando acceso para rol '\${this.userRole}'\`);
    
    if (!this.checkAccess()) {
      console.log(\`❌ Acceso denegado: rol '\${this.userRole}' no autorizado\`);
      throw new Error('Acceso denegado');
    }
    
    console.log(\`✅ Acceso autorizado para rol '\${this.userRole}'\`);
    
    if (!this.realImageService) {
      this.realImageService = new RealImageService(this.filename);
    }
    
    return this.realImageService.display();
  }
  
  getInfo() {
    return {
      filename: this.filename,
      userRole: this.userRole,
      accessLog: this.accessLog
    };
  }
}

// Proxy Inteligente - funcionalidad adicional
class SmartImageProxy extends ImageService {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImageService = null;
    this.statistics = {
      accessCount: 0,
      lastAccessed: null,
      totalDisplayTime: 0
    };
  }
  
  display() {
    const startTime = Date.now();
    this.statistics.accessCount++;
    this.statistics.lastAccessed = new Date().toISOString();
    
    console.log(\`🧠 SmartProxy: Recopilando estadísticas de uso\`);
    
    if (!this.realImageService) {
      this.realImageService = new RealImageService(this.filename);
    }
    
    const result = this.realImageService.display();
    
    const displayTime = Date.now() - startTime;
    this.statistics.totalDisplayTime += displayTime;
    
    console.log(\`📈 SmartProxy: Tiempo de display: \${displayTime}ms\`);
    console.log(\`📊 SmartProxy: Total accesos: \${this.statistics.accessCount}\`);
    
    return result;
  }
  
  getInfo() {
    const baseInfo = this.realImageService ? this.realImageService.getInfo() : {};
    
    return {
      ...baseInfo,
      statistics: this.statistics,
      averageDisplayTime: this.statistics.accessCount > 0 
        ? this.statistics.totalDisplayTime / this.statistics.accessCount 
        : 0
    };
  }
}

// Cliente que usa diferentes tipos de proxies
class ImageViewer {
  constructor() {
    this.images = [];
  }
  
  addImage(imageService) {
    this.images.push(imageService);
  }
  
  showAllImages() {
    console.log(\`\\n🖼️  Mostrando galería con \${this.images.length} imágenes:\`);
    
    this.images.forEach((image, index) => {
      console.log(\`\\n--- Imagen \${index + 1}: \${image.filename} ---\`);
      try {
        image.display();
      } catch (error) {
        console.log(\`❌ Error: \${error.message}\`);
      }
    });
  }
  
  showImageInfo() {
    console.log(\`\\n📋 Información de imágenes:\`);
    this.images.forEach((image, index) => {
      console.log(\`\\n\${index + 1}. \${image.filename}:\`);
      console.log(JSON.stringify(image.getInfo(), null, 2));
    });
  }
}

// Uso del patrón Proxy
console.log('=== Visor de Imágenes con Patrón Proxy ===\\n');

const viewer = new ImageViewer();

// Diferentes tipos de proxies
console.log('--- Agregando imágenes con diferentes proxies ---');

// Proxy Virtual (lazy loading)
const lazyImage = new ImageProxy('vacation-photo.png');
viewer.addImage(lazyImage);

// Proxy de Protección 
const protectedImage = new ProtectedImageProxy('confidential-document.png', 'admin');
const unauthorizedImage = new ProtectedImageProxy('secret-file.png', 'guest');
viewer.addImage(protectedImage);
viewer.addImage(unauthorizedImage);

// Proxy Inteligente
const smartImage = new SmartImageProxy('analytics-chart.png');
viewer.addImage(smartImage);

// Mostrar información antes de cargar
console.log('\\n--- Información antes de cargar ---');
viewer.showImageInfo();

// Mostrar imágenes (trigger lazy loading)
viewer.showAllImages();

// Acceder nuevamente para ver caching y estadísticas
console.log('\\n--- Segundo acceso (testing cache y estadísticas) ---');
viewer.showAllImages();

// Información final
console.log('\\n--- Información final ---');
viewer.showImageInfo();

console.log('\\n🎯 Los proxies controlan acceso, implementan lazy loading y añaden funcionalidad!');`,
      php: `<?php
// Interfaz común para el servicio real y el proxy
interface ImageService {
    public function display(): void;
    public function getInfo(): array;
}

// Servicio real - operación costosa de cargar imagen
class RealImageService implements ImageService {
    private $filename;
    
    public function __construct(string $filename) {
        $this->filename = $filename;
        $this->loadFromDisk();
    }
    
    private function loadFromDisk(): void {
        echo "💿 Cargando imagen desde disco: {$this->filename}\\n";
        echo "   📊 Procesando imagen de alta resolución...\\n";
        echo "   🎨 Aplicando filtros y optimizaciones...\\n";
        echo "   ✅ Imagen {$this->filename} cargada en memoria\\n";
    }
    
    public function display(): void {
        echo "🖼️  Mostrando imagen: {$this->filename}\\n";
    }
    
    public function getInfo(): array {
        return [
            'filename' => $this->filename,
            'size' => '2.5MB',
            'resolution' => '4K',
            'format' => 'PNG'
        ];
    }
}

// Proxy Virtual - lazy loading y cache
class ImageProxy implements ImageService {
    private $filename;
    private $realImageService;
    private $accessCount = 0;
    
    public function __construct(string $filename) {
        $this->filename = $filename;
        $this->realImageService = null;
    }
    
    public function display(): void {
        $this->accessCount++;
        echo "🔍 Proxy: Acceso #{$this->accessCount} a {$this->filename}\\n";
        
        // Lazy loading - crear el objeto real solo cuando se necesita
        if ($this->realImageService === null) {
            echo "⚡ Proxy: Creando instancia real por primera vez\\n";
            $this->realImageService = new RealImageService($this->filename);
        } else {
            echo "♻️  Proxy: Reutilizando instancia cargada\\n";
        }
        
        $this->realImageService->display();
    }
    
    public function getInfo(): array {
        // Información básica sin cargar la imagen
        if ($this->realImageService === null) {
            return [
                'filename' => $this->filename,
                'status' => 'No cargada',
                'accessCount' => $this->accessCount
            ];
        }
        
        return array_merge(
            $this->realImageService->getInfo(),
            [
                'accessCount' => $this->accessCount,
                'status' => 'Cargada'
            ]
        );
    }
}

// Proxy de Protección - control de acceso
class ProtectedImageProxy implements ImageService {
    private $filename;
    private $userRole;
    private $realImageService;
    private $accessLog = [];
    
    public function __construct(string $filename, string $userRole) {
        $this->filename = $filename;
        $this->userRole = $userRole;
        $this->realImageService = null;
    }
    
    private function checkAccess(): bool {
        $allowedRoles = ['admin', 'editor', 'viewer'];
        $isAuthorized = in_array($this->userRole, $allowedRoles);
        
        $this->accessLog[] = [
            'timestamp' => date('c'),
            'role' => $this->userRole,
            'authorized' => $isAuthorized,
            'action' => 'display'
        ];
        
        return $isAuthorized;
    }
    
    public function display(): void {
        echo "🛡️  ProtectedProxy: Verificando acceso para rol '{$this->userRole}'\\n";
        
        if (!$this->checkAccess()) {
            echo "❌ Acceso denegado: rol '{$this->userRole}' no autorizado\\n";
            throw new Exception('Acceso denegado');
        }
        
        echo "✅ Acceso autorizado para rol '{$this->userRole}'\\n";
        
        if ($this->realImageService === null) {
            $this->realImageService = new RealImageService($this->filename);
        }
        
        $this->realImageService->display();
    }
    
    public function getInfo(): array {
        return [
            'filename' => $this->filename,
            'userRole' => $this->userRole,
            'accessLog' => $this->accessLog
        ];
    }
}

// Proxy Inteligente - funcionalidad adicional
class SmartImageProxy implements ImageService {
    private $filename;
    private $realImageService;
    private $statistics;
    
    public function __construct(string $filename) {
        $this->filename = $filename;
        $this->realImageService = null;
        $this->statistics = [
            'accessCount' => 0,
            'lastAccessed' => null,
            'totalDisplayTime' => 0
        ];
    }
    
    public function display(): void {
        $startTime = microtime(true);
        $this->statistics['accessCount']++;
        $this->statistics['lastAccessed'] = date('c');
        
        echo "🧠 SmartProxy: Recopilando estadísticas de uso\\n";
        
        if ($this->realImageService === null) {
            $this->realImageService = new RealImageService($this->filename);
        }
        
        $this->realImageService->display();
        
        $displayTime = (microtime(true) - $startTime) * 1000;
        $this->statistics['totalDisplayTime'] += $displayTime;
        
        echo "📈 SmartProxy: Tiempo de display: " . round($displayTime, 2) . "ms\\n";
        echo "📊 SmartProxy: Total accesos: {$this->statistics['accessCount']}\\n";
    }
    
    public function getInfo(): array {
        $baseInfo = $this->realImageService ? $this->realImageService->getInfo() : [];
        
        $averageDisplayTime = $this->statistics['accessCount'] > 0 
            ? $this->statistics['totalDisplayTime'] / $this->statistics['accessCount'] 
            : 0;
        
        return array_merge($baseInfo, [
            'statistics' => $this->statistics,
            'averageDisplayTime' => round($averageDisplayTime, 2)
        ]);
    }
}

// Cliente que usa diferentes tipos de proxies
class ImageViewer {
    private $images = [];
    
    public function addImage(ImageService $imageService): void {
        $this->images[] = $imageService;
    }
    
    public function showAllImages(): void {
        echo "\\n🖼️  Mostrando galería con " . count($this->images) . " imágenes:\\n";
        
        foreach ($this->images as $index => $image) {
            echo "\\n--- Imagen " . ($index + 1) . " ---\\n";
            try {
                $image->display();
            } catch (Exception $error) {
                echo "❌ Error: {$error->getMessage()}\\n";
            }
        }
    }
    
    public function showImageInfo(): void {
        echo "\\n📋 Información de imágenes:\\n";
        foreach ($this->images as $index => $image) {
            echo "\\n" . ($index + 1) . ".\\n";
            print_r($image->getInfo());
        }
    }
}

// Uso del patrón Proxy
echo "=== Visor de Imágenes con Patrón Proxy ===\\n\\n";

$viewer = new ImageViewer();

// Diferentes tipos de proxies
echo "--- Agregando imágenes con diferentes proxies ---\\n";

// Proxy Virtual (lazy loading)
$lazyImage = new ImageProxy('vacation-photo.png');
$viewer->addImage($lazyImage);

// Proxy de Protección 
$protectedImage = new ProtectedImageProxy('confidential-document.png', 'admin');
$unauthorizedImage = new ProtectedImageProxy('secret-file.png', 'guest');
$viewer->addImage($protectedImage);
$viewer->addImage($unauthorizedImage);

// Proxy Inteligente
$smartImage = new SmartImageProxy('analytics-chart.png');
$viewer->addImage($smartImage);

// Mostrar información antes de cargar
echo "\\n--- Información antes de cargar ---\\n";
$viewer->showImageInfo();

// Mostrar imágenes (trigger lazy loading)
$viewer->showAllImages();

// Acceder nuevamente para ver caching y estadísticas
echo "\\n--- Segundo acceso (testing cache y estadísticas) ---\\n";
$viewer->showAllImages();

// Información final
echo "\\n--- Información final ---\\n";
$viewer->showImageInfo();

echo "\\n🎯 Los proxies controlan acceso, implementan lazy loading y añaden funcionalidad!\\n";
?>`
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
    content: "El patrón Chain of Responsibility es como una línea de atención al cliente: cuando llamas con un problema, primero hablas con el operador básico. Si no puede ayudarte, te transfiere al supervisor. Si él tampoco puede, te pasa al especialista, y así sucesivamente hasta que alguien resuelve tu problema.\n\nEste patrón permite pasar solicitudes a través de una cadena de manejadores hasta que uno pueda procesarla.\n\n**¿Cuándo usarlo?**\n• Cuando tu programa debe procesar diferentes tipos de solicitudes de varias maneras\n• Cuando es esencial ejecutar varios manejadores en un orden específico\n• Cuando el conjunto de manejadores y su orden deben cambiar en tiempo de ejecución\n• Cuando quieres desacoplar el emisor de una solicitud de sus receptores\n\n**Ventajas:**\n• Puedes controlar el orden de manejo de solicitudes\n• Principio de responsabilidad única: puedes desacoplar clases que invocan operaciones de clases que realizan operaciones\n• Principio abierto/cerrado: puedes introducir nuevos manejadores sin romper código existente\n• Reduce el acoplamiento entre emisor y receptor\n\n**Desventajas:**\n• Algunas solicitudes pueden no ser manejadas\n• Puede ser difícil observar las características de tiempo de ejecución y depurar la cadena",
    examples: {
      javascript: `// Handler abstracto base
class SupportHandler {
  constructor() {
    this.nextHandler = null;
  }
  
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // Permite encadenamiento fluido
  }
  
  handle(request) {
    if (this.canHandle(request)) {
      return this.processRequest(request);
    }
    
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    
    return null; // No se pudo procesar
  }
  
  canHandle(request) {
    throw new Error('canHandle method must be implemented');
  }
  
  processRequest(request) {
    throw new Error('processRequest method must be implemented');
  }
}

// Manejador de nivel 1 - Soporte básico
class BasicSupportHandler extends SupportHandler {
  canHandle(request) {
    return request.complexity === 'basic' && request.type === 'technical';
  }
  
  processRequest(request) {
    console.log(\`👨‍💻 Soporte Básico: Resolviendo problema técnico básico\`);
    console.log(\`   Problema: \${request.description}\`);
    console.log(\`   Solución: Reinicie la aplicación y actualice su navegador\`);
    
    return {
      status: 'resolved',
      handledBy: 'Basic Support',
      solution: 'Reinicie la aplicación y actualice su navegador',
      timeToResolve: '5 minutos'
    };
  }
}

// Manejador de nivel 2 - Soporte técnico avanzado
class TechnicalSupportHandler extends SupportHandler {
  canHandle(request) {
    return request.complexity === 'intermediate' && request.type === 'technical';
  }
  
  processRequest(request) {
    console.log(\`🔧 Soporte Técnico: Diagnosticando problema avanzado\`);
    console.log(\`   Problema: \${request.description}\`);
    console.log(\`   Ejecutando diagnósticos profundos...\`);
    console.log(\`   Solución: Configuración personalizada aplicada\`);
    
    return {
      status: 'resolved',
      handledBy: 'Technical Support',
      solution: 'Configuración personalizada aplicada',
      timeToResolve: '30 minutos'
    };
  }
}

// Manejador de nivel 3 - Billing
class BillingSupportHandler extends SupportHandler {
  canHandle(request) {
    return request.type === 'billing';
  }
  
  processRequest(request) {
    console.log(\`💳 Soporte de Facturación: Gestionando consulta financiera\`);
    console.log(\`   Problema: \${request.description}\`);
    console.log(\`   Revisando historial de pagos...\`);
    console.log(\`   Solución: Ajuste de facturación procesado\`);
    
    return {
      status: 'resolved',
      handledBy: 'Billing Support',
      solution: 'Ajuste de facturación procesado',
      timeToResolve: '15 minutos'
    };
  }
}

// Manejador de nivel 4 - Especialista senior
class SeniorSpecialistHandler extends SupportHandler {
  canHandle(request) {
    return request.complexity === 'complex';
  }
  
  processRequest(request) {
    console.log(\`🎯 Especialista Senior: Manejando caso complejo\`);
    console.log(\`   Problema: \${request.description}\`);
    console.log(\`   Análisis de arquitectura completa en progreso...\`);
    console.log(\`   Coordinando con equipo de desarrollo...\`);
    console.log(\`   Solución: Parche personalizado desarrollado\`);
    
    return {
      status: 'resolved',
      handledBy: 'Senior Specialist',
      solution: 'Parche personalizado desarrollado',
      timeToResolve: '2 horas'
    };
  }
}

// Manejador final - Manager
class ManagerHandler extends SupportHandler {
  canHandle(request) {
    return true; // El manager puede manejar cualquier solicitud escalada
  }
  
  processRequest(request) {
    console.log(\`👔 Manager: Escalación al nivel ejecutivo\`);
    console.log(\`   Problema: \${request.description}\`);
    console.log(\`   Asignando recursos especiales...\`);
    console.log(\`   Creando plan de acción personalizado\`);
    
    return {
      status: 'escalated',
      handledBy: 'Manager',
      solution: 'Plan de acción personalizado - seguimiento en 24h',
      timeToResolve: '24 horas'
    };
  }
}

// Sistema de tickets de soporte
class SupportTicketSystem {
  constructor() {
    this.setupChain();
    this.ticketCounter = 1;
  }
  
  setupChain() {
    // Configurar la cadena de responsabilidad
    this.basicSupport = new BasicSupportHandler();
    this.technicalSupport = new TechnicalSupportHandler();
    this.billingSupport = new BillingSupportHandler();
    this.seniorSpecialist = new SeniorSpecialistHandler();
    this.manager = new ManagerHandler();
    
    // Enlazar la cadena
    this.basicSupport
      .setNext(this.technicalSupport)
      .setNext(this.billingSupport)
      .setNext(this.seniorSpecialist)
      .setNext(this.manager);
  }
  
  processTicket(request) {
    const ticketId = this.ticketCounter++;
    console.log(\`\\n🎫 Ticket #\${ticketId}: \${request.title}\`);
    console.log(\`   Tipo: \${request.type}, Complejidad: \${request.complexity}\`);
    console.log(\`   Cliente: \${request.customer}\`);
    console.log(\`\\n🔄 Procesando a través de la cadena de soporte...\`);
    
    const result = this.basicSupport.handle(request);
    
    if (result) {
      console.log(\`\\n✅ Ticket #\${ticketId} resuelto por: \${result.handledBy}\`);
      console.log(\`   Estado: \${result.status}\`);
      console.log(\`   Tiempo estimado: \${result.timeToResolve}\`);
      return { ticketId, ...result };
    } else {
      console.log(\`\\n❌ Ticket #\${ticketId} no pudo ser procesado\`);
      return { ticketId, status: 'unresolved', handledBy: 'none' };
    }
  }
  
  getChainStatus() {
    console.log(\`\\n📊 Estado de la cadena de soporte:\`);
    console.log(\`   1. Soporte Básico → Técnico\`);
    console.log(\`   2. Soporte Técnico → Facturación\`);
    console.log(\`   3. Soporte Facturación → Especialista Senior\`);
    console.log(\`   4. Especialista Senior → Manager\`);
    console.log(\`   5. Manager (final)\`);
  }
}

// Uso del patrón Chain of Responsibility
console.log('=== Sistema de Soporte con Chain of Responsibility ===\\n');

const supportSystem = new SupportTicketSystem();
supportSystem.getChainStatus();

// Crear diferentes tipos de solicitudes
const requests = [
  {
    title: 'Aplicación no carga',
    type: 'technical',
    complexity: 'basic',
    customer: 'Juan Pérez',
    description: 'La aplicación web no carga después de la actualización'
  },
  {
    title: 'Error de integración API',
    type: 'technical',
    complexity: 'intermediate',
    customer: 'María González',
    description: 'API devuelve errores 500 en endpoints específicos'
  },
  {
    title: 'Cobro duplicado',
    type: 'billing',
    complexity: 'basic',
    customer: 'Carlos Ruiz',
    description: 'Se realizó un cobro doble en mi tarjeta de crédito'
  },
  {
    title: 'Migración de arquitectura',
    type: 'technical',
    complexity: 'complex',
    customer: 'TechCorp Inc.',
    description: 'Necesitamos migrar 50,000 usuarios a nueva infraestructura'
  },
  {
    title: 'Problema de rendimiento crítico',
    type: 'technical',
    complexity: 'complex',
    customer: 'Enterprise Solutions',
    description: 'Sistema completo funcionando lento, afectando producción'
  }
];

// Procesar todos los tickets
requests.forEach(request => {
  supportSystem.processTicket(request);
});

console.log('\\n🎯 Cada solicitud se maneja por el nivel apropiado automáticamente!');`,
      php: `<?php
// Handler abstracto base
abstract class SupportHandler {
    private $nextHandler = null;
    
    public function setNext(SupportHandler $handler): SupportHandler {
        $this->nextHandler = $handler;
        return $handler; // Permite encadenamiento fluido
    }
    
    public function handle(array $request): ?array {
        if ($this->canHandle($request)) {
            return $this->processRequest($request);
        }
        
        if ($this->nextHandler) {
            return $this->nextHandler->handle($request);
        }
        
        return null; // No se pudo procesar
    }
    
    abstract protected function canHandle(array $request): bool;
    abstract protected function processRequest(array $request): array;
}

// Manejador de nivel 1 - Soporte básico
class BasicSupportHandler extends SupportHandler {
    protected function canHandle(array $request): bool {
        return $request['complexity'] === 'basic' && $request['type'] === 'technical';
    }
    
    protected function processRequest(array $request): array {
        echo "👨‍💻 Soporte Básico: Resolviendo problema técnico básico\\n";
        echo "   Problema: {$request['description']}\\n";
        echo "   Solución: Reinicie la aplicación y actualice su navegador\\n";
        
        return [
            'status' => 'resolved',
            'handledBy' => 'Basic Support',
            'solution' => 'Reinicie la aplicación y actualice su navegador',
            'timeToResolve' => '5 minutos'
        ];
    }
}

// Manejador de nivel 2 - Soporte técnico avanzado
class TechnicalSupportHandler extends SupportHandler {
    protected function canHandle(array $request): bool {
        return $request['complexity'] === 'intermediate' && $request['type'] === 'technical';
    }
    
    protected function processRequest(array $request): array {
        echo "🔧 Soporte Técnico: Diagnosticando problema avanzado\\n";
        echo "   Problema: {$request['description']}\\n";
        echo "   Ejecutando diagnósticos profundos...\\n";
        echo "   Solución: Configuración personalizada aplicada\\n";
        
        return [
            'status' => 'resolved',
            'handledBy' => 'Technical Support',
            'solution' => 'Configuración personalizada aplicada',
            'timeToResolve' => '30 minutos'
        ];
    }
}

// Manejador de nivel 3 - Billing
class BillingSupportHandler extends SupportHandler {
    protected function canHandle(array $request): bool {
        return $request['type'] === 'billing';
    }
    
    protected function processRequest(array $request): array {
        echo "💳 Soporte de Facturación: Gestionando consulta financiera\\n";
        echo "   Problema: {$request['description']}\\n";
        echo "   Revisando historial de pagos...\\n";
        echo "   Solución: Ajuste de facturación procesado\\n";
        
        return [
            'status' => 'resolved',
            'handledBy' => 'Billing Support',
            'solution' => 'Ajuste de facturación procesado',
            'timeToResolve' => '15 minutos'
        ];
    }
}

// Manejador de nivel 4 - Especialista senior
class SeniorSpecialistHandler extends SupportHandler {
    protected function canHandle(array $request): bool {
        return $request['complexity'] === 'complex';
    }
    
    protected function processRequest(array $request): array {
        echo "🎯 Especialista Senior: Manejando caso complejo\\n";
        echo "   Problema: {$request['description']}\\n";
        echo "   Análisis de arquitectura completa en progreso...\\n";
        echo "   Coordinando con equipo de desarrollo...\\n";
        echo "   Solución: Parche personalizado desarrollado\\n";
        
        return [
            'status' => 'resolved',
            'handledBy' => 'Senior Specialist',
            'solution' => 'Parche personalizado desarrollado',
            'timeToResolve' => '2 horas'
        ];
    }
}

// Manejador final - Manager
class ManagerHandler extends SupportHandler {
    protected function canHandle(array $request): bool {
        return true; // El manager puede manejar cualquier solicitud escalada
    }
    
    protected function processRequest(array $request): array {
        echo "👔 Manager: Escalación al nivel ejecutivo\\n";
        echo "   Problema: {$request['description']}\\n";
        echo "   Asignando recursos especiales...\\n";
        echo "   Creando plan de acción personalizado\\n";
        
        return [
            'status' => 'escalated',
            'handledBy' => 'Manager',
            'solution' => 'Plan de acción personalizado - seguimiento en 24h',
            'timeToResolve' => '24 horas'
        ];
    }
}

// Sistema de tickets de soporte
class SupportTicketSystem {
    private $basicSupport;
    private $ticketCounter = 1;
    
    public function __construct() {
        $this->setupChain();
    }
    
    private function setupChain(): void {
        // Configurar la cadena de responsabilidad
        $this->basicSupport = new BasicSupportHandler();
        $technicalSupport = new TechnicalSupportHandler();
        $billingSupport = new BillingSupportHandler();
        $seniorSpecialist = new SeniorSpecialistHandler();
        $manager = new ManagerHandler();
        
        // Enlazar la cadena
        $this->basicSupport
            ->setNext($technicalSupport)
            ->setNext($billingSupport)
            ->setNext($seniorSpecialist)
            ->setNext($manager);
    }
    
    public function processTicket(array $request): array {
        $ticketId = $this->ticketCounter++;
        echo "\\n🎫 Ticket #$ticketId: {$request['title']}\\n";
        echo "   Tipo: {$request['type']}, Complejidad: {$request['complexity']}\\n";
        echo "   Cliente: {$request['customer']}\\n";
        echo "\\n🔄 Procesando a través de la cadena de soporte...\\n";
        
        $result = $this->basicSupport->handle($request);
        
        if ($result) {
            echo "\\n✅ Ticket #$ticketId resuelto por: {$result['handledBy']}\\n";
            echo "   Estado: {$result['status']}\\n";
            echo "   Tiempo estimado: {$result['timeToResolve']}\\n";
            return array_merge(['ticketId' => $ticketId], $result);
        } else {
            echo "\\n❌ Ticket #$ticketId no pudo ser procesado\\n";
            return ['ticketId' => $ticketId, 'status' => 'unresolved', 'handledBy' => 'none'];
        }
    }
    
    public function getChainStatus(): void {
        echo "\\n📊 Estado de la cadena de soporte:\\n";
        echo "   1. Soporte Básico → Técnico\\n";
        echo "   2. Soporte Técnico → Facturación\\n";
        echo "   3. Soporte Facturación → Especialista Senior\\n";
        echo "   4. Especialista Senior → Manager\\n";
        echo "   5. Manager (final)\\n";
    }
}

// Uso del patrón Chain of Responsibility
echo "=== Sistema de Soporte con Chain of Responsibility ===\\n\\n";

$supportSystem = new SupportTicketSystem();
$supportSystem->getChainStatus();

// Crear diferentes tipos de solicitudes
$requests = [
    [
        'title' => 'Aplicación no carga',
        'type' => 'technical',
        'complexity' => 'basic',
        'customer' => 'Juan Pérez',
        'description' => 'La aplicación web no carga después de la actualización'
    ],
    [
        'title' => 'Error de integración API',
        'type' => 'technical',
        'complexity' => 'intermediate',
        'customer' => 'María González',
        'description' => 'API devuelve errores 500 en endpoints específicos'
    ],
    [
        'title' => 'Cobro duplicado',
        'type' => 'billing',
        'complexity' => 'basic',
        'customer' => 'Carlos Ruiz',
        'description' => 'Se realizó un cobro doble en mi tarjeta de crédito'
    ],
    [
        'title' => 'Migración de arquitectura',
        'type' => 'technical',
        'complexity' => 'complex',
        'customer' => 'TechCorp Inc.',
        'description' => 'Necesitamos migrar 50,000 usuarios a nueva infraestructura'
    ],
    [
        'title' => 'Problema de rendimiento crítico',
        'type' => 'technical',
        'complexity' => 'complex',
        'customer' => 'Enterprise Solutions',
        'description' => 'Sistema completo funcionando lento, afectando producción'
    ]
];

// Procesar todos los tickets
foreach ($requests as $request) {
    $supportSystem->processTicket($request);
}

echo "\\n🎯 Cada solicitud se maneja por el nivel apropiado automáticamente!\\n";
?>`
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
    content: "El patrón Command es como usar un control remoto: cada botón es un comando que encapsula una acción específica. Puedes presionar 'play', 'pause', 'cambiar canal' sin saber cómo funciona internamente el televisor. Además, puedes programar secuencias de comandos o deshacer acciones.\n\nEste patrón convierte solicitudes en objetos independientes que contienen toda la información necesaria.\n\n**¿Cuándo usarlo?**\n• Cuando quieres parametrizar objetos con operaciones\n• Cuando quieres poner operaciones en cola, programar su ejecución, o ejecutarlas remotamente\n• Cuando quieres implementar operaciones reversibles (undo/redo)\n• Cuando quieres registrar cambios para poder replicarlos o recuperarse de una caída\n\n**Ventajas:**\n• Desacopla las clases que invocan operaciones de las que realizan estas operaciones\n• Puedes combinar comandos simples para crear otros más complejos\n• Puedes implementar deshacer/rehacer\n• Puedes implementar ejecución diferida de operaciones\n• Principio abierto/cerrado: puedes introducir nuevos comandos sin cambiar código existente\n\n**Desventajas:**\n• El código puede volverse más complejo ya que estás introduciendo una nueva capa entre emisores y receptores",
    examples: {
      javascript: `// Interfaz Command
class Command {
  execute() {
    throw new Error('execute method must be implemented');
  }
  
  undo() {
    throw new Error('undo method must be implemented');
  }
  
  getDescription() {
    return 'Unknown command';
  }
}

// Receiver - Smart Home Device
class SmartLight {
  constructor(location) {
    this.location = location;
    this.isOn = false;
    this.brightness = 50;
    this.previousBrightness = 50;
  }
  
  turnOn() {
    this.isOn = true;
    console.log(\`💡 \${this.location}: Luz encendida (brillo: \${this.brightness}%)\`);
  }
  
  turnOff() {
    this.isOn = false;
    console.log(\`🌙 \${this.location}: Luz apagada\`);
  }
  
  setBrightness(level) {
    this.previousBrightness = this.brightness;
    this.brightness = level;
    if (this.isOn) {
      console.log(\`🔆 \${this.location}: Brillo ajustado a \${level}%\`);
    }
  }
  
  getStatus() {
    return \`\${this.location}: \${this.isOn ? 'ON' : 'OFF'} (\${this.brightness}%)\`;
  }
}

class SmartThermostat {
  constructor() {
    this.temperature = 22;
    this.previousTemperature = 22;
  }
  
  setTemperature(temp) {
    this.previousTemperature = this.temperature;
    this.temperature = temp;
    console.log(\`🌡️  Termostato: Temperatura ajustada a \${temp}°C\`);
  }
  
  getStatus() {
    return \`Termostato: \${this.temperature}°C\`;
  }
}

class SmartSpeaker {
  constructor() {
    this.volume = 50;
    this.previousVolume = 50;
    this.isPlaying = false;
    this.currentSong = '';
    this.previousSong = '';
  }
  
  play(song) {
    this.previousSong = this.currentSong;
    this.currentSong = song;
    this.isPlaying = true;
    console.log(\`🎵 Bocina: Reproduciendo "\${song}" (volumen: \${this.volume}%)\`);
  }
  
  stop() {
    this.isPlaying = false;
    console.log(\`⏹️  Bocina: Música detenida\`);
  }
  
  setVolume(level) {
    this.previousVolume = this.volume;
    this.volume = level;
    console.log(\`🔊 Bocina: Volumen ajustado a \${level}%\`);
  }
  
  getStatus() {
    return \`Bocina: \${this.isPlaying ? \`Playing "\${this.currentSong}"\` : 'Stopped'} (\${this.volume}%)\`;
  }
}

// Comandos concretos
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOn();
  }
  
  undo() {
    this.light.turnOff();
  }
  
  getDescription() {
    return \`Encender luz \${this.light.location}\`;
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOff();
  }
  
  undo() {
    this.light.turnOn();
  }
  
  getDescription() {
    return \`Apagar luz \${this.light.location}\`;
  }
}

class SetBrightnessCommand extends Command {
  constructor(light, brightness) {
    super();
    this.light = light;
    this.brightness = brightness;
  }
  
  execute() {
    this.light.setBrightness(this.brightness);
  }
  
  undo() {
    this.light.setBrightness(this.light.previousBrightness);
  }
  
  getDescription() {
    return \`Ajustar brillo \${this.light.location} a \${this.brightness}%\`;
  }
}

class SetTemperatureCommand extends Command {
  constructor(thermostat, temperature) {
    super();
    this.thermostat = thermostat;
    this.temperature = temperature;
  }
  
  execute() {
    this.thermostat.setTemperature(this.temperature);
  }
  
  undo() {
    this.thermostat.setTemperature(this.thermostat.previousTemperature);
  }
  
  getDescription() {
    return \`Ajustar temperatura a \${this.temperature}°C\`;
  }
}

class PlayMusicCommand extends Command {
  constructor(speaker, song) {
    super();
    this.speaker = speaker;
    this.song = song;
  }
  
  execute() {
    this.speaker.play(this.song);
  }
  
  undo() {
    if (this.speaker.previousSong) {
      this.speaker.play(this.speaker.previousSong);
    } else {
      this.speaker.stop();
    }
  }
  
  getDescription() {
    return \`Reproducir "\${this.song}"\`;
  }
}

// Comando macro - ejecuta múltiples comandos
class MacroCommand extends Command {
  constructor(commands, description) {
    super();
    this.commands = commands;
    this.description = description;
  }
  
  execute() {
    console.log(\`\\n🎬 Ejecutando macro: \${this.description}\`);
    this.commands.forEach(command => command.execute());
  }
  
  undo() {
    console.log(\`\\n↩️  Deshaciendo macro: \${this.description}\`);
    // Deshacer en orden inverso
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }
  
  getDescription() {
    return this.description;
  }
}

// Comando nulo - patrón Null Object
class NoCommand extends Command {
  execute() {
    // No hace nada
  }
  
  undo() {
    // No hace nada
  }
  
  getDescription() {
    return 'No hay comando asignado';
  }
}

// Invoker - Control remoto inteligente
class SmartHomeController {
  constructor() {
    this.commands = {};
    this.history = [];
    this.currentStep = -1;
  }
  
  setCommand(slot, command) {
    this.commands[slot] = command;
    console.log(\`🎛️  Comando asignado al slot \${slot}: \${command.getDescription()}\`);
  }
  
  pressButton(slot) {
    const command = this.commands[slot] || new NoCommand();
    console.log(\`\\n🔘 Presionando botón \${slot}: \${command.getDescription()}\`);
    
    command.execute();
    
    // Guardar en historial para undo/redo
    this.history = this.history.slice(0, this.currentStep + 1);
    this.history.push(command);
    this.currentStep++;
  }
  
  undo() {
    if (this.currentStep >= 0) {
      const command = this.history[this.currentStep];
      console.log(\`\\n↩️  Deshaciendo: \${command.getDescription()}\`);
      command.undo();
      this.currentStep--;
    } else {
      console.log(\`\\n❌ No hay comandos para deshacer\`);
    }
  }
  
  redo() {
    if (this.currentStep < this.history.length - 1) {
      this.currentStep++;
      const command = this.history[this.currentStep];
      console.log(\`\\n↪️  Rehaciendo: \${command.getDescription()}\`);
      command.execute();
    } else {
      console.log(\`\\n❌ No hay comandos para rehacer\`);
    }
  }
  
  showHistory() {
    console.log(\`\\n📜 Historial de comandos:\`);
    this.history.forEach((command, index) => {
      const marker = index === this.currentStep ? '👉' : '  ';
      console.log(\`\${marker} \${index + 1}. \${command.getDescription()}\`);
    });
  }
  
  showCurrentStatus() {
    console.log(\`\\n📊 Estado actual del sistema:\`);
    Object.keys(this.commands).forEach(slot => {
      console.log(\`   Slot \${slot}: \${this.commands[slot].getDescription()}\`);
    });
  }
}

// Uso del patrón Command
console.log('=== Sistema Smart Home con Patrón Command ===\\n');

// Crear dispositivos (receivers)
const livingRoomLight = new SmartLight('Sala');
const bedroomLight = new SmartLight('Dormitorio');
const thermostat = new SmartThermostat();
const speaker = new SmartSpeaker();

// Crear comandos
const livingRoomOn = new LightOnCommand(livingRoomLight);
const livingRoomOff = new LightOffCommand(livingRoomLight);
const bedroomOn = new LightOnCommand(bedroomLight);
const bedroomOff = new LightOffCommand(bedroomLight);
const dimLivingRoom = new SetBrightnessCommand(livingRoomLight, 30);
const setWarmTemp = new SetTemperatureCommand(thermostat, 24);
const setCoolTemp = new SetTemperatureCommand(thermostat, 20);
const playJazz = new PlayMusicCommand(speaker, 'Smooth Jazz Playlist');
const playRock = new PlayMusicCommand(speaker, 'Classic Rock Hits');

// Crear comandos macro
const movieMode = new MacroCommand([
  livingRoomOff,
  bedroomOff,
  dimLivingRoom,
  new LightOnCommand(livingRoomLight),
  setCoolTemp,
  playJazz
], 'Modo Película');

const sleepMode = new MacroCommand([
  livingRoomOff,
  bedroomOff,
  new SetTemperatureCommand(thermostat, 22),
  new PlayMusicCommand(speaker, 'Rain Sounds')
], 'Modo Dormir');

// Configurar control remoto (invoker)
const controller = new SmartHomeController();

// Asignar comandos a botones
controller.setCommand('1', livingRoomOn);
controller.setCommand('2', livingRoomOff);
controller.setCommand('3', bedroomOn);
controller.setCommand('4', bedroomOff);
controller.setCommand('5', setWarmTemp);
controller.setCommand('6', setCoolTemp);
controller.setCommand('7', playJazz);
controller.setCommand('8', playRock);
controller.setCommand('9', movieMode);
controller.setCommand('0', sleepMode);

// Simular uso del sistema
console.log('--- Configuración inicial ---');
controller.showCurrentStatus();

console.log('\\n--- Usando el sistema ---');
controller.pressButton('1'); // Encender sala
controller.pressButton('3'); // Encender dormitorio
controller.pressButton('5'); // Temperatura caliente
controller.pressButton('7'); // Música jazz

console.log('\\n--- Estado de dispositivos ---');
console.log(livingRoomLight.getStatus());
console.log(bedroomLight.getStatus());
console.log(thermostat.getStatus());
console.log(speaker.getStatus());

console.log('\\n--- Probando undo/redo ---');
controller.showHistory();
controller.undo(); // Deshacer música
controller.undo(); // Deshacer temperatura
controller.redo(); // Rehacer temperatura

console.log('\\n--- Activando modo película ---');
controller.pressButton('9'); // Modo película

console.log('\\n--- Deshaciendo modo película ---');
controller.undo();

console.log('\\n🎯 Los comandos encapsulan acciones y permiten undo/redo automático!');`,
      php: `<?php
// Interfaz Command
interface Command {
    public function execute(): void;
    public function undo(): void;
    public function getDescription(): string;
}

// Receiver - Smart Home Device
class SmartLight {
    private $location;
    private $isOn = false;
    private $brightness = 50;
    private $previousBrightness = 50;
    
    public function __construct(string $location) {
        $this->location = $location;
    }
    
    public function turnOn(): void {
        $this->isOn = true;
        echo "💡 {$this->location}: Luz encendida (brillo: {$this->brightness}%)\\n";
    }
    
    public function turnOff(): void {
        $this->isOn = false;
        echo "🌙 {$this->location}: Luz apagada\\n";
    }
    
    public function setBrightness(int $level): void {
        $this->previousBrightness = $this->brightness;
        $this->brightness = $level;
        if ($this->isOn) {
            echo "🔆 {$this->location}: Brillo ajustado a {$level}%\\n";
        }
    }
    
    public function getStatus(): string {
        $status = $this->isOn ? 'ON' : 'OFF';
        return "{$this->location}: $status ({$this->brightness}%)";
    }
    
    public function getLocation(): string { return $this->location; }
    public function getPreviousBrightness(): int { return $this->previousBrightness; }
}

class SmartThermostat {
    private $temperature = 22;
    private $previousTemperature = 22;
    
    public function setTemperature(int $temp): void {
        $this->previousTemperature = $this->temperature;
        $this->temperature = $temp;
        echo "🌡️  Termostato: Temperatura ajustada a {$temp}°C\\n";
    }
    
    public function getStatus(): string {
        return "Termostato: {$this->temperature}°C";
    }
    
    public function getPreviousTemperature(): int { return $this->previousTemperature; }
}

class SmartSpeaker {
    private $volume = 50;
    private $previousVolume = 50;
    private $isPlaying = false;
    private $currentSong = '';
    private $previousSong = '';
    
    public function play(string $song): void {
        $this->previousSong = $this->currentSong;
        $this->currentSong = $song;
        $this->isPlaying = true;
        echo "🎵 Bocina: Reproduciendo \\"$song\\" (volumen: {$this->volume}%)\\n";
    }
    
    public function stop(): void {
        $this->isPlaying = false;
        echo "⏹️  Bocina: Música detenida\\n";
    }
    
    public function setVolume(int $level): void {
        $this->previousVolume = $this->volume;
        $this->volume = $level;
        echo "🔊 Bocina: Volumen ajustado a {$level}%\\n";
    }
    
    public function getStatus(): string {
        if ($this->isPlaying) {
            return "Bocina: Playing \\"{$this->currentSong}\\" ({$this->volume}%)";
        }
        return "Bocina: Stopped ({$this->volume}%)";
    }
    
    public function getPreviousSong(): string { return $this->previousSong; }
}

// Comandos concretos
class LightOnCommand implements Command {
    private $light;
    
    public function __construct(SmartLight $light) {
        $this->light = $light;
    }
    
    public function execute(): void {
        $this->light->turnOn();
    }
    
    public function undo(): void {
        $this->light->turnOff();
    }
    
    public function getDescription(): string {
        return "Encender luz {$this->light->getLocation()}";
    }
}

class LightOffCommand implements Command {
    private $light;
    
    public function __construct(SmartLight $light) {
        $this->light = $light;
    }
    
    public function execute(): void {
        $this->light->turnOff();
    }
    
    public function undo(): void {
        $this->light->turnOn();
    }
    
    public function getDescription(): string {
        return "Apagar luz {$this->light->getLocation()}";
    }
}

class SetBrightnessCommand implements Command {
    private $light;
    private $brightness;
    
    public function __construct(SmartLight $light, int $brightness) {
        $this->light = $light;
        $this->brightness = $brightness;
    }
    
    public function execute(): void {
        $this->light->setBrightness($this->brightness);
    }
    
    public function undo(): void {
        $this->light->setBrightness($this->light->getPreviousBrightness());
    }
    
    public function getDescription(): string {
        return "Ajustar brillo {$this->light->getLocation()} a {$this->brightness}%";
    }
}

class SetTemperatureCommand implements Command {
    private $thermostat;
    private $temperature;
    
    public function __construct(SmartThermostat $thermostat, int $temperature) {
        $this->thermostat = $thermostat;
        $this->temperature = $temperature;
    }
    
    public function execute(): void {
        $this->thermostat->setTemperature($this->temperature);
    }
    
    public function undo(): void {
        $this->thermostat->setTemperature($this->thermostat->getPreviousTemperature());
    }
    
    public function getDescription(): string {
        return "Ajustar temperatura a {$this->temperature}°C";
    }
}

class PlayMusicCommand implements Command {
    private $speaker;
    private $song;
    
    public function __construct(SmartSpeaker $speaker, string $song) {
        $this->speaker = $speaker;
        $this->song = $song;
    }
    
    public function execute(): void {
        $this->speaker->play($this->song);
    }
    
    public function undo(): void {
        if ($this->speaker->getPreviousSong()) {
            $this->speaker->play($this->speaker->getPreviousSong());
        } else {
            $this->speaker->stop();
        }
    }
    
    public function getDescription(): string {
        return "Reproducir \\"{$this->song}\\"";
    }
}

// Comando macro - ejecuta múltiples comandos
class MacroCommand implements Command {
    private $commands;
    private $description;
    
    public function __construct(array $commands, string $description) {
        $this->commands = $commands;
        $this->description = $description;
    }
    
    public function execute(): void {
        echo "\\n🎬 Ejecutando macro: {$this->description}\\n";
        foreach ($this->commands as $command) {
            $command->execute();
        }
    }
    
    public function undo(): void {
        echo "\\n↩️  Deshaciendo macro: {$this->description}\\n";
        // Deshacer en orden inverso
        for ($i = count($this->commands) - 1; $i >= 0; $i--) {
            $this->commands[$i]->undo();
        }
    }
    
    public function getDescription(): string {
        return $this->description;
    }
}

// Comando nulo - patrón Null Object
class NoCommand implements Command {
    public function execute(): void {
        // No hace nada
    }
    
    public function undo(): void {
        // No hace nada
    }
    
    public function getDescription(): string {
        return 'No hay comando asignado';
    }
}

// Invoker - Control remoto inteligente
class SmartHomeController {
    private $commands = [];
    private $history = [];
    private $currentStep = -1;
    
    public function setCommand(string $slot, Command $command): void {
        $this->commands[$slot] = $command;
        echo "🎛️  Comando asignado al slot $slot: {$command->getDescription()}\\n";
    }
    
    public function pressButton(string $slot): void {
        $command = $this->commands[$slot] ?? new NoCommand();
        echo "\\n🔘 Presionando botón $slot: {$command->getDescription()}\\n";
        
        $command->execute();
        
        // Guardar en historial para undo/redo
        $this->history = array_slice($this->history, 0, $this->currentStep + 1);
        $this->history[] = $command;
        $this->currentStep++;
    }
    
    public function undo(): void {
        if ($this->currentStep >= 0) {
            $command = $this->history[$this->currentStep];
            echo "\\n↩️  Deshaciendo: {$command->getDescription()}\\n";
            $command->undo();
            $this->currentStep--;
        } else {
            echo "\\n❌ No hay comandos para deshacer\\n";
        }
    }
    
    public function redo(): void {
        if ($this->currentStep < count($this->history) - 1) {
            $this->currentStep++;
            $command = $this->history[$this->currentStep];
            echo "\\n↪️  Rehaciendo: {$command->getDescription()}\\n";
            $command->execute();
        } else {
            echo "\\n❌ No hay comandos para rehacer\\n";
        }
    }
    
    public function showHistory(): void {
        echo "\\n📜 Historial de comandos:\\n";
        foreach ($this->history as $index => $command) {
            $marker = $index === $this->currentStep ? '👉' : '  ';
            echo "$marker " . ($index + 1) . ". {$command->getDescription()}\\n";
        }
    }
    
    public function showCurrentStatus(): void {
        echo "\\n📊 Estado actual del sistema:\\n";
        foreach ($this->commands as $slot => $command) {
            echo "   Slot $slot: {$command->getDescription()}\\n";
        }
    }
}

// Uso del patrón Command
echo "=== Sistema Smart Home con Patrón Command ===\\n\\n";

// Crear dispositivos (receivers)
$livingRoomLight = new SmartLight('Sala');
$bedroomLight = new SmartLight('Dormitorio');
$thermostat = new SmartThermostat();
$speaker = new SmartSpeaker();

// Crear comandos
$livingRoomOn = new LightOnCommand($livingRoomLight);
$livingRoomOff = new LightOffCommand($livingRoomLight);
$bedroomOn = new LightOnCommand($bedroomLight);
$bedroomOff = new LightOffCommand($bedroomLight);
$dimLivingRoom = new SetBrightnessCommand($livingRoomLight, 30);
$setWarmTemp = new SetTemperatureCommand($thermostat, 24);
$setCoolTemp = new SetTemperatureCommand($thermostat, 20);
$playJazz = new PlayMusicCommand($speaker, 'Smooth Jazz Playlist');
$playRock = new PlayMusicCommand($speaker, 'Classic Rock Hits');

// Crear comandos macro
$movieMode = new MacroCommand([
    $livingRoomOff,
    $bedroomOff,
    $dimLivingRoom,
    new LightOnCommand($livingRoomLight),
    $setCoolTemp,
    $playJazz
], 'Modo Película');

$sleepMode = new MacroCommand([
    $livingRoomOff,
    $bedroomOff,
    new SetTemperatureCommand($thermostat, 22),
    new PlayMusicCommand($speaker, 'Rain Sounds')
], 'Modo Dormir');

// Configurar control remoto (invoker)
$controller = new SmartHomeController();

// Asignar comandos a botones
$controller->setCommand('1', $livingRoomOn);
$controller->setCommand('2', $livingRoomOff);
$controller->setCommand('3', $bedroomOn);
$controller->setCommand('4', $bedroomOff);
$controller->setCommand('5', $setWarmTemp);
$controller->setCommand('6', $setCoolTemp);
$controller->setCommand('7', $playJazz);
$controller->setCommand('8', $playRock);
$controller->setCommand('9', $movieMode);
$controller->setCommand('0', $sleepMode);

// Simular uso del sistema
echo "--- Configuración inicial ---\\n";
$controller->showCurrentStatus();

echo "\\n--- Usando el sistema ---\\n";
$controller->pressButton('1'); // Encender sala
$controller->pressButton('3'); // Encender dormitorio
$controller->pressButton('5'); // Temperatura caliente
$controller->pressButton('7'); // Música jazz

echo "\\n--- Estado de dispositivos ---\\n";
echo $livingRoomLight->getStatus() . "\\n";
echo $bedroomLight->getStatus() . "\\n";
echo $thermostat->getStatus() . "\\n";
echo $speaker->getStatus() . "\\n";

echo "\\n--- Probando undo/redo ---\\n";
$controller->showHistory();
$controller->undo(); // Deshacer música
$controller->undo(); // Deshacer temperatura
$controller->redo(); // Rehacer temperatura

echo "\\n--- Activando modo película ---\\n";
$controller->pressButton('9'); // Modo película

echo "\\n--- Deshaciendo modo película ---\\n";
$controller->undo();

echo "\\n🎯 Los comandos encapsulan acciones y permiten undo/redo automático!\\n";
?>`
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
    content: "El patrón Iterator es como usar un reproductor de música con botones 'siguiente' y 'anterior': puedes recorrer tu playlist sin saber si está almacenada en CD, streaming, o memoria interna. Solo necesitas saber cómo moverte al siguiente elemento.\n\nEste patrón proporciona una forma uniforme de recorrer diferentes tipos de colecciones.\n\n**¿Cuándo usarlo?**\n• Cuando quieres acceder a los contenidos de una colección sin exponer su representación interna\n• Cuando quieres soportar múltiples formas de recorrer la misma colección\n• Cuando quieres proporcionar una interfaz uniforme para recorrer diferentes estructuras de datos\n• Cuando quieres implementar recorridos especializados de estructuras complejas\n\n**Ventajas:**\n• Principio de responsabilidad única: limpia el código cliente y las colecciones extrayendo algoritmos de recorrido\n• Principio abierto/cerrado: puedes implementar nuevos tipos de colecciones e iteradores sin romper código existente\n• Puedes recorrer la misma colección en paralelo porque cada iterador contiene su propio estado\n• Puedes retrasar y continuar una iteración cuando sea necesario\n\n**Desventajas:**\n• Aplicar el patrón puede ser excesivo si tu aplicación solo trabaja con colecciones simples\n• Usar un iterador puede ser menos eficiente que recorrer directamente algunos tipos de colecciones especializadas",
    examples: {
      javascript: `// Interfaz Iterator
class Iterator {
  hasNext() {
    throw new Error('hasNext method must be implemented');
  }
  
  next() {
    throw new Error('next method must be implemented');
  }
  
  reset() {
    throw new Error('reset method must be implemented');
  }
}

// Colección de libros
class Book {
  constructor(title, author, genre, year) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
  }
  
  toString() {
    return \`"\${this.title}" by \${this.author} (\${this.year}) - \${this.genre}\`;
  }
}

// Colección concreta - Biblioteca
class Library {
  constructor() {
    this.books = [];
    this.genres = new Set();
    this.authors = new Set();
  }
  
  addBook(book) {
    this.books.push(book);
    this.genres.add(book.genre);
    this.authors.add(book.author);
    console.log(\`📚 Libro agregado: \${book.title}\`);
  }
  
  getBooks() {
    return this.books;
  }
  
  getGenres() {
    return Array.from(this.genres);
  }
  
  getAuthors() {
    return Array.from(this.authors);
  }
  
  // Factory methods para diferentes iteradores
  createIterator() {
    return new BookIterator(this.books);
  }
  
  createGenreIterator(genre) {
    return new GenreIterator(this.books, genre);
  }
  
  createAuthorIterator(author) {
    return new AuthorIterator(this.books, author);
  }
  
  createReverseIterator() {
    return new ReverseIterator(this.books);
  }
  
  createYearRangeIterator(startYear, endYear) {
    return new YearRangeIterator(this.books, startYear, endYear);
  }
}

// Iterator concreto - Iterador básico de libros
class BookIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.position = 0;
  }
  
  hasNext() {
    return this.position < this.books.length;
  }
  
  next() {
    if (!this.hasNext()) {
      throw new Error('No more books to iterate');
    }
    return this.books[this.position++];
  }
  
  reset() {
    this.position = 0;
  }
  
  current() {
    return this.books[this.position];
  }
}

// Iterator por género
class GenreIterator extends Iterator {
  constructor(books, genre) {
    super();
    this.books = books;
    this.genre = genre;
    this.position = 0;
    this.filteredBooks = books.filter(book => book.genre === genre);
  }
  
  hasNext() {
    return this.position < this.filteredBooks.length;
  }
  
  next() {
    if (!this.hasNext()) {
      throw new Error(\`No more \${this.genre} books to iterate\`);
    }
    return this.filteredBooks[this.position++];
  }
  
  reset() {
    this.position = 0;
  }
}

// Iterator por autor
class AuthorIterator extends Iterator {
  constructor(books, author) {
    super();
    this.books = books;
    this.author = author;
    this.position = 0;
    this.filteredBooks = books.filter(book => book.author === author);
  }
  
  hasNext() {
    return this.position < this.filteredBooks.length;
  }
  
  next() {
    if (!this.hasNext()) {
      throw new Error(\`No more books by \${this.author} to iterate\`);
    }
    return this.filteredBooks[this.position++];
  }
  
  reset() {
    this.position = 0;
  }
}

// Iterator reverso
class ReverseIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.position = books.length - 1;
  }
  
  hasNext() {
    return this.position >= 0;
  }
  
  next() {
    if (!this.hasNext()) {
      throw new Error('No more books to iterate backwards');
    }
    return this.books[this.position--];
  }
  
  reset() {
    this.position = this.books.length - 1;
  }
}

// Iterator por rango de años
class YearRangeIterator extends Iterator {
  constructor(books, startYear, endYear) {
    super();
    this.books = books;
    this.startYear = startYear;
    this.endYear = endYear;
    this.position = 0;
    this.filteredBooks = books.filter(book => 
      book.year >= startYear && book.year <= endYear
    );
  }
  
  hasNext() {
    return this.position < this.filteredBooks.length;
  }
  
  next() {
    if (!this.hasNext()) {
      throw new Error(\`No more books from \${this.startYear}-\${this.endYear} to iterate\`);
    }
    return this.filteredBooks[this.position++];
  }
  
  reset() {
    this.position = 0;
  }
}

// Utilidad para procesar iteradores
class IteratorProcessor {
  static forEach(iterator, callback) {
    iterator.reset();
    while (iterator.hasNext()) {
      callback(iterator.next());
    }
  }
  
  static toArray(iterator) {
    const result = [];
    iterator.reset();
    while (iterator.hasNext()) {
      result.push(iterator.next());
    }
    return result;
  }
  
  static count(iterator) {
    let count = 0;
    iterator.reset();
    while (iterator.hasNext()) {
      iterator.next();
      count++;
    }
    return count;
  }
  
  static find(iterator, predicate) {
    iterator.reset();
    while (iterator.hasNext()) {
      const item = iterator.next();
      if (predicate(item)) {
        return item;
      }
    }
    return null;
  }
}

// Cliente que usa diferentes iteradores
class LibraryManager {
  constructor(library) {
    this.library = library;
  }
  
  showAllBooks() {
    console.log('\\n📚 Todos los libros:');
    const iterator = this.library.createIterator();
    IteratorProcessor.forEach(iterator, (book, index) => {
      console.log(\`   \${index + 1}. \${book}\`);
    });
  }
  
  showBooksByGenre(genre) {
    console.log(\`\\n🎭 Libros de \${genre}:\`);
    const iterator = this.library.createGenreIterator(genre);
    let index = 1;
    IteratorProcessor.forEach(iterator, book => {
      console.log(\`   \${index++}. \${book.title} by \${book.author}\`);
    });
  }
  
  showBooksByAuthor(author) {
    console.log(\`\\n✍️  Libros de \${author}:\`);
    const iterator = this.library.createAuthorIterator(author);
    let index = 1;
    IteratorProcessor.forEach(iterator, book => {
      console.log(\`   \${index++}. \${book.title} (\${book.year})\`);
    });
  }
  
  showBooksReverse() {
    console.log('\\n🔄 Libros en orden inverso:');
    const iterator = this.library.createReverseIterator();
    let index = 1;
    IteratorProcessor.forEach(iterator, book => {
      console.log(\`   \${index++}. \${book.title}\`);
    });
  }
  
  showBooksByYearRange(startYear, endYear) {
    console.log(\`\\n📅 Libros de \${startYear} a \${endYear}:\`);
    const iterator = this.library.createYearRangeIterator(startYear, endYear);
    let index = 1;
    IteratorProcessor.forEach(iterator, book => {
      console.log(\`   \${index++}. \${book.title} (\${book.year})\`);
    });
  }
  
  searchBook(title) {
    console.log(\`\\n🔍 Buscando: "\${title}"\`);
    const iterator = this.library.createIterator();
    const found = IteratorProcessor.find(iterator, book => 
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    
    if (found) {
      console.log(\`   ✅ Encontrado: \${found}\`);
    } else {
      console.log(\`   ❌ No encontrado\`);
    }
  }
  
  getStatistics() {
    console.log('\\n📊 Estadísticas de la biblioteca:');
    
    const totalBooks = IteratorProcessor.count(this.library.createIterator());
    console.log(\`   Total de libros: \${totalBooks}\`);
    
    this.library.getGenres().forEach(genre => {
      const count = IteratorProcessor.count(this.library.createGenreIterator(genre));
      console.log(\`   \${genre}: \${count} libros\`);
    });
  }
}

// Uso del patrón Iterator
console.log('=== Sistema de Biblioteca con Patrón Iterator ===\\n');

// Crear biblioteca y agregar libros
const library = new Library();

const books = [
  new Book('1984', 'George Orwell', 'Ficción', 1949),
  new Book('Brave New World', 'Aldous Huxley', 'Ficción', 1932),
  new Book('The Catcher in the Rye', 'J.D. Salinger', 'Ficción', 1951),
  new Book('To Kill a Mockingbird', 'Harper Lee', 'Ficción', 1960),
  new Book('Clean Code', 'Robert Martin', 'Técnico', 2008),
  new Book('Design Patterns', 'Gang of Four', 'Técnico', 1994),
  new Book('The Pragmatic Programmer', 'Andy Hunt', 'Técnico', 1999),
  new Book('A Brief History of Time', 'Stephen Hawking', 'Ciencia', 1988),
  new Book('Cosmos', 'Carl Sagan', 'Ciencia', 1980),
  new Book('The Selfish Gene', 'Richard Dawkins', 'Ciencia', 1976)
];

books.forEach(book => library.addBook(book));

// Crear manager para demostrar diferentes iteradores
const manager = new LibraryManager(library);

// Demostrar diferentes tipos de iteración
manager.showAllBooks();
manager.showBooksByGenre('Ficción');
manager.showBooksByAuthor('George Orwell');
manager.showBooksReverse();
manager.showBooksByYearRange(1980, 2000);
manager.searchBook('Clean');
manager.getStatistics();

console.log('\\n🎯 Cada iterador proporciona una vista diferente de la misma colección!');`,
      php: `<?php
// Interfaz Iterator
interface BookIteratorInterface {
    public function hasNext(): bool;
    public function next(): Book;
    public function reset(): void;
}

// Colección de libros
class Book {
    private $title;
    private $author;
    private $genre;
    private $year;
    
    public function __construct(string $title, string $author, string $genre, int $year) {
        $this->title = $title;
        $this->author = $author;
        $this->genre = $genre;
        $this->year = $year;
    }
    
    public function __toString(): string {
        return "\\"$this->title\\" by $this->author ($this->year) - $this->genre";
    }
    
    public function getTitle(): string { return $this->title; }
    public function getAuthor(): string { return $this->author; }
    public function getGenre(): string { return $this->genre; }
    public function getYear(): int { return $this->year; }
}

// Colección concreta - Biblioteca
class Library {
    private $books = [];
    private $genres = [];
    private $authors = [];
    
    public function addBook(Book $book): void {
        $this->books[] = $book;
        
        if (!in_array($book->getGenre(), $this->genres)) {
            $this->genres[] = $book->getGenre();
        }
        
        if (!in_array($book->getAuthor(), $this->authors)) {
            $this->authors[] = $book->getAuthor();
        }
        
        echo "📚 Libro agregado: {$book->getTitle()}\\n";
    }
    
    public function getBooks(): array {
        return $this->books;
    }
    
    public function getGenres(): array {
        return $this->genres;
    }
    
    public function getAuthors(): array {
        return $this->authors;
    }
    
    // Factory methods para diferentes iteradores
    public function createIterator(): BookIteratorInterface {
        return new BookIterator($this->books);
    }
    
    public function createGenreIterator(string $genre): BookIteratorInterface {
        return new GenreIterator($this->books, $genre);
    }
    
    public function createAuthorIterator(string $author): BookIteratorInterface {
        return new AuthorIterator($this->books, $author);
    }
    
    public function createReverseIterator(): BookIteratorInterface {
        return new ReverseIterator($this->books);
    }
    
    public function createYearRangeIterator(int $startYear, int $endYear): BookIteratorInterface {
        return new YearRangeIterator($this->books, $startYear, $endYear);
    }
}

// Iterator concreto - Iterador básico de libros
class BookIterator implements BookIteratorInterface {
    private $books;
    private $position = 0;
    
    public function __construct(array $books) {
        $this->books = $books;
    }
    
    public function hasNext(): bool {
        return $this->position < count($this->books);
    }
    
    public function next(): Book {
        if (!$this->hasNext()) {
            throw new Exception('No more books to iterate');
        }
        return $this->books[$this->position++];
    }
    
    public function reset(): void {
        $this->position = 0;
    }
}

// Iterator por género
class GenreIterator implements BookIteratorInterface {
    private $books;
    private $genre;
    private $position = 0;
    private $filteredBooks;
    
    public function __construct(array $books, string $genre) {
        $this->books = $books;
        $this->genre = $genre;
        $this->filteredBooks = array_filter($books, function($book) use ($genre) {
            return $book->getGenre() === $genre;
        });
        $this->filteredBooks = array_values($this->filteredBooks);
    }
    
    public function hasNext(): bool {
        return $this->position < count($this->filteredBooks);
    }
    
    public function next(): Book {
        if (!$this->hasNext()) {
            throw new Exception("No more {$this->genre} books to iterate");
        }
        return $this->filteredBooks[$this->position++];
    }
    
    public function reset(): void {
        $this->position = 0;
    }
}

// Iterator por autor
class AuthorIterator implements BookIteratorInterface {
    private $books;
    private $author;
    private $position = 0;
    private $filteredBooks;
    
    public function __construct(array $books, string $author) {
        $this->books = $books;
        $this->author = $author;
        $this->filteredBooks = array_filter($books, function($book) use ($author) {
            return $book->getAuthor() === $author;
        });
        $this->filteredBooks = array_values($this->filteredBooks);
    }
    
    public function hasNext(): bool {
        return $this->position < count($this->filteredBooks);
    }
    
    public function next(): Book {
        if (!$this->hasNext()) {
            throw new Exception("No more books by {$this->author} to iterate");
        }
        return $this->filteredBooks[$this->position++];
    }
    
    public function reset(): void {
        $this->position = 0;
    }
}

// Iterator reverso
class ReverseIterator implements BookIteratorInterface {
    private $books;
    private $position;
    
    public function __construct(array $books) {
        $this->books = $books;
        $this->position = count($books) - 1;
    }
    
    public function hasNext(): bool {
        return $this->position >= 0;
    }
    
    public function next(): Book {
        if (!$this->hasNext()) {
            throw new Exception('No more books to iterate backwards');
        }
        return $this->books[$this->position--];
    }
    
    public function reset(): void {
        $this->position = count($this->books) - 1;
    }
}

// Iterator por rango de años
class YearRangeIterator implements BookIteratorInterface {
    private $books;
    private $startYear;
    private $endYear;
    private $position = 0;
    private $filteredBooks;
    
    public function __construct(array $books, int $startYear, int $endYear) {
        $this->books = $books;
        $this->startYear = $startYear;
        $this->endYear = $endYear;
        $this->filteredBooks = array_filter($books, function($book) use ($startYear, $endYear) {
            return $book->getYear() >= $startYear && $book->getYear() <= $endYear;
        });
        $this->filteredBooks = array_values($this->filteredBooks);
    }
    
    public function hasNext(): bool {
        return $this->position < count($this->filteredBooks);
    }
    
    public function next(): Book {
        if (!$this->hasNext()) {
            throw new Exception("No more books from {$this->startYear}-{$this->endYear} to iterate");
        }
        return $this->filteredBooks[$this->position++];
    }
    
    public function reset(): void {
        $this->position = 0;
    }
}

// Utilidad para procesar iteradores
class IteratorProcessor {
    public static function forEach(BookIteratorInterface $iterator, callable $callback): void {
        $iterator->reset();
        while ($iterator->hasNext()) {
            $callback($iterator->next());
        }
    }
    
    public static function toArray(BookIteratorInterface $iterator): array {
        $result = [];
        $iterator->reset();
        while ($iterator->hasNext()) {
            $result[] = $iterator->next();
        }
        return $result;
    }
    
    public static function count(BookIteratorInterface $iterator): int {
        $count = 0;
        $iterator->reset();
        while ($iterator->hasNext()) {
            $iterator->next();
            $count++;
        }
        return $count;
    }
    
    public static function find(BookIteratorInterface $iterator, callable $predicate): ?Book {
        $iterator->reset();
        while ($iterator->hasNext()) {
            $item = $iterator->next();
            if ($predicate($item)) {
                return $item;
            }
        }
        return null;
    }
}

// Cliente que usa diferentes iteradores
class LibraryManager {
    private $library;
    
    public function __construct(Library $library) {
        $this->library = $library;
    }
    
    public function showAllBooks(): void {
        echo "\\n📚 Todos los libros:\\n";
        $iterator = $this->library->createIterator();
        $index = 1;
        IteratorProcessor::forEach($iterator, function($book) use (&$index) {
            echo "   $index. $book\\n";
            $index++;
        });
    }
    
    public function showBooksByGenre(string $genre): void {
        echo "\\n🎭 Libros de $genre:\\n";
        $iterator = $this->library->createGenreIterator($genre);
        $index = 1;
        IteratorProcessor::forEach($iterator, function($book) use (&$index) {
            echo "   $index. {$book->getTitle()} by {$book->getAuthor()}\\n";
            $index++;
        });
    }
    
    public function showBooksByAuthor(string $author): void {
        echo "\\n✍️  Libros de $author:\\n";
        $iterator = $this->library->createAuthorIterator($author);
        $index = 1;
        IteratorProcessor::forEach($iterator, function($book) use (&$index) {
            echo "   $index. {$book->getTitle()} ({$book->getYear()})\\n";
            $index++;
        });
    }
    
    public function showBooksReverse(): void {
        echo "\\n🔄 Libros en orden inverso:\\n";
        $iterator = $this->library->createReverseIterator();
        $index = 1;
        IteratorProcessor::forEach($iterator, function($book) use (&$index) {
            echo "   $index. {$book->getTitle()}\\n";
            $index++;
        });
    }
    
    public function showBooksByYearRange(int $startYear, int $endYear): void {
        echo "\\n📅 Libros de $startYear a $endYear:\\n";
        $iterator = $this->library->createYearRangeIterator($startYear, $endYear);
        $index = 1;
        IteratorProcessor::forEach($iterator, function($book) use (&$index) {
            echo "   $index. {$book->getTitle()} ({$book->getYear()})\\n";
            $index++;
        });
    }
    
    public function searchBook(string $title): void {
        echo "\\n🔍 Buscando: \\"$title\\"\\n";
        $iterator = $this->library->createIterator();
        $found = IteratorProcessor::find($iterator, function($book) use ($title) {
            return strpos(strtolower($book->getTitle()), strtolower($title)) !== false;
        });
        
        if ($found) {
            echo "   ✅ Encontrado: $found\\n";
        } else {
            echo "   ❌ No encontrado\\n";
        }
    }
    
    public function getStatistics(): void {
        echo "\\n📊 Estadísticas de la biblioteca:\\n";
        
        $totalBooks = IteratorProcessor::count($this->library->createIterator());
        echo "   Total de libros: $totalBooks\\n";
        
        foreach ($this->library->getGenres() as $genre) {
            $count = IteratorProcessor::count($this->library->createGenreIterator($genre));
            echo "   $genre: $count libros\\n";
        }
    }
}

// Uso del patrón Iterator
echo "=== Sistema de Biblioteca con Patrón Iterator ===\\n\\n";

// Crear biblioteca y agregar libros
$library = new Library();

$books = [
    new Book('1984', 'George Orwell', 'Ficción', 1949),
    new Book('Brave New World', 'Aldous Huxley', 'Ficción', 1932),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 'Ficción', 1951),
    new Book('To Kill a Mockingbird', 'Harper Lee', 'Ficción', 1960),
    new Book('Clean Code', 'Robert Martin', 'Técnico', 2008),
    new Book('Design Patterns', 'Gang of Four', 'Técnico', 1994),
    new Book('The Pragmatic Programmer', 'Andy Hunt', 'Técnico', 1999),
    new Book('A Brief History of Time', 'Stephen Hawking', 'Ciencia', 1988),
    new Book('Cosmos', 'Carl Sagan', 'Ciencia', 1980),
    new Book('The Selfish Gene', 'Richard Dawkins', 'Ciencia', 1976)
];

foreach ($books as $book) {
    $library->addBook($book);
}

// Crear manager para demostrar diferentes iteradores
$manager = new LibraryManager($library);

// Demostrar diferentes tipos de iteración
$manager->showAllBooks();
$manager->showBooksByGenre('Ficción');
$manager->showBooksByAuthor('George Orwell');
$manager->showBooksReverse();
$manager->showBooksByYearRange(1980, 2000);
$manager->searchBook('Clean');
$manager->getStatistics();

echo "\\n🎯 Cada iterador proporciona una vista diferente de la misma colección!\\n";
?>`
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
    content: "El patrón Mediator es como un controlador de tráfico aéreo: en lugar de que cada avión se comunique directamente con otros aviones (lo cual sería caótico), todos se comunican con la torre de control, que coordina todo el tráfico de manera centralizada.\n\nEste patrón define cómo un conjunto de objetos interactúan entre sí a través de un mediador central.\n\n**¿Cuándo usarlo?**\n• Cuando es difícil cambiar algunas clases porque están fuertemente acopladas a muchas otras clases\n• Cuando no puedes reutilizar un componente en un programa diferente porque es demasiado dependiente de otros componentes\n• Cuando te encuentras creando toneladas de subclases de componente solo para reutilizar algún comportamiento básico en varios contextos\n• Cuando hay muchas relaciones complejas y bien definidas entre objetos\n\n**Ventajas:**\n• Principio de responsabilidad única: puedes extraer las comunicaciones entre varios componentes en un solo lugar\n• Principio abierto/cerrado: puedes introducir nuevos mediadores sin cambiar los componentes reales\n• Puedes reducir el acoplamiento entre varios componentes de un programa\n• Puedes reutilizar componentes individuales más fácilmente\n\n**Desventajas:**\n• Con el tiempo, un mediador puede evolucionar hacia un objeto dios",
    examples: {
      javascript: `// Interfaz del mediador
class DialogMediator {
  notify(sender, event) {
    throw new Error('notify method must be implemented');
  }
}

// Componentes base
class Component {
  constructor(mediator = null) {
    this.mediator = mediator;
  }
  
  setMediator(mediator) {
    this.mediator = mediator;
  }
}

// Componentes concretos del formulario
class TextBox extends Component {
  constructor(name, placeholder = '') {
    super();
    this.name = name;
    this.value = '';
    this.placeholder = placeholder;
    this.isVisible = true;
    this.isEnabled = true;
  }
  
  setValue(value) {
    this.value = value;
    console.log(\`📝 \${this.name}: Valor establecido a "\${value}"\`);
    if (this.mediator) {
      this.mediator.notify(this, 'valueChanged');
    }
  }
  
  getValue() {
    return this.value;
  }
  
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(\`\${enabled ? '🔓' : '🔒'} \${this.name}: \${enabled ? 'Habilitado' : 'Deshabilitado'}\`);
  }
  
  setVisible(visible) {
    this.isVisible = visible;
    console.log(\`\${visible ? '👁️' : '🙈'} \${this.name}: \${visible ? 'Visible' : 'Oculto'}\`);
  }
  
  focus() {
    if (this.isEnabled && this.isVisible) {
      console.log(\`🎯 \${this.name}: Enfocado\`);
      if (this.mediator) {
        this.mediator.notify(this, 'focused');
      }
    }
  }
}

class CheckBox extends Component {
  constructor(name, label) {
    super();
    this.name = name;
    this.label = label;
    this.isChecked = false;
    this.isEnabled = true;
  }
  
  setChecked(checked) {
    this.isChecked = checked;
    console.log(\`\${checked ? '☑️' : '☐'} \${this.name}: \${checked ? 'Marcado' : 'Desmarcado'}\`);
    if (this.mediator) {
      this.mediator.notify(this, 'stateChanged');
    }
  }
  
  isChecked() {
    return this.isChecked;
  }
  
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(\`\${enabled ? '🔓' : '🔒'} \${this.name}: \${enabled ? 'Habilitado' : 'Deshabilitado'}\`);
  }
}

class Button extends Component {
  constructor(name, label) {
    super();
    this.name = name;
    this.label = label;
    this.isEnabled = true;
    this.isVisible = true;
  }
  
  click() {
    if (this.isEnabled && this.isVisible) {
      console.log(\`🔘 \${this.name}: Clic en "\${this.label}"\`);
      if (this.mediator) {
        this.mediator.notify(this, 'clicked');
      }
    }
  }
  
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(\`\${enabled ? '🔓' : '🔒'} \${this.name}: \${enabled ? 'Habilitado' : 'Deshabilitado'}\`);
  }
  
  setVisible(visible) {
    this.isVisible = visible;
    console.log(\`\${visible ? '👁️' : '🙈'} \${this.name}: \${visible ? 'Visible' : 'Oculto'}\`);
  }
}

class DropDown extends Component {
  constructor(name, options = []) {
    super();
    this.name = name;
    this.options = options;
    this.selectedValue = '';
    this.isEnabled = true;
  }
  
  selectOption(value) {
    if (this.options.includes(value)) {
      this.selectedValue = value;
      console.log(\`📋 \${this.name}: Seleccionado "\${value}"\`);
      if (this.mediator) {
        this.mediator.notify(this, 'selectionChanged');
      }
    }
  }
  
  getSelectedValue() {
    return this.selectedValue;
  }
  
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(\`\${enabled ? '🔓' : '🔒'} \${this.name}: \${enabled ? 'Habilitado' : 'Deshabilitado'}\`);
  }
}

// Mediador concreto - Formulario de registro
class RegistrationFormMediator extends DialogMediator {
  constructor() {
    super();
    this.setupComponents();
    this.setupMediatorReferences();
  }
  
  setupComponents() {
    // Crear componentes
    this.usernameField = new TextBox('username', 'Ingrese nombre de usuario');
    this.emailField = new TextBox('email', 'Ingrese email');
    this.passwordField = new TextBox('password', 'Ingrese contraseña');
    this.confirmPasswordField = new TextBox('confirmPassword', 'Confirme contraseña');
    this.countryDropdown = new DropDown('country', ['USA', 'Canada', 'Mexico', 'Spain', 'France']);
    this.agreeTermsCheckbox = new CheckBox('agreeTerms', 'Acepto términos y condiciones');
    this.newsletterCheckbox = new CheckBox('newsletter', 'Suscribirse al newsletter');
    this.submitButton = new Button('submit', 'Registrarse');
    this.resetButton = new Button('reset', 'Limpiar');
  }
  
  setupMediatorReferences() {
    // Asignar mediador a todos los componentes
    const components = [
      this.usernameField, this.emailField, this.passwordField, 
      this.confirmPasswordField, this.countryDropdown, 
      this.agreeTermsCheckbox, this.newsletterCheckbox,
      this.submitButton, this.resetButton
    ];
    
    components.forEach(component => component.setMediator(this));
  }
  
  notify(sender, event) {
    console.log(\`\\n🔔 Mediador notificado: \${sender.name} -> \${event}\`);
    
    if (sender === this.usernameField && event === 'valueChanged') {
      this.validateUsername();
    }
    
    if (sender === this.emailField && event === 'valueChanged') {
      this.validateEmail();
    }
    
    if (sender === this.passwordField && event === 'valueChanged') {
      this.validatePassword();
      this.validatePasswordMatch();
    }
    
    if (sender === this.confirmPasswordField && event === 'valueChanged') {
      this.validatePasswordMatch();
    }
    
    if (sender === this.countryDropdown && event === 'selectionChanged') {
      this.handleCountrySelection();
    }
    
    if (sender === this.agreeTermsCheckbox && event === 'stateChanged') {
      this.updateSubmitButtonState();
    }
    
    if (sender === this.submitButton && event === 'clicked') {
      this.handleSubmit();
    }
    
    if (sender === this.resetButton && event === 'clicked') {
      this.handleReset();
    }
    
    // Siempre validar el estado general del formulario
    this.updateSubmitButtonState();
  }
  
  validateUsername() {
    const username = this.usernameField.getValue();
    if (username.length < 3) {
      console.log(\`❌ Validación: Nombre de usuario debe tener al menos 3 caracteres\`);
      return false;
    }
    console.log(\`✅ Validación: Nombre de usuario válido\`);
    return true;
  }
  
  validateEmail() {
    const email = this.emailField.getValue();
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(\`❌ Validación: Email inválido\`);
      return false;
    }
    console.log(\`✅ Validación: Email válido\`);
    return true;
  }
  
  validatePassword() {
    const password = this.passwordField.getValue();
    if (password.length < 6) {
      console.log(\`❌ Validación: Contraseña debe tener al menos 6 caracteres\`);
      return false;
    }
    console.log(\`✅ Validación: Contraseña válida\`);
    return true;
  }
  
  validatePasswordMatch() {
    const password = this.passwordField.getValue();
    const confirmPassword = this.confirmPasswordField.getValue();
    
    if (confirmPassword && password !== confirmPassword) {
      console.log(\`❌ Validación: Las contraseñas no coinciden\`);
      return false;
    }
    
    if (confirmPassword && password === confirmPassword) {
      console.log(\`✅ Validación: Las contraseñas coinciden\`);
    }
    return true;
  }
  
  handleCountrySelection() {
    const country = this.countryDropdown.getSelectedValue();
    
    // Lógica específica por país
    if (country === 'USA' || country === 'Canada') {
      this.newsletterCheckbox.setChecked(true);
      console.log(\`🌎 País seleccionado: \${country} - Newsletter habilitado por defecto\`);
    }
  }
  
  updateSubmitButtonState() {
    const isFormValid = 
      this.validateUsername() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordMatch() &&
      this.agreeTermsCheckbox.isChecked() &&
      this.countryDropdown.getSelectedValue() !== '';
    
    this.submitButton.setEnabled(isFormValid);
    
    if (isFormValid) {
      console.log(\`✅ Formulario válido - Botón de envío habilitado\`);
    } else {
      console.log(\`❌ Formulario inválido - Botón de envío deshabilitado\`);
    }
  }
  
  handleSubmit() {
    console.log(\`\\n🚀 Enviando formulario...\`);
    console.log(\`   Usuario: \${this.usernameField.getValue()}\`);
    console.log(\`   Email: \${this.emailField.getValue()}\`);
    console.log(\`   País: \${this.countryDropdown.getSelectedValue()}\`);
    console.log(\`   Newsletter: \${this.newsletterCheckbox.isChecked() ? 'Sí' : 'No'}\`);
    console.log(\`✅ Registro completado exitosamente!\`);
  }
  
  handleReset() {
    console.log(\`\\n🔄 Limpiando formulario...\`);
    this.usernameField.setValue('');
    this.emailField.setValue('');
    this.passwordField.setValue('');
    this.confirmPasswordField.setValue('');
    this.countryDropdown.selectOption('');
    this.agreeTermsCheckbox.setChecked(false);
    this.newsletterCheckbox.setChecked(false);
    console.log(\`✅ Formulario limpiado\`);
  }
  
  getFormSummary() {
    console.log(\`\\n📊 Estado actual del formulario:\`);
    console.log(\`   Username: "\${this.usernameField.getValue()}"\`);
    console.log(\`   Email: "\${this.emailField.getValue()}"\`);
    console.log(\`   Password: \${this.passwordField.getValue() ? '[HIDDEN]' : '[EMPTY]'}\`);
    console.log(\`   Country: "\${this.countryDropdown.getSelectedValue()}"\`);
    console.log(\`   Terms Agreed: \${this.agreeTermsCheckbox.isChecked()}\`);
    console.log(\`   Newsletter: \${this.newsletterCheckbox.isChecked()}\`);
  }
}

// Uso del patrón Mediator
console.log('=== Formulario de Registro con Patrón Mediator ===\\n');

const registrationForm = new RegistrationFormMediator();

console.log('--- Llenando formulario paso a paso ---');

// Simular llenado del formulario
registrationForm.usernameField.setValue('john_doe');
registrationForm.emailField.setValue('john@email.com');
registrationForm.passwordField.setValue('password123');
registrationForm.confirmPasswordField.setValue('password123');
registrationForm.countryDropdown.selectOption('USA');
registrationForm.agreeTermsCheckbox.setChecked(true);

console.log('\\n--- Estado del formulario ---');
registrationForm.getFormSummary();

console.log('\\n--- Intentando enviar ---');
registrationForm.submitButton.click();

console.log('\\n--- Limpiando formulario ---');
registrationForm.resetButton.click();

console.log('\\n--- Estado después de limpiar ---');
registrationForm.getFormSummary();

console.log('\\n🎯 El mediador coordina todas las interacciones entre componentes!');`,
      php: `<?php
// Interfaz del mediador
interface DialogMediator {
    public function notify(Component $sender, string $event): void;
}

// Componente base
abstract class Component {
    protected $mediator;
    
    public function __construct(DialogMediator $mediator = null) {
        $this->mediator = $mediator;
    }
    
    public function setMediator(DialogMediator $mediator): void {
        $this->mediator = $mediator;
    }
}

// Componentes concretos del formulario
class TextBox extends Component {
    private $name;
    private $value = '';
    private $placeholder;
    private $isVisible = true;
    private $isEnabled = true;
    
    public function __construct(string $name, string $placeholder = '') {
        parent::__construct();
        $this->name = $name;
        $this->placeholder = $placeholder;
    }
    
    public function setValue(string $value): void {
        $this->value = $value;
        echo "📝 {$this->name}: Valor establecido a \\"$value\\"\\n";
        if ($this->mediator) {
            $this->mediator->notify($this, 'valueChanged');
        }
    }
    
    public function getValue(): string {
        return $this->value;
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public function setEnabled(bool $enabled): void {
        $this->isEnabled = $enabled;
        $status = $enabled ? 'Habilitado' : 'Deshabilitado';
        $icon = $enabled ? '🔓' : '🔒';
        echo "$icon {$this->name}: $status\\n";
    }
    
    public function setVisible(bool $visible): void {
        $this->isVisible = $visible;
        $status = $visible ? 'Visible' : 'Oculto';
        $icon = $visible ? '👁️' : '🙈';
        echo "$icon {$this->name}: $status\\n";
    }
    
    public function focus(): void {
        if ($this->isEnabled && $this->isVisible) {
            echo "🎯 {$this->name}: Enfocado\\n";
            if ($this->mediator) {
                $this->mediator->notify($this, 'focused');
            }
        }
    }
}

class CheckBox extends Component {
    private $name;
    private $label;
    private $isChecked = false;
    private $isEnabled = true;
    
    public function __construct(string $name, string $label) {
        parent::__construct();
        $this->name = $name;
        $this->label = $label;
    }
    
    public function setChecked(bool $checked): void {
        $this->isChecked = $checked;
        $icon = $checked ? '☑️' : '☐';
        $status = $checked ? 'Marcado' : 'Desmarcado';
        echo "$icon {$this->name}: $status\\n";
        if ($this->mediator) {
            $this->mediator->notify($this, 'stateChanged');
        }
    }
    
    public function isChecked(): bool {
        return $this->isChecked;
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public function setEnabled(bool $enabled): void {
        $this->isEnabled = $enabled;
        $status = $enabled ? 'Habilitado' : 'Deshabilitado';
        $icon = $enabled ? '🔓' : '🔒';
        echo "$icon {$this->name}: $status\\n";
    }
}

class Button extends Component {
    private $name;
    private $label;
    private $isEnabled = true;
    private $isVisible = true;
    
    public function __construct(string $name, string $label) {
        parent::__construct();
        $this->name = $name;
        $this->label = $label;
    }
    
    public function click(): void {
        if ($this->isEnabled && $this->isVisible) {
            echo "🔘 {$this->name}: Clic en \\"{$this->label}\\"\\n";
            if ($this->mediator) {
                $this->mediator->notify($this, 'clicked');
            }
        }
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public function setEnabled(bool $enabled): void {
        $this->isEnabled = $enabled;
        $status = $enabled ? 'Habilitado' : 'Deshabilitado';
        $icon = $enabled ? '🔓' : '🔒';
        echo "$icon {$this->name}: $status\\n";
    }
    
    public function setVisible(bool $visible): void {
        $this->isVisible = $visible;
        $status = $visible ? 'Visible' : 'Oculto';
        $icon = $visible ? '👁️' : '🙈';
        echo "$icon {$this->name}: $status\\n";
    }
}

class DropDown extends Component {
    private $name;
    private $options;
    private $selectedValue = '';
    private $isEnabled = true;
    
    public function __construct(string $name, array $options = []) {
        parent::__construct();
        $this->name = $name;
        $this->options = $options;
    }
    
    public function selectOption(string $value): void {
        if (in_array($value, $this->options) || $value === '') {
            $this->selectedValue = $value;
            if ($value !== '') {
                echo "📋 {$this->name}: Seleccionado \\"$value\\"\\n";
            }
            if ($this->mediator) {
                $this->mediator->notify($this, 'selectionChanged');
            }
        }
    }
    
    public function getSelectedValue(): string {
        return $this->selectedValue;
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public function setEnabled(bool $enabled): void {
        $this->isEnabled = $enabled;
        $status = $enabled ? 'Habilitado' : 'Deshabilitado';
        $icon = $enabled ? '🔓' : '🔒';
        echo "$icon {$this->name}: $status\\n";
    }
}

// Mediador concreto - Formulario de registro
class RegistrationFormMediator implements DialogMediator {
    private $usernameField;
    private $emailField;
    private $passwordField;
    private $confirmPasswordField;
    private $countryDropdown;
    private $agreeTermsCheckbox;
    private $newsletterCheckbox;
    private $submitButton;
    private $resetButton;
    
    public function __construct() {
        $this->setupComponents();
        $this->setupMediatorReferences();
    }
    
    private function setupComponents(): void {
        $this->usernameField = new TextBox('username', 'Ingrese nombre de usuario');
        $this->emailField = new TextBox('email', 'Ingrese email');
        $this->passwordField = new TextBox('password', 'Ingrese contraseña');
        $this->confirmPasswordField = new TextBox('confirmPassword', 'Confirme contraseña');
        $this->countryDropdown = new DropDown('country', ['USA', 'Canada', 'Mexico', 'Spain', 'France']);
        $this->agreeTermsCheckbox = new CheckBox('agreeTerms', 'Acepto términos y condiciones');
        $this->newsletterCheckbox = new CheckBox('newsletter', 'Suscribirse al newsletter');
        $this->submitButton = new Button('submit', 'Registrarse');
        $this->resetButton = new Button('reset', 'Limpiar');
    }
    
    private function setupMediatorReferences(): void {
        $components = [
            $this->usernameField, $this->emailField, $this->passwordField,
            $this->confirmPasswordField, $this->countryDropdown,
            $this->agreeTermsCheckbox, $this->newsletterCheckbox,
            $this->submitButton, $this->resetButton
        ];
        
        foreach ($components as $component) {
            $component->setMediator($this);
        }
    }
    
    public function notify(Component $sender, string $event): void {
        echo "\\n🔔 Mediador notificado: {$sender->getName()} -> $event\\n";
        
        if ($sender === $this->usernameField && $event === 'valueChanged') {
            $this->validateUsername();
        }
        
        if ($sender === $this->emailField && $event === 'valueChanged') {
            $this->validateEmail();
        }
        
        if ($sender === $this->passwordField && $event === 'valueChanged') {
            $this->validatePassword();
            $this->validatePasswordMatch();
        }
        
        if ($sender === $this->confirmPasswordField && $event === 'valueChanged') {
            $this->validatePasswordMatch();
        }
        
        if ($sender === $this->countryDropdown && $event === 'selectionChanged') {
            $this->handleCountrySelection();
        }
        
        if ($sender === $this->agreeTermsCheckbox && $event === 'stateChanged') {
            $this->updateSubmitButtonState();
        }
        
        if ($sender === $this->submitButton && $event === 'clicked') {
            $this->handleSubmit();
        }
        
        if ($sender === $this->resetButton && $event === 'clicked') {
            $this->handleReset();
        }
        
        $this->updateSubmitButtonState();
    }
    
    private function validateUsername(): bool {
        $username = $this->usernameField->getValue();
        if (strlen($username) < 3) {
            echo "❌ Validación: Nombre de usuario debe tener al menos 3 caracteres\\n";
            return false;
        }
        echo "✅ Validación: Nombre de usuario válido\\n";
        return true;
    }
    
    private function validateEmail(): bool {
        $email = $this->emailField->getValue();
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "❌ Validación: Email inválido\\n";
            return false;
        }
        echo "✅ Validación: Email válido\\n";
        return true;
    }
    
    private function validatePassword(): bool {
        $password = $this->passwordField->getValue();
        if (strlen($password) < 6) {
            echo "❌ Validación: Contraseña debe tener al menos 6 caracteres\\n";
            return false;
        }
        echo "✅ Validación: Contraseña válida\\n";
        return true;
    }
    
    private function validatePasswordMatch(): bool {
        $password = $this->passwordField->getValue();
        $confirmPassword = $this->confirmPasswordField->getValue();
        
        if ($confirmPassword && $password !== $confirmPassword) {
            echo "❌ Validación: Las contraseñas no coinciden\\n";
            return false;
        }
        
        if ($confirmPassword && $password === $confirmPassword) {
            echo "✅ Validación: Las contraseñas coinciden\\n";
        }
        return true;
    }
    
    private function handleCountrySelection(): void {
        $country = $this->countryDropdown->getSelectedValue();
        
        if ($country === 'USA' || $country === 'Canada') {
            $this->newsletterCheckbox->setChecked(true);
            echo "🌎 País seleccionado: $country - Newsletter habilitado por defecto\\n";
        }
    }
    
    private function updateSubmitButtonState(): void {
        $isFormValid = 
            $this->validateUsername() &&
            $this->validateEmail() &&
            $this->validatePassword() &&
            $this->validatePasswordMatch() &&
            $this->agreeTermsCheckbox->isChecked() &&
            $this->countryDropdown->getSelectedValue() !== '';
        
        $this->submitButton->setEnabled($isFormValid);
        
        if ($isFormValid) {
            echo "✅ Formulario válido - Botón de envío habilitado\\n";
        } else {
            echo "❌ Formulario inválido - Botón de envío deshabilitado\\n";
        }
    }
    
    private function handleSubmit(): void {
        echo "\\n🚀 Enviando formulario...\\n";
        echo "   Usuario: {$this->usernameField->getValue()}\\n";
        echo "   Email: {$this->emailField->getValue()}\\n";
        echo "   País: {$this->countryDropdown->getSelectedValue()}\\n";
        echo "   Newsletter: " . ($this->newsletterCheckbox->isChecked() ? 'Sí' : 'No') . "\\n";
        echo "✅ Registro completado exitosamente!\\n";
    }
    
    private function handleReset(): void {
        echo "\\n🔄 Limpiando formulario...\\n";
        $this->usernameField->setValue('');
        $this->emailField->setValue('');
        $this->passwordField->setValue('');
        $this->confirmPasswordField->setValue('');
        $this->countryDropdown->selectOption('');
        $this->agreeTermsCheckbox->setChecked(false);
        $this->newsletterCheckbox->setChecked(false);
        echo "✅ Formulario limpiado\\n";
    }
    
    public function getFormSummary(): void {
        echo "\\n📊 Estado actual del formulario:\\n";
        echo "   Username: \\"{$this->usernameField->getValue()}\\"\\n";
        echo "   Email: \\"{$this->emailField->getValue()}\\"\\n";
        echo "   Password: " . ($this->passwordField->getValue() ? '[HIDDEN]' : '[EMPTY]') . "\\n";
        echo "   Country: \\"{$this->countryDropdown->getSelectedValue()}\\"\\n";
        echo "   Terms Agreed: " . ($this->agreeTermsCheckbox->isChecked() ? 'true' : 'false') . "\\n";
        echo "   Newsletter: " . ($this->newsletterCheckbox->isChecked() ? 'true' : 'false') . "\\n";
    }
    
    // Métodos públicos para acceso a componentes (para testing)
    public function getUsernameField(): TextBox { return $this->usernameField; }
    public function getEmailField(): TextBox { return $this->emailField; }
    public function getPasswordField(): TextBox { return $this->passwordField; }
    public function getConfirmPasswordField(): TextBox { return $this->confirmPasswordField; }
    public function getCountryDropdown(): DropDown { return $this->countryDropdown; }
    public function getAgreeTermsCheckbox(): CheckBox { return $this->agreeTermsCheckbox; }
    public function getNewsletterCheckbox(): CheckBox { return $this->newsletterCheckbox; }
    public function getSubmitButton(): Button { return $this->submitButton; }
    public function getResetButton(): Button { return $this->resetButton; }
}

// Uso del patrón Mediator
echo "=== Formulario de Registro con Patrón Mediator ===\\n\\n";

$registrationForm = new RegistrationFormMediator();

echo "--- Llenando formulario paso a paso ---\\n";

// Simular llenado del formulario
$registrationForm->getUsernameField()->setValue('john_doe');
$registrationForm->getEmailField()->setValue('john@email.com');
$registrationForm->getPasswordField()->setValue('password123');
$registrationForm->getConfirmPasswordField()->setValue('password123');
$registrationForm->getCountryDropdown()->selectOption('USA');
$registrationForm->getAgreeTermsCheckbox()->setChecked(true);

echo "\\n--- Estado del formulario ---\\n";
$registrationForm->getFormSummary();

echo "\\n--- Intentando enviar ---\\n";
$registrationForm->getSubmitButton()->click();

echo "\\n--- Limpiando formulario ---\\n";
$registrationForm->getResetButton()->click();

echo "\\n--- Estado después de limpiar ---\\n";
$registrationForm->getFormSummary();

echo "\\n🎯 El mediador coordina todas las interacciones entre componentes!\\n";
?>`
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
    content: "El patrón Memento es como hacer un punto de guardado en un videojuego: puedes capturar el estado actual completo de tu progreso y luego restaurarlo exactamente como estaba si algo sale mal, sin que el juego tenga que saber los detalles internos de cómo se almacena tu progreso.\n\nEste patrón permite capturar y externalizar el estado interno de un objeto sin violar su encapsulación.\n\n**¿Cuándo usarlo?**\n• Cuando quieres producir instantáneas del estado del objeto para poder restaurar un estado previo\n• Cuando el acceso directo a los campos/getters/setters del objeto viola su encapsulación\n• Cuando quieres implementar operaciones de deshacer (undo)\n• Cuando necesitas mantener un historial de estados de un objeto\n\n**Ventajas:**\n• Puedes producir instantáneas del estado del objeto sin violar su encapsulación\n• Puedes simplificar el código del originador permitiendo que el cuidador mantenga el historial del estado del originador\n• Preserva los límites de encapsulación\n• Simplifica la arquitectura del originador\n\n**Desventajas:**\n• La aplicación puede consumir mucha RAM si los clientes crean mementos muy a menudo\n• Los cuidadores deben rastrear el ciclo de vida del originador para poder destruir mementos obsoletos\n• La mayoría de lenguajes de programación dinámicos no pueden garantizar que el estado dentro del memento se mantenga intacto",
    examples: {
      javascript: `// Memento - Instantánea del estado del documento
class DocumentMemento {
  constructor(content, cursorPosition, selection, formatting) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.selection = selection;
    this.formatting = { ...formatting };
    this.timestamp = new Date();
  }
  
  getContent() { return this.content; }
  getCursorPosition() { return this.cursorPosition; }
  getSelection() { return this.selection; }
  getFormatting() { return { ...this.formatting }; }
  getTimestamp() { return this.timestamp; }
}

// Originator - Editor de texto
class TextEditor {
  constructor() {
    this.content = '';
    this.cursorPosition = 0;
    this.selection = { start: 0, end: 0 };
    this.formatting = {
      bold: false,
      italic: false,
      underline: false,
      fontSize: 12,
      fontFamily: 'Arial',
      color: '#000000'
    };
  }
  
  // Métodos de edición
  type(text) {
    const before = this.content.substring(0, this.cursorPosition);
    const after = this.content.substring(this.cursorPosition);
    this.content = before + text + after;
    this.cursorPosition += text.length;
    console.log(\`✏️  Escribiendo: "\${text}"\`);
    console.log(\`   Contenido actual: "\${this.content}"\`);
  }
  
  deleteSelection() {
    if (this.hasSelection()) {
      const before = this.content.substring(0, this.selection.start);
      const after = this.content.substring(this.selection.end);
      this.content = before + after;
      this.cursorPosition = this.selection.start;
      this.clearSelection();
      console.log(\`🗑️  Texto eliminado\`);
      console.log(\`   Contenido actual: "\${this.content}"\`);
    }
  }
  
  setCursorPosition(position) {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
    console.log(\`📍 Cursor en posición: \${this.cursorPosition}\`);
  }
  
  setSelection(start, end) {
    this.selection.start = Math.max(0, Math.min(start, this.content.length));
    this.selection.end = Math.max(this.selection.start, Math.min(end, this.content.length));
    console.log(\`🎯 Selección: [\${this.selection.start}, \${this.selection.end}]\`);
  }
  
  clearSelection() {
    this.selection = { start: 0, end: 0 };
  }
  
  hasSelection() {
    return this.selection.start !== this.selection.end;
  }
  
  // Métodos de formato
  setBold(bold) {
    this.formatting.bold = bold;
    console.log(\`\${bold ? '**' : 'ℹ️'} Negrita: \${bold ? 'activada' : 'desactivada'}\`);
  }
  
  setItalic(italic) {
    this.formatting.italic = italic;
    console.log(\`\${italic ? '/' : 'ℹ️'} Cursiva: \${italic ? 'activada' : 'desactivada'}\`);
  }
  
  setFontSize(size) {
    this.formatting.fontSize = size;
    console.log(\`🔤 Tamaño de fuente: \${size}px\`);
  }
  
  setColor(color) {
    this.formatting.color = color;
    console.log(\`🎨 Color: \${color}\`);
  }
  
  // Crear memento (punto de guardado)
  createMemento() {
    console.log(\`💾 Creando punto de guardado...\`);
    return new DocumentMemento(
      this.content,
      this.cursorPosition,
      { ...this.selection },
      this.formatting
    );
  }
  
  // Restaurar desde memento
  restoreFromMemento(memento) {
    console.log(\`🔄 Restaurando desde punto de guardado (\${memento.getTimestamp().toLocaleTimeString()})...\`);
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
    this.selection = memento.getSelection();
    this.formatting = memento.getFormatting();
    console.log(\`   Contenido restaurado: "\${this.content}"\`);
    console.log(\`   Cursor en posición: \${this.cursorPosition}\`);
  }
  
  // Estado actual
  getStatus() {
    console.log(\`\\n📄 Estado del documento:\`);
    console.log(\`   Contenido: "\${this.content}"\`);
    console.log(\`   Cursor: posición \${this.cursorPosition}\`);
    console.log(\`   Selección: [\${this.selection.start}, \${this.selection.end}]\`);
    console.log(\`   Formato: Negrita=\${this.formatting.bold}, Cursiva=\${this.formatting.italic}, Tamaño=\${this.formatting.fontSize}px\`);
  }
}

// Caretaker - Historial del editor
class EditorHistory {
  constructor(editor) {
    this.editor = editor;
    this.mementos = [];
    this.currentIndex = -1;
    this.maxHistorySize = 50;
  }
  
  // Guardar estado actual
  saveState() {
    // Remover cualquier historial "futuro" si estamos en el medio de la historia
    if (this.currentIndex < this.mementos.length - 1) {
      this.mementos = this.mementos.slice(0, this.currentIndex + 1);
    }
    
    // Agregar nuevo memento
    const memento = this.editor.createMemento();
    this.mementos.push(memento);
    this.currentIndex++;
    
    // Mantener límite de historial
    if (this.mementos.length > this.maxHistorySize) {
      this.mementos.shift();
      this.currentIndex--;
    }
    
    console.log(\`💾 Estado guardado. Historial: \${this.currentIndex + 1}/\${this.mementos.length}\`);
  }
  
  // Deshacer (undo)
  undo() {
    if (this.canUndo()) {
      this.currentIndex--;
      this.editor.restoreFromMemento(this.mementos[this.currentIndex]);
      console.log(\`↩️  Deshecho. Posición en historial: \${this.currentIndex + 1}/\${this.mementos.length}\`);
      return true;
    } else {
      console.log(\`❌ No hay más acciones para deshacer\`);
      return false;
    }
  }
  
  // Rehacer (redo)
  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      this.editor.restoreFromMemento(this.mementos[this.currentIndex]);
      console.log(\`↪️  Rehecho. Posición en historial: \${this.currentIndex + 1}/\${this.mementos.length}\`);
      return true;
    } else {
      console.log(\`❌ No hay más acciones para rehacer\`);
      return false;
    }
  }
  
  canUndo() {
    return this.currentIndex > 0;
  }
  
  canRedo() {
    return this.currentIndex < this.mementos.length - 1;
  }
  
  // Mostrar historial
  showHistory() {
    console.log(\`\\n📜 Historial del editor:\`);
    this.mementos.forEach((memento, index) => {
      const marker = index === this.currentIndex ? '👉' : '  ';
      const content = memento.getContent().substring(0, 20) + (memento.getContent().length > 20 ? '...' : '');
      console.log(\`\${marker} \${index + 1}. "\${content}" (\${memento.getTimestamp().toLocaleTimeString()})\`);
    });
  }
  
  // Ir a un punto específico en el historial
  goToState(index) {
    if (index >= 0 && index < this.mementos.length) {
      this.currentIndex = index;
      this.editor.restoreFromMemento(this.mementos[this.currentIndex]);
      console.log(\`🎯 Saltando a estado \${index + 1}/\${this.mementos.length}\`);
      return true;
    }
    return false;
  }
  
  // Limpiar historial
  clearHistory() {
    this.mementos = [];
    this.currentIndex = -1;
    console.log(\`🗑️  Historial limpiado\`);
  }
}

// Cliente - Simulación de uso del editor
class EditorSimulator {
  constructor() {
    this.editor = new TextEditor();
    this.history = new EditorHistory(this.editor);
  }
  
  simulate() {
    console.log('=== Simulación de Editor de Texto con Patrón Memento ===\\n');
    
    // Estado inicial
    console.log('--- Estado inicial ---');
    this.history.saveState();
    this.editor.getStatus();
    
    // Escribir texto
    console.log('\\n--- Escribiendo texto ---');
    this.editor.type('Hola mundo');
    this.history.saveState();
    
    // Cambiar formato
    console.log('\\n--- Cambiando formato ---');
    this.editor.setBold(true);
    this.editor.setFontSize(16);
    this.history.saveState();
    
    // Más texto
    console.log('\\n--- Más texto ---');
    this.editor.type(' en negrita');
    this.history.saveState();
    
    // Seleccionar y eliminar
    console.log('\\n--- Seleccionar y eliminar ---');
    this.editor.setSelection(5, 10); // Seleccionar "mundo"
    this.editor.deleteSelection();
    this.history.saveState();
    
    // Estado actual
    console.log('\\n--- Estado actual ---');
    this.editor.getStatus();
    
    // Mostrar historial
    this.history.showHistory();
    
    // Probar undo/redo
    console.log('\\n--- Probando undo/redo ---');
    this.history.undo(); // Deshacer eliminación
    this.history.undo(); // Deshacer último texto
    this.history.redo(); // Rehacer último texto
    
    // Estado final
    console.log('\\n--- Estado final ---');
    this.editor.getStatus();
    this.history.showHistory();
    
    // Ir a un estado específico
    console.log('\\n--- Saltando al primer estado ---');
    this.history.goToState(0);
    this.editor.getStatus();
  }
}

// Uso del patrón Memento
const simulator = new EditorSimulator();
simulator.simulate();

console.log('\\n🎯 El patrón Memento permite guardar y restaurar estados completos!');`,
      php: `<?php
// Memento - Instantánea del estado del documento
class DocumentMemento {
    private $content;
    private $cursorPosition;
    private $selection;
    private $formatting;
    private $timestamp;
    
    public function __construct(string $content, int $cursorPosition, array $selection, array $formatting) {
        $this->content = $content;
        $this->cursorPosition = $cursorPosition;
        $this->selection = $selection;
        $this->formatting = $formatting;
        $this->timestamp = new DateTime();
    }
    
    public function getContent(): string { return $this->content; }
    public function getCursorPosition(): int { return $this->cursorPosition; }
    public function getSelection(): array { return $this->selection; }
    public function getFormatting(): array { return $this->formatting; }
    public function getTimestamp(): DateTime { return $this->timestamp; }
}

// Originator - Editor de texto
class TextEditor {
    private $content = '';
    private $cursorPosition = 0;
    private $selection = ['start' => 0, 'end' => 0];
    private $formatting = [
        'bold' => false,
        'italic' => false,
        'underline' => false,
        'fontSize' => 12,
        'fontFamily' => 'Arial',
        'color' => '#000000'
    ];
    
    // Métodos de edición
    public function type(string $text): void {
        $before = substr($this->content, 0, $this->cursorPosition);
        $after = substr($this->content, $this->cursorPosition);
        $this->content = $before . $text . $after;
        $this->cursorPosition += strlen($text);
        echo "✏️  Escribiendo: \\"$text\\"\\n";
        echo "   Contenido actual: \\"{$this->content}\\"\\n";
    }
    
    public function deleteSelection(): void {
        if ($this->hasSelection()) {
            $before = substr($this->content, 0, $this->selection['start']);
            $after = substr($this->content, $this->selection['end']);
            $this->content = $before . $after;
            $this->cursorPosition = $this->selection['start'];
            $this->clearSelection();
            echo "🗑️  Texto eliminado\\n";
            echo "   Contenido actual: \\"{$this->content}\\"\\n";
        }
    }
    
    public function setCursorPosition(int $position): void {
        $this->cursorPosition = max(0, min($position, strlen($this->content)));
        echo "📍 Cursor en posición: {$this->cursorPosition}\\n";
    }
    
    public function setSelection(int $start, int $end): void {
        $this->selection['start'] = max(0, min($start, strlen($this->content)));
        $this->selection['end'] = max($this->selection['start'], min($end, strlen($this->content)));
        echo "🎯 Selección: [{$this->selection['start']}, {$this->selection['end']}]\\n";
    }
    
    public function clearSelection(): void {
        $this->selection = ['start' => 0, 'end' => 0];
    }
    
    public function hasSelection(): bool {
        return $this->selection['start'] !== $this->selection['end'];
    }
    
    // Métodos de formato
    public function setBold(bool $bold): void {
        $this->formatting['bold'] = $bold;
        $icon = $bold ? '**' : 'ℹ️';
        $status = $bold ? 'activada' : 'desactivada';
        echo "$icon Negrita: $status\\n";
    }
    
    public function setItalic(bool $italic): void {
        $this->formatting['italic'] = $italic;
        $icon = $italic ? '/' : 'ℹ️';
        $status = $italic ? 'activada' : 'desactivada';
        echo "$icon Cursiva: $status\\n";
    }
    
    public function setFontSize(int $size): void {
        $this->formatting['fontSize'] = $size;
        echo "🔤 Tamaño de fuente: {$size}px\\n";
    }
    
    public function setColor(string $color): void {
        $this->formatting['color'] = $color;
        echo "🎨 Color: $color\\n";
    }
    
    // Crear memento (punto de guardado)
    public function createMemento(): DocumentMemento {
        echo "💾 Creando punto de guardado...\\n";
        return new DocumentMemento(
            $this->content,
            $this->cursorPosition,
            $this->selection,
            $this->formatting
        );
    }
    
    // Restaurar desde memento
    public function restoreFromMemento(DocumentMemento $memento): void {
        echo "🔄 Restaurando desde punto de guardado ({$memento->getTimestamp()->format('H:i:s')})...\\n";
        $this->content = $memento->getContent();
        $this->cursorPosition = $memento->getCursorPosition();
        $this->selection = $memento->getSelection();
        $this->formatting = $memento->getFormatting();
        echo "   Contenido restaurado: \\"{$this->content}\\"\\n";
        echo "   Cursor en posición: {$this->cursorPosition}\\n";
    }
    
    // Estado actual
    public function getStatus(): void {
        echo "\\n📄 Estado del documento:\\n";
        echo "   Contenido: \\"{$this->content}\\"\\n";
        echo "   Cursor: posición {$this->cursorPosition}\\n";
        echo "   Selección: [{$this->selection['start']}, {$this->selection['end']}]\\n";
        echo "   Formato: Negrita={$this->formatting['bold']}, Cursiva={$this->formatting['italic']}, Tamaño={$this->formatting['fontSize']}px\\n";
    }
}

// Caretaker - Historial del editor
class EditorHistory {
    private $editor;
    private $mementos = [];
    private $currentIndex = -1;
    private $maxHistorySize = 50;
    
    public function __construct(TextEditor $editor) {
        $this->editor = $editor;
    }
    
    // Guardar estado actual
    public function saveState(): void {
        // Remover cualquier historial "futuro" si estamos en el medio de la historia
        if ($this->currentIndex < count($this->mementos) - 1) {
            $this->mementos = array_slice($this->mementos, 0, $this->currentIndex + 1);
        }
        
        // Agregar nuevo memento
        $memento = $this->editor->createMemento();
        $this->mementos[] = $memento;
        $this->currentIndex++;
        
        // Mantener límite de historial
        if (count($this->mementos) > $this->maxHistorySize) {
            array_shift($this->mementos);
            $this->currentIndex--;
        }
        
        $total = count($this->mementos);
        echo "💾 Estado guardado. Historial: " . ($this->currentIndex + 1) . "/$total\\n";
    }
    
    // Deshacer (undo)
    public function undo(): bool {
        if ($this->canUndo()) {
            $this->currentIndex--;
            $this->editor->restoreFromMemento($this->mementos[$this->currentIndex]);
            $total = count($this->mementos);
            echo "↩️  Deshecho. Posición en historial: " . ($this->currentIndex + 1) . "/$total\\n";
            return true;
        } else {
            echo "❌ No hay más acciones para deshacer\\n";
            return false;
        }
    }
    
    // Rehacer (redo)
    public function redo(): bool {
        if ($this->canRedo()) {
            $this->currentIndex++;
            $this->editor->restoreFromMemento($this->mementos[$this->currentIndex]);
            $total = count($this->mementos);
            echo "↪️  Rehecho. Posición en historial: " . ($this->currentIndex + 1) . "/$total\\n";
            return true;
        } else {
            echo "❌ No hay más acciones para rehacer\\n";
            return false;
        }
    }
    
    public function canUndo(): bool {
        return $this->currentIndex > 0;
    }
    
    public function canRedo(): bool {
        return $this->currentIndex < count($this->mementos) - 1;
    }
    
    // Mostrar historial
    public function showHistory(): void {
        echo "\\n📜 Historial del editor:\\n";
        foreach ($this->mementos as $index => $memento) {
            $marker = $index === $this->currentIndex ? '👉' : '  ';
            $content = substr($memento->getContent(), 0, 20);
            if (strlen($memento->getContent()) > 20) {
                $content .= '...';
            }
            echo "$marker " . ($index + 1) . ". \\"$content\\" ({$memento->getTimestamp()->format('H:i:s')})\\n";
        }
    }
    
    // Ir a un punto específico en el historial
    public function goToState(int $index): bool {
        if ($index >= 0 && $index < count($this->mementos)) {
            $this->currentIndex = $index;
            $this->editor->restoreFromMemento($this->mementos[$this->currentIndex]);
            $total = count($this->mementos);
            echo "🎯 Saltando a estado " . ($index + 1) . "/$total\\n";
            return true;
        }
        return false;
    }
    
    // Limpiar historial
    public function clearHistory(): void {
        $this->mementos = [];
        $this->currentIndex = -1;
        echo "🗑️  Historial limpiado\\n";
    }
}

// Cliente - Simulación de uso del editor
class EditorSimulator {
    private $editor;
    private $history;
    
    public function __construct() {
        $this->editor = new TextEditor();
        $this->history = new EditorHistory($this->editor);
    }
    
    public function simulate(): void {
        echo "=== Simulación de Editor de Texto con Patrón Memento ===\\n\\n";
        
        // Estado inicial
        echo "--- Estado inicial ---\\n";
        $this->history->saveState();
        $this->editor->getStatus();
        
        // Escribir texto
        echo "\\n--- Escribiendo texto ---\\n";
        $this->editor->type('Hola mundo');
        $this->history->saveState();
        
        // Cambiar formato
        echo "\\n--- Cambiando formato ---\\n";
        $this->editor->setBold(true);
        $this->editor->setFontSize(16);
        $this->history->saveState();
        
        // Más texto
        echo "\\n--- Más texto ---\\n";
        $this->editor->type(' en negrita');
        $this->history->saveState();
        
        // Seleccionar y eliminar
        echo "\\n--- Seleccionar y eliminar ---\\n";
        $this->editor->setSelection(5, 10); // Seleccionar "mundo"
        $this->editor->deleteSelection();
        $this->history->saveState();
        
        // Estado actual
        echo "\\n--- Estado actual ---\\n";
        $this->editor->getStatus();
        
        // Mostrar historial
        $this->history->showHistory();
        
        // Probar undo/redo
        echo "\\n--- Probando undo/redo ---\\n";
        $this->history->undo(); // Deshacer eliminación
        $this->history->undo(); // Deshacer último texto
        $this->history->redo(); // Rehacer último texto
        
        // Estado final
        echo "\\n--- Estado final ---\\n";
        $this->editor->getStatus();
        $this->history->showHistory();
        
        // Ir a un estado específico
        echo "\\n--- Saltando al primer estado ---\\n";
        $this->history->goToState(0);
        $this->editor->getStatus();
    }
}

// Uso del patrón Memento
$simulator = new EditorSimulator();
$simulator->simulate();

echo "\\n🎯 El patrón Memento permite guardar y restaurar estados completos!\\n";
?>`
    },
    relatedPatterns: ["command", "iterator"]
  },
  {
    id: 18,
    name: "State",
    slug: "state",
    description: "Permite a un objeto alterar su comportamiento cuando su estado interno cambia. Parece como si el objeto cambiara su clase.",
    category: "behavioral",
    difficulty: 3,
    icon: "toggle-left",
    color: "from-indigo-500 to-indigo-600",
    tags: ["state", "behavior", "finite-state-machine"],
    architectures: [],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón State es como un semáforo: dependiendo de su estado actual (verde, amarillo, rojo), se comporta de manera diferente ante la misma acción (los autos que se acercan). El semáforo no cambia físicamente, pero su comportamiento cambia completamente según su estado interno.\n\nEste patrón permite a un objeto alterar su comportamiento cuando su estado interno cambia.\n\n**¿Cuándo usarlo?**\n• Cuando tienes un objeto que se comporta de forma diferente dependiendo de su estado actual\n• Cuando tienes una clase con muchas declaraciones condicionales que dependen del estado del objeto\n• Cuando tienes código duplicado entre estados similares y transiciones de una máquina de estados\n• Cuando quieres eliminar condicionales complejas del código principal\n\n**Ventajas:**\n• Principio de responsabilidad única: organiza el código relacionado con estados particulares en clases separadas\n• Principio abierto/cerrado: introduce nuevos estados sin cambiar clases de estado existentes o el contexto\n• Simplifica el código del contexto eliminando voluminosas declaraciones condicionales de máquina de estados\n• Los estados pueden tener sus propias variables de instancia\n\n**Desventajas:**\n• Aplicar el patrón puede ser excesivo si una máquina de estados tiene solo unos pocos estados o rara vez cambia",
    examples: {
      javascript: `// Interfaz State
class PlayerState {
  play(player) {
    throw new Error('play method must be implemented');
  }
  
  pause(player) {
    throw new Error('pause method must be implemented');
  }
  
  stop(player) {
    throw new Error('stop method must be implemented');
  }
  
  next(player) {
    throw new Error('next method must be implemented');
  }
  
  previous(player) {
    throw new Error('previous method must be implemented');
  }
  
  getName() {
    throw new Error('getName method must be implemented');
  }
}

// Estados concretos
class StoppedState extends PlayerState {
  play(player) {
    console.log('▶️  Iniciando reproducción desde el principio');
    player.startPlayback();
    player.setState(player.getPlayingState());
  }
  
  pause(player) {
    console.log('⏸️  No se puede pausar cuando está detenido');
  }
  
  stop(player) {
    console.log('⏹️  Ya está detenido');
  }
  
  next(player) {
    console.log('⏭️  Cambiando a siguiente canción');
    player.nextTrack();
    // Permanece en estado detenido
  }
  
  previous(player) {
    console.log('⏮️  Cambiando a canción anterior');
    player.previousTrack();
    // Permanece en estado detenido
  }
  
  getName() {
    return 'Detenido';
  }
}

class PlayingState extends PlayerState {
  play(player) {
    console.log('▶️  Ya está reproduciendo');
  }
  
  pause(player) {
    console.log('⏸️  Pausando reproducción');
    player.pausePlayback();
    player.setState(player.getPausedState());
  }
  
  stop(player) {
    console.log('⏹️  Deteniendo reproducción');
    player.stopPlayback();
    player.setState(player.getStoppedState());
  }
  
  next(player) {
    console.log('⏭️  Cambiando a siguiente canción y siguiendo reproducción');
    player.nextTrack();
    player.startPlayback();
    // Permanece en estado reproduciendo
  }
  
  previous(player) {
    console.log('⏮️  Cambiando a canción anterior y siguiendo reproducción');
    player.previousTrack();
    player.startPlayback();
    // Permanece en estado reproduciendo
  }
  
  getName() {
    return 'Reproduciendo';
  }
}

class PausedState extends PlayerState {
  play(player) {
    console.log('▶️  Reanudando reproducción');
    player.resumePlayback();
    player.setState(player.getPlayingState());
  }
  
  pause(player) {
    console.log('⏸️  Ya está pausado');
  }
  
  stop(player) {
    console.log('⏹️  Deteniendo desde pausa');
    player.stopPlayback();
    player.setState(player.getStoppedState());
  }
  
  next(player) {
    console.log('⏭️  Cambiando a siguiente canción (permanece pausado)');
    player.nextTrack();
    // Permanece en estado pausado
  }
  
  previous(player) {
    console.log('⏮️  Cambiando a canción anterior (permanece pausado)');
    player.previousTrack();
    // Permanece en estado pausado
  }
  
  getName() {
    return 'Pausado';
  }
}

class LoadingState extends PlayerState {
  play(player) {
    console.log('⏳ Cargando... no se puede reproducir aún');
  }
  
  pause(player) {
    console.log('⏳ Cargando... no se puede pausar aún');
  }
  
  stop(player) {
    console.log('❌ Cancelando carga');
    player.cancelLoading();
    player.setState(player.getStoppedState());
  }
  
  next(player) {
    console.log('⏳ Cargando... espere a que termine');
  }
  
  previous(player) {
    console.log('⏳ Cargando... espere a que termine');
  }
  
  getName() {
    return 'Cargando';
  }
  
  onLoadComplete(player) {
    console.log('✅ Carga completada, listo para reproducir');
    player.setState(player.getStoppedState());
  }
  
  onLoadError(player) {
    console.log('❌ Error al cargar');
    player.setState(player.getStoppedState());
  }
}

// Context - Reproductor de música
class MusicPlayer {
  constructor() {
    // Crear instancias de estados
    this.stoppedState = new StoppedState();
    this.playingState = new PlayingState();
    this.pausedState = new PausedState();
    this.loadingState = new LoadingState();
    
    // Estado inicial
    this.currentState = this.stoppedState;
    
    // Lista de reproducción
    this.playlist = [
      'Bohemian Rhapsody - Queen',
      'Hotel California - Eagles',
      'Stairway to Heaven - Led Zeppelin',
      'Sweet Child O Mine - Guns N Roses',
      'Imagine - John Lennon'
    ];
    this.currentTrackIndex = 0;
    this.position = 0; // Posición en segundos
    this.volume = 50;
  }
  
  // Métodos de estado (delegados al estado actual)
  play() {
    console.log(\`\\n🎵 Comando: PLAY (Estado actual: \${this.currentState.getName()})\`);
    this.currentState.play(this);
  }
  
  pause() {
    console.log(\`\\n⏸️  Comando: PAUSE (Estado actual: \${this.currentState.getName()})\`);
    this.currentState.pause(this);
  }
  
  stop() {
    console.log(\`\\n⏹️  Comando: STOP (Estado actual: \${this.currentState.getName()})\`);
    this.currentState.stop(this);
  }
  
  next() {
    console.log(\`\\n⏭️  Comando: NEXT (Estado actual: \${this.currentState.getName()})\`);
    this.currentState.next(this);
  }
  
  previous() {
    console.log(\`\\n⏮️  Comando: PREVIOUS (Estado actual: \${this.currentState.getName()})\`);
    this.currentState.previous(this);
  }
  
  // Métodos internos del reproductor
  startPlayback() {
    console.log(\`   🎶 Iniciando: \${this.getCurrentTrack()}\`);
    this.position = 0;
  }
  
  resumePlayback() {
    console.log(\`   🎶 Reanudando: \${this.getCurrentTrack()} desde \${this.position}s\`);
  }
  
  pausePlayback() {
    console.log(\`   ⏸️  Pausado en: \${this.position}s\`);
  }
  
  stopPlayback() {
    console.log(\`   ⏹️  Detenido\`);
    this.position = 0;
  }
  
  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    console.log(\`   📀 Cambiado a: \${this.getCurrentTrack()}\`);
    this.position = 0;
  }
  
  previousTrack() {
    this.currentTrackIndex = this.currentTrackIndex === 0 
      ? this.playlist.length - 1 
      : this.currentTrackIndex - 1;
    console.log(\`   📀 Cambiado a: \${this.getCurrentTrack()}\`);
    this.position = 0;
  }
  
  loadTrack(trackIndex) {
    console.log(\`\\n📥 Cargando: \${this.playlist[trackIndex]}\`);
    this.setState(this.loadingState);
    this.currentTrackIndex = trackIndex;
    
    // Simular carga asíncrona
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% éxito
        this.loadingState.onLoadComplete(this);
      } else {
        this.loadingState.onLoadError(this);
      }
    }, 2000);
  }
  
  cancelLoading() {
    console.log(\`   ❌ Carga cancelada\`);
  }
  
  // Gestión de estado
  setState(state) {
    this.currentState = state;
    console.log(\`   🔄 Estado cambiado a: \${state.getName()}\`);
  }
  
  getCurrentState() {
    return this.currentState;
  }
  
  // Getters para estados
  getStoppedState() { return this.stoppedState; }
  getPlayingState() { return this.playingState; }
  getPausedState() { return this.pausedState; }
  getLoadingState() { return this.loadingState; }
  
  // Información del reproductor
  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex];
  }
  
  getStatus() {
    console.log(\`\\n📊 Estado del reproductor:\`);
    console.log(\`   Estado: \${this.currentState.getName()}\`);
    console.log(\`   Canción actual: \${this.getCurrentTrack()}\`);
    console.log(\`   Posición: \${this.position}s\`);
    console.log(\`   Volumen: \${this.volume}%\`);
    console.log(\`   Lista: \${this.currentTrackIndex + 1}/\${this.playlist.length}\`);
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(100, volume));
    console.log(\`🔊 Volumen ajustado a: \${this.volume}%\`);
  }
  
  // Simular progreso de reproducción
  tick() {
    if (this.currentState === this.playingState) {
      this.position++;
      if (this.position >= 180) { // Canción de 3 minutos
        console.log(\`\\n🔚 Canción terminada, siguiente automáticamente\`);
        this.next();
      }
    }
  }
}

// Cliente - Simulador de uso
class PlayerSimulator {
  constructor() {
    this.player = new MusicPlayer();
  }
  
  simulate() {
    console.log('=== Reproductor de Música con Patrón State ===\\n');
    
    // Estado inicial
    this.player.getStatus();
    
    // Intentar pausar cuando está detenido
    this.player.pause();
    
    // Reproducir
    this.player.play();
    this.player.getStatus();
    
    // Pausar
    this.player.pause();
    this.player.getStatus();
    
    // Reanudar
    this.player.play();
    
    // Siguiente canción mientras reproduce
    this.player.next();
    
    // Detener
    this.player.stop();
    
    // Cambiar canciones mientras está detenido
    this.player.next();
    this.player.previous();
    
    // Cargar una nueva canción
    console.log('\\n--- Cargando nueva canción ---');
    this.player.loadTrack(2);
    
    // Intentar reproducir mientras carga
    setTimeout(() => {
      this.player.play();
    }, 500);
    
    // Intentar detener mientras carga
    setTimeout(() => {
      this.player.stop();
    }, 1000);
    
    // Estado final después de un tiempo
    setTimeout(() => {
      console.log('\\n--- Estado final ---');
      this.player.getStatus();
      console.log('\\n🎯 Cada estado maneja los comandos de manera diferente!');
    }, 3000);
  }
  
  interactiveDemo() {
    console.log('\\n--- Demo interactivo ---');
    const commands = ['play', 'pause', 'next', 'play', 'stop', 'previous', 'play'];
    
    commands.forEach((command, index) => {
      setTimeout(() => {
        console.log(\`\\n[Comando \${index + 1}] Ejecutando: \${command.toUpperCase()}\`);
        this.player[command]();
      }, index * 1000);
    });
  }
}

// Uso del patrón State
const simulator = new PlayerSimulator();
simulator.simulate();

// Demo adicional después de 4 segundos
setTimeout(() => {
  simulator.interactiveDemo();
}, 4000);`,
      php: `<?php
// Interfaz State
abstract class PlayerState {
    abstract public function play(MusicPlayer $player): void;
    abstract public function pause(MusicPlayer $player): void;
    abstract public function stop(MusicPlayer $player): void;
    abstract public function next(MusicPlayer $player): void;
    abstract public function previous(MusicPlayer $player): void;
    abstract public function getName(): string;
}

// Estados concretos
class StoppedState extends PlayerState {
    public function play(MusicPlayer $player): void {
        echo "▶️  Iniciando reproducción desde el principio\\n";
        $player->startPlayback();
        $player->setState($player->getPlayingState());
    }
    
    public function pause(MusicPlayer $player): void {
        echo "⏸️  No se puede pausar cuando está detenido\\n";
    }
    
    public function stop(MusicPlayer $player): void {
        echo "⏹️  Ya está detenido\\n";
    }
    
    public function next(MusicPlayer $player): void {
        echo "⏭️  Cambiando a siguiente canción\\n";
        $player->nextTrack();
    }
    
    public function previous(MusicPlayer $player): void {
        echo "⏮️  Cambiando a canción anterior\\n";
        $player->previousTrack();
    }
    
    public function getName(): string {
        return 'Detenido';
    }
}

class PlayingState extends PlayerState {
    public function play(MusicPlayer $player): void {
        echo "▶️  Ya está reproduciendo\\n";
    }
    
    public function pause(MusicPlayer $player): void {
        echo "⏸️  Pausando reproducción\\n";
        $player->pausePlayback();
        $player->setState($player->getPausedState());
    }
    
    public function stop(MusicPlayer $player): void {
        echo "⏹️  Deteniendo reproducción\\n";
        $player->stopPlayback();
        $player->setState($player->getStoppedState());
    }
    
    public function next(MusicPlayer $player): void {
        echo "⏭️  Cambiando a siguiente canción y siguiendo reproducción\\n";
        $player->nextTrack();
        $player->startPlayback();
    }
    
    public function previous(MusicPlayer $player): void {
        echo "⏮️  Cambiando a canción anterior y siguiendo reproducción\\n";
        $player->previousTrack();
        $player->startPlayback();
    }
    
    public function getName(): string {
        return 'Reproduciendo';
    }
}

class PausedState extends PlayerState {
    public function play(MusicPlayer $player): void {
        echo "▶️  Reanudando reproducción\\n";
        $player->resumePlayback();
        $player->setState($player->getPlayingState());
    }
    
    public function pause(MusicPlayer $player): void {
        echo "⏸️  Ya está pausado\\n";
    }
    
    public function stop(MusicPlayer $player): void {
        echo "⏹️  Deteniendo desde pausa\\n";
        $player->stopPlayback();
        $player->setState($player->getStoppedState());
    }
    
    public function next(MusicPlayer $player): void {
        echo "⏭️  Cambiando a siguiente canción (permanece pausado)\\n";
        $player->nextTrack();
    }
    
    public function previous(MusicPlayer $player): void {
        echo "⏮️  Cambiando a canción anterior (permanece pausado)\\n";
        $player->previousTrack();
    }
    
    public function getName(): string {
        return 'Pausado';
    }
}

class LoadingState extends PlayerState {
    public function play(MusicPlayer $player): void {
        echo "⏳ Cargando... no se puede reproducir aún\\n";
    }
    
    public function pause(MusicPlayer $player): void {
        echo "⏳ Cargando... no se puede pausar aún\\n";
    }
    
    public function stop(MusicPlayer $player): void {
        echo "❌ Cancelando carga\\n";
        $player->cancelLoading();
        $player->setState($player->getStoppedState());
    }
    
    public function next(MusicPlayer $player): void {
        echo "⏳ Cargando... espere a que termine\\n";
    }
    
    public function previous(MusicPlayer $player): void {
        echo "⏳ Cargando... espere a que termine\\n";
    }
    
    public function getName(): string {
        return 'Cargando';
    }
    
    public function onLoadComplete(MusicPlayer $player): void {
        echo "✅ Carga completada, listo para reproducir\\n";
        $player->setState($player->getStoppedState());
    }
    
    public function onLoadError(MusicPlayer $player): void {
        echo "❌ Error al cargar\\n";
        $player->setState($player->getStoppedState());
    }
}

// Context - Reproductor de música
class MusicPlayer {
    private $currentState;
    private $stoppedState;
    private $playingState;
    private $pausedState;
    private $loadingState;
    
    private $playlist;
    private $currentTrackIndex = 0;
    private $position = 0;
    private $volume = 50;
    
    public function __construct() {
        // Crear instancias de estados
        $this->stoppedState = new StoppedState();
        $this->playingState = new PlayingState();
        $this->pausedState = new PausedState();
        $this->loadingState = new LoadingState();
        
        // Estado inicial
        $this->currentState = $this->stoppedState;
        
        // Lista de reproducción
        $this->playlist = [
            'Bohemian Rhapsody - Queen',
            'Hotel California - Eagles',
            'Stairway to Heaven - Led Zeppelin',
            'Sweet Child O Mine - Guns N Roses',
            'Imagine - John Lennon'
        ];
    }
    
    // Métodos de estado (delegados al estado actual)
    public function play(): void {
        echo "\\n🎵 Comando: PLAY (Estado actual: {$this->currentState->getName()})\\n";
        $this->currentState->play($this);
    }
    
    public function pause(): void {
        echo "\\n⏸️  Comando: PAUSE (Estado actual: {$this->currentState->getName()})\\n";
        $this->currentState->pause($this);
    }
    
    public function stop(): void {
        echo "\\n⏹️  Comando: STOP (Estado actual: {$this->currentState->getName()})\\n";
        $this->currentState->stop($this);
    }
    
    public function next(): void {
        echo "\\n⏭️  Comando: NEXT (Estado actual: {$this->currentState->getName()})\\n";
        $this->currentState->next($this);
    }
    
    public function previous(): void {
        echo "\\n⏮️  Comando: PREVIOUS (Estado actual: {$this->currentState->getName()})\\n";
        $this->currentState->previous($this);
    }
    
    // Métodos internos del reproductor
    public function startPlayback(): void {
        echo "   🎶 Iniciando: {$this->getCurrentTrack()}\\n";
        $this->position = 0;
    }
    
    public function resumePlayback(): void {
        echo "   🎶 Reanudando: {$this->getCurrentTrack()} desde {$this->position}s\\n";
    }
    
    public function pausePlayback(): void {
        echo "   ⏸️  Pausado en: {$this->position}s\\n";
    }
    
    public function stopPlayback(): void {
        echo "   ⏹️  Detenido\\n";
        $this->position = 0;
    }
    
    public function nextTrack(): void {
        $this->currentTrackIndex = ($this->currentTrackIndex + 1) % count($this->playlist);
        echo "   📀 Cambiado a: {$this->getCurrentTrack()}\\n";
        $this->position = 0;
    }
    
    public function previousTrack(): void {
        $this->currentTrackIndex = $this->currentTrackIndex === 0 
            ? count($this->playlist) - 1 
            : $this->currentTrackIndex - 1;
        echo "   📀 Cambiado a: {$this->getCurrentTrack()}\\n";
        $this->position = 0;
    }
    
    public function loadTrack(int $trackIndex): void {
        echo "\\n📥 Cargando: {$this->playlist[$trackIndex]}\\n";
        $this->setState($this->loadingState);
        $this->currentTrackIndex = $trackIndex;
        
        // Simular carga (en aplicación real sería asíncrono)
        if (rand(1, 10) > 1) { // 90% éxito
            $this->loadingState->onLoadComplete($this);
        } else {
            $this->loadingState->onLoadError($this);
        }
    }
    
    public function cancelLoading(): void {
        echo "   ❌ Carga cancelada\\n";
    }
    
    // Gestión de estado
    public function setState(PlayerState $state): void {
        $this->currentState = $state;
        echo "   🔄 Estado cambiado a: {$state->getName()}\\n";
    }
    
    public function getCurrentState(): PlayerState {
        return $this->currentState;
    }
    
    // Getters para estados
    public function getStoppedState(): PlayerState { return $this->stoppedState; }
    public function getPlayingState(): PlayerState { return $this->playingState; }
    public function getPausedState(): PlayerState { return $this->pausedState; }
    public function getLoadingState(): PlayerState { return $this->loadingState; }
    
    // Información del reproductor
    public function getCurrentTrack(): string {
        return $this->playlist[$this->currentTrackIndex];
    }
    
    public function getStatus(): void {
        echo "\\n📊 Estado del reproductor:\\n";
        echo "   Estado: {$this->currentState->getName()}\\n";
        echo "   Canción actual: {$this->getCurrentTrack()}\\n";
        echo "   Posición: {$this->position}s\\n";
        echo "   Volumen: {$this->volume}%\\n";
        echo "   Lista: " . ($this->currentTrackIndex + 1) . "/" . count($this->playlist) . "\\n";
    }
    
    public function setVolume(int $volume): void {
        $this->volume = max(0, min(100, $volume));
        echo "🔊 Volumen ajustado a: {$this->volume}%\\n";
    }
    
    // Simular progreso de reproducción
    public function tick(): void {
        if ($this->currentState === $this->playingState) {
            $this->position++;
            if ($this->position >= 180) { // Canción de 3 minutos
                echo "\\n🔚 Canción terminada, siguiente automáticamente\\n";
                $this->next();
            }
        }
    }
}

// Cliente - Simulador de uso
class PlayerSimulator {
    private $player;
    
    public function __construct() {
        $this->player = new MusicPlayer();
    }
    
    public function simulate(): void {
        echo "=== Reproductor de Música con Patrón State ===\\n\\n";
        
        // Estado inicial
        $this->player->getStatus();
        
        // Intentar pausar cuando está detenido
        $this->player->pause();
        
        // Reproducir
        $this->player->play();
        $this->player->getStatus();
        
        // Pausar
        $this->player->pause();
        $this->player->getStatus();
        
        // Reanudar
        $this->player->play();
        
        // Siguiente canción mientras reproduce
        $this->player->next();
        
        // Detener
        $this->player->stop();
        
        // Cambiar canciones mientras está detenido
        $this->player->next();
        $this->player->previous();
        
        // Cargar una nueva canción
        echo "\\n--- Cargando nueva canción ---\\n";
        $this->player->loadTrack(2);
        
        // Estado final
        echo "\\n--- Estado final ---\\n";
        $this->player->getStatus();
        echo "\\n🎯 Cada estado maneja los comandos de manera diferente!\\n";
    }
    
    public function interactiveDemo(): void {
        echo "\\n--- Demo interactivo ---\\n";
        $commands = ['play', 'pause', 'next', 'play', 'stop', 'previous', 'play'];
        
        foreach ($commands as $index => $command) {
            echo "\\n[Comando " . ($index + 1) . "] Ejecutando: " . strtoupper($command) . "\\n";
            $this->player->$command();
        }
    }
}

// Uso del patrón State
$simulator = new PlayerSimulator();
$simulator->simulate();
$simulator->interactiveDemo();
?>`
    },
    relatedPatterns: ["strategy", "command"]
  },

  // ARCHITECTURAL PATTERNS
  {
    id: 19,
    name: "Repository",
    slug: "repository",
    description: "Encapsula la lógica necesaria para acceder a fuentes de datos. Centraliza la funcionalidad común de acceso a datos, proporcionando un mejor mantenimiento y desacoplando la infraestructura.",
    category: "architectural",
    difficulty: 2,
    icon: "database",
    color: "from-slate-500 to-slate-600",
    tags: ["data-access", "separation", "persistence"],
    architectures: ["ddd", "hexagonal"],
    languages: ["javascript", "php"],
    frameworks: ["symfony"],
    content: "El patrón Repository es como tener un bibliotecario personal: no importa si los libros están en estantes físicos, archivos digitales o en otra biblioteca, el bibliotecario te consigue cualquier libro que necesites usando una interfaz simple y consistente.\n\nEste patrón encapsula la lógica de acceso a datos y proporciona una interfaz más orientada a objetos.\n\n**¿Cuándo usarlo?**\n• Cuando quieres centralizar el acceso a datos\n• Cuando necesitas cambiar entre diferentes fuentes de datos\n• Cuando quieres hacer el código más testeable\n• Cuando trabajas con Domain Driven Design\n\n**Ventajas:**\n• Centraliza la lógica de acceso a datos\n• Facilita el testing con mocks\n• Reduce duplicación de código\n• Mejor separación de responsabilidades\n\n**Desventajas:**\n• Puede agregar complejidad innecesaria en aplicaciones simples\n• Riesgo de crear repositorios demasiado genéricos",
    examples: {
      javascript: `// Ejemplo simplificado del patrón Repository
class UserRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  
  async findById(id) {
    return await this.dataSource.findUser(id);
  }
  
  async findByEmail(email) {
    return await this.dataSource.findUserByEmail(email);
  }
  
  async save(user) {
    return await this.dataSource.saveUser(user);
  }
  
  async delete(id) {
    return await this.dataSource.deleteUser(id);
  }
}

// Uso
const userRepo = new UserRepository(databaseConnection);
const user = await userRepo.findById(123);`,
      php: `<?php
interface UserRepositoryInterface {
    public function findById(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function save(User $user): User;
    public function delete(int $id): bool;
}

class DatabaseUserRepository implements UserRepositoryInterface {
    private $connection;
    
    public function __construct($connection) {
        $this->connection = $connection;
    }
    
    public function findById(int $id): ?User {
        // Lógica de base de datos
        $stmt = $this->connection->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $data = $stmt->fetch();
        
        return $data ? new User($data) : null;
    }
    
    public function findByEmail(string $email): ?User {
        // Lógica de base de datos
        $stmt = $this->connection->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $data = $stmt->fetch();
        
        return $data ? new User($data) : null;
    }
    
    public function save(User $user): User {
        // Lógica para guardar usuario
        if ($user->getId()) {
            // Actualizar
            $stmt = $this->connection->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
            $stmt->execute([$user->getName(), $user->getEmail(), $user->getId()]);
        } else {
            // Crear nuevo
            $stmt = $this->connection->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
            $stmt->execute([$user->getName(), $user->getEmail()]);
            $user->setId($this->connection->lastInsertId());
        }
        
        return $user;
    }
    
    public function delete(int $id): bool {
        $stmt = $this->connection->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}

// Uso
$userRepo = new DatabaseUserRepository($pdo);
$user = $userRepo->findById(123);
?>`
    },
    relatedPatterns: ["factory-method", "strategy"]
  },
  {
    id: 20,
    name: "MVC",
    slug: "mvc",
    description: "Separa la aplicación en tres componentes interconectados: Modelo (datos), Vista (interfaz) y Controlador (lógica de control).",
    category: "architectural",
    difficulty: 2,
    icon: "layout-grid",
    color: "from-green-500 to-green-600",
    tags: ["separation", "ui", "architecture"],
    architectures: ["mvc"],
    languages: ["javascript", "php"],
    frameworks: ["vue3", "symfony"],
    content: "El patrón MVC es como un restaurante bien organizado: el chef (Modelo) prepara la comida y maneja los ingredientes, el mesero (Controlador) toma tu orden y coordina entre tú y la cocina, y el ambiente del restaurante (Vista) es lo que ves y experimentas como cliente.\n\nEste patrón separa la aplicación en tres componentes que manejan diferentes aspectos.\n\n**¿Cuándo usarlo?**\n• En aplicaciones web complejas\n• Cuando múltiples desarrolladores trabajan en la misma aplicación\n• Cuando necesitas diferentes vistas para los mismos datos\n• Para facilitar el testing y mantenimiento\n\n**Ventajas:**\n• Clara separación de responsabilidades\n• Facilita el trabajo en equipo\n• Reutilización de componentes\n• Más fácil de testear\n\n**Desventajas:**\n• Puede ser excesivo para aplicaciones simples\n• Curva de aprendizaje inicial\n• Posible over-engineering",
    examples: {
      javascript: `// Modelo - Maneja los datos y lógica de negocio
class UserModel {
  constructor() {
    this.users = [
      { id: 1, name: 'Juan', email: 'juan@email.com' },
      { id: 2, name: 'María', email: 'maria@email.com' }
    ];
  }
  
  getAllUsers() {
    return this.users;
  }
  
  getUserById(id) {
    return this.users.find(user => user.id === id);
  }
  
  addUser(user) {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }
  
  updateUser(id, userData) {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, userData);
    }
    return user;
  }
  
  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}

// Vista - Maneja la presentación
class UserView {
  constructor() {
    this.container = document.getElementById('user-container');
  }
  
  displayUsers(users) {
    this.container.innerHTML = '';
    
    const userList = document.createElement('div');
    userList.className = 'user-list';
    
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.className = 'user-item';
      userElement.innerHTML = \`
        <h3>\${user.name}</h3>
        <p>\${user.email}</p>
        <button onclick="editUser(\${user.id})">Editar</button>
        <button onclick="deleteUser(\${user.id})">Eliminar</button>
      \`;
      userList.appendChild(userElement);
    });
    
    this.container.appendChild(userList);
  }
  
  displayUserForm(user = null) {
    const form = document.createElement('form');
    form.innerHTML = \`
      <h3>\${user ? 'Editar' : 'Agregar'} Usuario</h3>
      <input type="text" id="name" placeholder="Nombre" value="\${user?.name || ''}" required>
      <input type="email" id="email" placeholder="Email" value="\${user?.email || ''}" required>
      <button type="submit">\${user ? 'Actualizar' : 'Agregar'}</button>
      <button type="button" onclick="cancelForm()">Cancelar</button>
    \`;
    
    this.container.innerHTML = '';
    this.container.appendChild(form);
    
    return form;
  }
  
  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = \`message \${type}\`;
    messageDiv.textContent = message;
    
    this.container.insertBefore(messageDiv, this.container.firstChild);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
}

// Controlador - Coordina entre Modelo y Vista
class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentEditingUser = null;
  }
  
  init() {
    this.showAllUsers();
    this.bindEvents();
  }
  
  showAllUsers() {
    const users = this.model.getAllUsers();
    this.view.displayUsers(users);
  }
  
  showAddUserForm() {
    const form = this.view.displayUserForm();
    this.bindFormEvents(form);
  }
  
  showEditUserForm(userId) {
    const user = this.model.getUserById(parseInt(userId));
    if (user) {
      this.currentEditingUser = user;
      const form = this.view.displayUserForm(user);
      this.bindFormEvents(form);
    } else {
      this.view.showMessage('Usuario no encontrado', 'error');
    }
  }
  
  addUser(userData) {
    try {
      const newUser = this.model.addUser(userData);
      this.view.showMessage(\`Usuario \${newUser.name} agregado exitosamente\`, 'success');
      this.showAllUsers();
    } catch (error) {
      this.view.showMessage('Error al agregar usuario', 'error');
    }
  }
  
  updateUser(userData) {
    try {
      if (this.currentEditingUser) {
        const updatedUser = this.model.updateUser(this.currentEditingUser.id, userData);
        this.view.showMessage(\`Usuario \${updatedUser.name} actualizado exitosamente\`, 'success');
        this.currentEditingUser = null;
        this.showAllUsers();
      }
    } catch (error) {
      this.view.showMessage('Error al actualizar usuario', 'error');
    }
  }
  
  deleteUser(userId) {
    try {
      const deletedUser = this.model.deleteUser(parseInt(userId));
      if (deletedUser) {
        this.view.showMessage(\`Usuario \${deletedUser.name} eliminado\`, 'success');
        this.showAllUsers();
      } else {
        this.view.showMessage('Usuario no encontrado', 'error');
      }
    } catch (error) {
      this.view.showMessage('Error al eliminar usuario', 'error');
    }
  }
  
  bindEvents() {
    // Hacer funciones globales para simplicidad del ejemplo
    window.editUser = (id) => this.showEditUserForm(id);
    window.deleteUser = (id) => this.deleteUser(id);
    window.cancelForm = () => this.showAllUsers();
    window.addNewUser = () => this.showAddUserForm();
  }
  
  bindFormEvents(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const userData = {
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value
      };
      
      if (this.currentEditingUser) {
        this.updateUser(userData);
      } else {
        this.addUser(userData);
      }
    });
  }
}

// Inicialización de la aplicación MVC
document.addEventListener('DOMContentLoaded', () => {
  const model = new UserModel();
  const view = new UserView();
  const controller = new UserController(model, view);
  
  controller.init();
  
  // Agregar botón para nuevo usuario
  const addButton = document.createElement('button');
  addButton.textContent = 'Agregar Nuevo Usuario';
  addButton.onclick = () => controller.showAddUserForm();
  document.body.insertBefore(addButton, document.getElementById('user-container'));
});`,
      php: `<?php
// Modelo - Maneja los datos y lógica de negocio
class UserModel {
    private $users;
    
    public function __construct() {
        // En una aplicación real, esto vendría de una base de datos
        $this->users = [
            ['id' => 1, 'name' => 'Juan', 'email' => 'juan@email.com'],
            ['id' => 2, 'name' => 'María', 'email' => 'maria@email.com']
        ];
    }
    
    public function getAllUsers(): array {
        return $this->users;
    }
    
    public function getUserById(int $id): ?array {
        foreach ($this->users as $user) {
            if ($user['id'] === $id) {
                return $user;
            }
        }
        return null;
    }
    
    public function addUser(array $userData): array {
        $userData['id'] = count($this->users) + 1;
        $this->users[] = $userData;
        return $userData;
    }
    
    public function updateUser(int $id, array $userData): ?array {
        foreach ($this->users as &$user) {
            if ($user['id'] === $id) {
                $user = array_merge($user, $userData);
                return $user;
            }
        }
        return null;
    }
    
    public function deleteUser(int $id): bool {
        foreach ($this->users as $index => $user) {
            if ($user['id'] === $id) {
                unset($this->users[$index]);
                $this->users = array_values($this->users); // Reindexar
                return true;
            }
        }
        return false;
    }
}

// Vista - Maneja la presentación
class UserView {
    public function displayUsers(array $users): string {
        $html = '<div class="user-list">';
        $html .= '<h2>Lista de Usuarios</h2>';
        
        foreach ($users as $user) {
            $html .= '<div class="user-item">';
            $html .= '<h3>' . htmlspecialchars($user['name']) . '</h3>';
            $html .= '<p>' . htmlspecialchars($user['email']) . '</p>';
            $html .= '<a href="?action=edit&id=' . $user['id'] . '">Editar</a> | ';
            $html .= '<a href="?action=delete&id=' . $user['id'] . '" onclick="return confirm(\'¿Estás seguro?\')">Eliminar</a>';
            $html .= '</div>';
        }
        
        $html .= '</div>';
        $html .= '<a href="?action=add">Agregar Nuevo Usuario</a>';
        
        return $html;
    }
    
    public function displayUserForm(?array $user = null): string {
        $isEdit = $user !== null;
        $title = $isEdit ? 'Editar Usuario' : 'Agregar Usuario';
        $action = $isEdit ? 'update' : 'create';
        
        $html = '<form method="POST" action="?action=' . $action . '">';
        $html .= '<h2>' . $title . '</h2>';
        
        if ($isEdit) {
            $html .= '<input type="hidden" name="id" value="' . $user['id'] . '">';
        }
        
        $html .= '<div>';
        $html .= '<label for="name">Nombre:</label>';
        $html .= '<input type="text" id="name" name="name" value="' . 
                 htmlspecialchars($user['name'] ?? '') . '" required>';
        $html .= '</div>';
        
        $html .= '<div>';
        $html .= '<label for="email">Email:</label>';
        $html .= '<input type="email" id="email" name="email" value="' . 
                 htmlspecialchars($user['email'] ?? '') . '" required>';
        $html .= '</div>';
        
        $html .= '<div>';
        $html .= '<button type="submit">' . ($isEdit ? 'Actualizar' : 'Agregar') . '</button>';
        $html .= '<a href="?">Cancelar</a>';
        $html .= '</div>';
        
        $html .= '</form>';
        
        return $html;
    }
    
    public function displayMessage(string $message, string $type = 'info'): string {
        return '<div class="message ' . $type . '">' . htmlspecialchars($message) . '</div>';
    }
    
    public function render(string $content): void {
        echo '<!DOCTYPE html>';
        echo '<html><head>';
        echo '<title>Sistema de Usuarios - MVC</title>';
        echo '<style>';
        echo '.user-item { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }';
        echo '.message { padding: 10px; margin: 10px 0; border-radius: 4px; }';
        echo '.message.success { background: #d4edda; color: #155724; }';
        echo '.message.error { background: #f8d7da; color: #721c24; }';
        echo 'form div { margin: 10px 0; }';
        echo 'input { width: 200px; padding: 5px; }';
        echo 'button, a { padding: 8px 16px; margin: 5px; text-decoration: none; }';
        echo '</style>';
        echo '</head><body>';
        echo $content;
        echo '</body></html>';
    }
}

// Controlador - Coordina entre Modelo y Vista
class UserController {
    private $model;
    private $view;
    
    public function __construct(UserModel $model, UserView $view) {
        $this->model = $model;
        $this->view = $view;
    }
    
    public function handleRequest(): void {
        $action = $_GET['action'] ?? 'index';
        $content = '';
        
        switch ($action) {
            case 'index':
                $content = $this->showAllUsers();
                break;
                
            case 'add':
                $content = $this->showAddUserForm();
                break;
                
            case 'edit':
                $content = $this->showEditUserForm();
                break;
                
            case 'create':
                $content = $this->createUser();
                break;
                
            case 'update':
                $content = $this->updateUser();
                break;
                
            case 'delete':
                $content = $this->deleteUser();
                break;
                
            default:
                $content = $this->showAllUsers();
        }
        
        $this->view->render($content);
    }
    
    private function showAllUsers(): string {
        $users = $this->model->getAllUsers();
        return $this->view->displayUsers($users);
    }
    
    private function showAddUserForm(): string {
        return $this->view->displayUserForm();
    }
    
    private function showEditUserForm(): string {
        $id = (int)($_GET['id'] ?? 0);
        $user = $this->model->getUserById($id);
        
        if ($user) {
            return $this->view->displayUserForm($user);
        } else {
            $message = $this->view->displayMessage('Usuario no encontrado', 'error');
            return $message . $this->showAllUsers();
        }
    }
    
    private function createUser(): string {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userData = [
                'name' => $_POST['name'] ?? '',
                'email' => $_POST['email'] ?? ''
            ];
            
            try {
                $newUser = $this->model->addUser($userData);
                $message = $this->view->displayMessage(
                    "Usuario {$newUser['name']} agregado exitosamente", 
                    'success'
                );
                return $message . $this->showAllUsers();
            } catch (Exception $e) {
                $message = $this->view->displayMessage('Error al agregar usuario', 'error');
                return $message . $this->view->displayUserForm();
            }
        }
        
        return $this->showAddUserForm();
    }
    
    private function updateUser(): string {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = (int)($_POST['id'] ?? 0);
            $userData = [
                'name' => $_POST['name'] ?? '',
                'email' => $_POST['email'] ?? ''
            ];
            
            try {
                $updatedUser = $this->model->updateUser($id, $userData);
                if ($updatedUser) {
                    $message = $this->view->displayMessage(
                        "Usuario {$updatedUser['name']} actualizado exitosamente", 
                        'success'
                    );
                    return $message . $this->showAllUsers();
                } else {
                    $message = $this->view->displayMessage('Usuario no encontrado', 'error');
                    return $message . $this->showAllUsers();
                }
            } catch (Exception $e) {
                $message = $this->view->displayMessage('Error al actualizar usuario', 'error');
                return $message . $this->showEditUserForm();
            }
        }
        
        return $this->showAllUsers();
    }
    
    private function deleteUser(): string {
        $id = (int)($_GET['id'] ?? 0);
        
        try {
            $success = $this->model->deleteUser($id);
            if ($success) {
                $message = $this->view->displayMessage('Usuario eliminado exitosamente', 'success');
            } else {
                $message = $this->view->displayMessage('Usuario no encontrado', 'error');
            }
            return $message . $this->showAllUsers();
        } catch (Exception $e) {
            $message = $this->view->displayMessage('Error al eliminar usuario', 'error');
            return $message . $this->showAllUsers();
        }
    }
}

// Punto de entrada de la aplicación
$model = new UserModel();
$view = new UserView();
$controller = new UserController($model, $view);

$controller->handleRequest();
?>`
    },
    relatedPatterns: ["observer", "strategy"]
  },
  {
    id: 21,
    name: "MVVM",
    slug: "mvvm",
    description: "Separa la lógica de presentación de la lógica de negocio mediante binding bidireccional entre Vista y ViewModel.",
    category: "architectural",
    difficulty: 3,
    icon: "layers-3",
    color: "from-purple-500 to-purple-600",
    tags: ["binding", "separation", "ui"],
    architectures: ["mvvm"],
    languages: ["javascript"],
    frameworks: ["vue3"],
    content: "El patrón MVVM es como tener un asistente personal inteligente (ViewModel) que traduce automáticamente entre tú (Vista) y tu oficina (Modelo). Cuando pides algo, el asistente lo traduce al lenguaje de la oficina, y cuando la oficina tiene actualizaciones, el asistente te informa automáticamente.\n\nEste patrón facilita el binding bidireccional entre la vista y los datos.\n\n**¿Cuándo usarlo?**\n• En aplicaciones con interfaces complejas\n• Cuando necesitas binding bidireccional\n• En frameworks como Vue.js, Angular, o WPF\n• Cuando quieres separar lógica de vista de lógica de negocio\n\n**Ventajas:**\n• Binding automático entre vista y datos\n• Mejor testabilidad del ViewModel\n• Separación clara de responsabilidades\n• Reutilización de ViewModels\n\n**Desventajas:**\n• Complejidad adicional\n• Curva de aprendizaje\n• Posible over-engineering para apps simples",
    examples: {
      javascript: `// Ejemplo con Vue.js - MVVM Pattern

// Modelo - Maneja los datos y lógica de negocio
class TaskModel {
  constructor() {
    this.tasks = [
      { id: 1, title: 'Aprender MVVM', completed: false, priority: 'high' },
      { id: 2, title: 'Completar proyecto', completed: true, priority: 'medium' },
      { id: 3, title: 'Revisar código', completed: false, priority: 'low' }
    ];
  }
  
  getAllTasks() {
    return [...this.tasks];
  }
  
  addTask(task) {
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      priority: task.priority || 'medium'
    };
    this.tasks.push(newTask);
    return newTask;
  }
  
  updateTask(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
    }
    return task;
  }
  
  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }
  
  getTasksByFilter(filter) {
    switch (filter) {
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'pending':
        return this.tasks.filter(t => !t.completed);
      case 'high':
        return this.tasks.filter(t => t.priority === 'high');
      default:
        return this.tasks;
    }
  }
}

// ViewModel - Conecta Modelo y Vista con lógica de presentación
class TaskViewModel {
  constructor(model) {
    this.model = model;
    
    // Estado reactivo (en Vue.js sería con ref/reactive)
    this.state = Vue.reactive({
      tasks: [],
      newTaskTitle: '',
      newTaskPriority: 'medium',
      filter: 'all',
      editingTask: null,
      editTitle: '',
      showCompleted: true,
      searchTerm: ''
    });
    
    // Cargar datos iniciales
    this.loadTasks();
  }
  
  // Computed properties - Se actualizan automáticamente
  get filteredTasks() {
    let tasks = this.state.tasks;
    
    // Filtrar por búsqueda
    if (this.state.searchTerm) {
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por estado
    if (!this.state.showCompleted) {
      tasks = tasks.filter(task => !task.completed);
    }
    
    // Filtrar por filtro seleccionado
    switch (this.state.filter) {
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'pending':
        return tasks.filter(t => !t.completed);
      case 'high':
        return tasks.filter(t => t.priority === 'high');
      default:
        return tasks;
    }
  }
  
  get taskStats() {
    const total = this.state.tasks.length;
    const completed = this.state.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = this.state.tasks.filter(t => t.priority === 'high' && !t.completed).length;
    
    return { total, completed, pending, highPriority };
  }
  
  // Métodos para manejar acciones de la vista
  loadTasks() {
    this.state.tasks = this.model.getAllTasks();
  }
  
  addTask() {
    if (this.state.newTaskTitle.trim()) {
      const newTask = this.model.addTask({
        title: this.state.newTaskTitle.trim(),
        priority: this.state.newTaskPriority
      });
      
      this.state.tasks.push(newTask);
      this.state.newTaskTitle = '';
      this.state.newTaskPriority = 'medium';
    }
  }
  
  toggleTask(taskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.model.updateTask(taskId, { completed: task.completed });
    }
  }
  
  deleteTask(taskId) {
    this.model.deleteTask(taskId);
    const index = this.state.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      this.state.tasks.splice(index, 1);
    }
  }
  
  startEdit(task) {
    this.state.editingTask = task.id;
    this.state.editTitle = task.title;
  }
  
  saveEdit() {
    if (this.state.editTitle.trim()) {
      const task = this.state.tasks.find(t => t.id === this.state.editingTask);
      if (task) {
        task.title = this.state.editTitle.trim();
        this.model.updateTask(task.id, { title: task.title });
      }
    }
    this.cancelEdit();
  }
  
  cancelEdit() {
    this.state.editingTask = null;
    this.state.editTitle = '';
  }
  
  updatePriority(taskId, priority) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.priority = priority;
      this.model.updateTask(taskId, { priority });
    }
  }
  
  setFilter(filter) {
    this.state.filter = filter;
  }
  
  clearCompleted() {
    const completedTasks = this.state.tasks.filter(t => t.completed);
    completedTasks.forEach(task => {
      this.model.deleteTask(task.id);
    });
    this.state.tasks = this.state.tasks.filter(t => !t.completed);
  }
}

// Vista - Template de Vue.js con binding bidireccional
const TaskApp = {
  setup() {
    const model = new TaskModel();
    const viewModel = new TaskViewModel(model);
    
    return {
      vm: viewModel,
      state: viewModel.state,
      filteredTasks: Vue.computed(() => viewModel.filteredTasks),
      taskStats: Vue.computed(() => viewModel.taskStats)
    };
  },
  
  template: \`
    <div class="task-app">
      <header class="app-header">
        <h1>Task Manager - MVVM Pattern</h1>
        <div class="stats">
          <span class="stat">Total: {{ taskStats.total }}</span>
          <span class="stat">Pendientes: {{ taskStats.pending }}</span>
          <span class="stat">Completadas: {{ taskStats.completed }}</span>
          <span class="stat priority-high">Alta prioridad: {{ taskStats.highPriority }}</span>
        </div>
      </header>
      
      <!-- Formulario para agregar tareas - Binding bidireccional -->
      <div class="add-task-form">
        <input 
          v-model="state.newTaskTitle" 
          @keyup.enter="vm.addTask()"
          placeholder="Nueva tarea..."
          class="task-input"
        />
        <select v-model="state.newTaskPriority" class="priority-select">
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button @click="vm.addTask()" :disabled="!state.newTaskTitle.trim()">
          Agregar
        </button>
      </div>
      
      <!-- Controles de filtro -->
      <div class="filters">
        <input 
          v-model="state.searchTerm" 
          placeholder="Buscar tareas..."
          class="search-input"
        />
        
        <div class="filter-buttons">
          <button 
            @click="vm.setFilter('all')"
            :class="{ active: state.filter === 'all' }"
          >
            Todas
          </button>
          <button 
            @click="vm.setFilter('pending')"
            :class="{ active: state.filter === 'pending' }"
          >
            Pendientes
          </button>
          <button 
            @click="vm.setFilter('completed')"
            :class="{ active: state.filter === 'completed' }"
          >
            Completadas
          </button>
          <button 
            @click="vm.setFilter('high')"
            :class="{ active: state.filter === 'high' }"
          >
            Alta Prioridad
          </button>
        </div>
        
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="state.showCompleted"
          />
          Mostrar completadas
        </label>
        
        <button 
          @click="vm.clearCompleted()" 
          v-if="taskStats.completed > 0"
          class="clear-button"
        >
          Limpiar completadas
        </button>
      </div>
      
      <!-- Lista de tareas -->
      <div class="task-list">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id"
          class="task-item"
          :class="{ 
            completed: task.completed, 
            editing: state.editingTask === task.id,
            'priority-high': task.priority === 'high'
          }"
        >
          <!-- Modo normal -->
          <template v-if="state.editingTask !== task.id">
            <input 
              type="checkbox"
              :checked="task.completed"
              @change="vm.toggleTask(task.id)"
              class="task-checkbox"
            />
            
            <span class="task-title" @dblclick="vm.startEdit(task)">
              {{ task.title }}
            </span>
            
            <select 
              :value="task.priority"
              @change="vm.updatePriority(task.id, $event.target.value)"
              class="task-priority"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            
            <div class="task-actions">
              <button @click="vm.startEdit(task)" class="edit-btn">
                Editar
              </button>
              <button @click="vm.deleteTask(task.id)" class="delete-btn">
                Eliminar
              </button>
            </div>
          </template>
          
          <!-- Modo edición -->
          <template v-else>
            <input 
              v-model="state.editTitle"
              @keyup.enter="vm.saveEdit()"
              @keyup.escape="vm.cancelEdit()"
              @blur="vm.saveEdit()"
              class="edit-input"
              ref="editInput"
            />
            <div class="edit-actions">
              <button @click="vm.saveEdit()" class="save-btn">
                Guardar
              </button>
              <button @click="vm.cancelEdit()" class="cancel-btn">
                Cancelar
              </button>
            </div>
          </template>
        </div>
        
        <div v-if="filteredTasks.length === 0" class="empty-state">
          <p>{{ state.tasks.length === 0 ? 'No hay tareas' : 'No se encontraron tareas' }}</p>
        </div>
      </div>
    </div>
  \`
};

// Inicializar la aplicación Vue.js
const { createApp } = Vue;

createApp(TaskApp).mount('#app');

// HTML necesario:
/*
<div id="app"></div>

<style>
.task-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.stat {
  padding: 5px 10px;
  background: #f0f0f0;
  border-radius: 4px;
}

.priority-high {
  background: #ffebee;
  color: #c62828;
}

.add-task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-buttons {
  display: flex;
  gap: 5px;
}

.filter-buttons button.active {
  background: #007bff;
  color: white;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 5px;
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-title {
  flex: 1;
  cursor: pointer;
}

.task-actions {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>
*/`,
      php: `<?php
// El patrón MVVM es principalmente utilizado en frameworks frontend
// En PHP, se puede simular con una aproximación usando templates y binding

// Modelo - Datos y lógica de negocio
class TaskModel {
    private $tasks;
    
    public function __construct() {
        $this->tasks = [
            ['id' => 1, 'title' => 'Aprender MVVM', 'completed' => false, 'priority' => 'high'],
            ['id' => 2, 'title' => 'Completar proyecto', 'completed' => true, 'priority' => 'medium'],
            ['id' => 3, 'title' => 'Revisar código', 'completed' => false, 'priority' => 'low']
        ];
    }
    
    public function getAllTasks(): array {
        return $this->tasks;
    }
    
    public function addTask(array $task): array {
        $newTask = [
            'id' => time(),
            'title' => $task['title'],
            'completed' => false,
            'priority' => $task['priority'] ?? 'medium'
        ];
        $this->tasks[] = $newTask;
        return $newTask;
    }
    
    public function updateTask(int $id, array $updates): ?array {
        foreach ($this->tasks as &$task) {
            if ($task['id'] === $id) {
                $task = array_merge($task, $updates);
                return $task;
            }
        }
        return null;
    }
    
    public function deleteTask(int $id): bool {
        foreach ($this->tasks as $index => $task) {
            if ($task['id'] === $id) {
                unset($this->tasks[$index]);
                $this->tasks = array_values($this->tasks);
                return true;
            }
        }
        return false;
    }
}

// ViewModel - Lógica de presentación y estado
class TaskViewModel {
    private $model;
    private $state;
    
    public function __construct(TaskModel $model) {
        $this->model = $model;
        $this->state = [
            'tasks' => $this->model->getAllTasks(),
            'filter' => $_GET['filter'] ?? 'all',
            'search' => $_GET['search'] ?? '',
            'showCompleted' => $_GET['showCompleted'] ?? true
        ];
    }
    
    public function getFilteredTasks(): array {
        $tasks = $this->state['tasks'];
        
        // Filtrar por búsqueda
        if (!empty($this->state['search'])) {
            $tasks = array_filter($tasks, function($task) {
                return stripos($task['title'], $this->state['search']) !== false;
            });
        }
        
        // Filtrar por estado
        switch ($this->state['filter']) {
            case 'completed':
                $tasks = array_filter($tasks, function($task) {
                    return $task['completed'];
                });
                break;
            case 'pending':
                $tasks = array_filter($tasks, function($task) {
                    return !$task['completed'];
                });
                break;
            case 'high':
                $tasks = array_filter($tasks, function($task) {
                    return $task['priority'] === 'high';
                });
                break;
        }
        
        return array_values($tasks);
    }
    
    public function getTaskStats(): array {
        $tasks = $this->state['tasks'];
        $total = count($tasks);
        $completed = count(array_filter($tasks, function($t) { return $t['completed']; }));
        $pending = $total - $completed;
        $highPriority = count(array_filter($tasks, function($t) { 
            return $t['priority'] === 'high' && !$t['completed']; 
        }));
        
        return compact('total', 'completed', 'pending', 'highPriority');
    }
    
    public function getState(): array {
        return $this->state;
    }
    
    public function handleAction(string $action, array $data = []): array {
        $result = ['success' => false, 'message' => ''];
        
        switch ($action) {
            case 'add':
                if (!empty($data['title'])) {
                    $this->model->addTask($data);
                    $this->state['tasks'] = $this->model->getAllTasks();
                    $result = ['success' => true, 'message' => 'Tarea agregada'];
                }
                break;
                
            case 'toggle':
                if (isset($data['id'])) {
                    $task = null;
                    foreach ($this->state['tasks'] as &$t) {
                        if ($t['id'] == $data['id']) {
                            $t['completed'] = !$t['completed'];
                            $task = $t;
                            break;
                        }
                    }
                    if ($task) {
                        $this->model->updateTask($data['id'], ['completed' => $task['completed']]);
                        $result = ['success' => true, 'message' => 'Tarea actualizada'];
                    }
                }
                break;
                
            case 'delete':
                if (isset($data['id'])) {
                    $this->model->deleteTask($data['id']);
                    $this->state['tasks'] = $this->model->getAllTasks();
                    $result = ['success' => true, 'message' => 'Tarea eliminada'];
                }
                break;
        }
        
        return $result;
    }
}

// Vista - Template con binding simulado
class TaskView {
    private $viewModel;
    
    public function __construct(TaskViewModel $viewModel) {
        $this->viewModel = $viewModel;
    }
    
    public function render(): string {
        $tasks = $this->viewModel->getFilteredTasks();
        $stats = $this->viewModel->getTaskStats();
        $state = $this->viewModel->getState();
        
        $html = $this->renderHeader($stats);
        $html .= $this->renderFilters($state);
        $html .= $this->renderAddForm();
        $html .= $this->renderTaskList($tasks);
        
        return $this->wrapInLayout($html);
    }
    
    private function renderHeader(array $stats): string {
        return '
        <header class="app-header">
            <h1>Task Manager - MVVM Pattern</h1>
            <div class="stats">
                <span class="stat">Total: ' . $stats['total'] . '</span>
                <span class="stat">Pendientes: ' . $stats['pending'] . '</span>
                <span class="stat">Completadas: ' . $stats['completed'] . '</span>
                <span class="stat priority-high">Alta prioridad: ' . $stats['highPriority'] . '</span>
            </div>
        </header>';
    }
    
    private function renderFilters(array $state): string {
        $filters = ['all' => 'Todas', 'pending' => 'Pendientes', 'completed' => 'Completadas', 'high' => 'Alta Prioridad'];
        
        $html = '<div class="filters">';
        $html .= '<input type="text" name="search" value="' . htmlspecialchars($state['search']) . '" placeholder="Buscar tareas...">';
        
        foreach ($filters as $key => $label) {
            $active = $state['filter'] === $key ? 'active' : '';
            $html .= '<a href="?filter=' . $key . '" class="filter-btn ' . $active . '">' . $label . '</a>';
        }
        
        $html .= '</div>';
        
        return $html;
    }
    
    private function renderAddForm(): string {
        return '
        <form method="POST" action="?action=add" class="add-task-form">
            <input type="text" name="title" placeholder="Nueva tarea..." required>
            <select name="priority">
                <option value="low">Baja</option>
                <option value="medium" selected>Media</option>
                <option value="high">Alta</option>
            </select>
            <button type="submit">Agregar</button>
        </form>';
    }
    
    private function renderTaskList(array $tasks): string {
        $html = '<div class="task-list">';
        
        if (empty($tasks)) {
            $html .= '<div class="empty-state"><p>No se encontraron tareas</p></div>';
        } else {
            foreach ($tasks as $task) {
                $html .= $this->renderTask($task);
            }
        }
        
        $html .= '</div>';
        return $html;
    }
    
    private function renderTask(array $task): string {
        $completedClass = $task['completed'] ? 'completed' : '';
        $priorityClass = $task['priority'] === 'high' ? 'priority-high' : '';
        $checked = $task['completed'] ? 'checked' : '';
        
        return '
        <div class="task-item ' . $completedClass . ' ' . $priorityClass . '">
            <form method="POST" action="?action=toggle" style="display: inline;">
                <input type="hidden" name="id" value="' . $task['id'] . '">
                <input type="checkbox" ' . $checked . ' onchange="this.form.submit()">
            </form>
            
            <span class="task-title">' . htmlspecialchars($task['title']) . '</span>
            <span class="task-priority">' . ucfirst($task['priority']) . '</span>
            
            <div class="task-actions">
                <a href="?action=delete&id=' . $task['id'] . '" 
                   onclick="return confirm(\'¿Eliminar tarea?\')" 
                   class="delete-btn">Eliminar</a>
            </div>
        </div>';
    }
    
    private function wrapInLayout(string $content): string {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <title>Task Manager - MVVM</title>
            <style>
                .task-app { max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
                .app-header { text-align: center; margin-bottom: 30px; }
                .stats { display: flex; justify-content: center; gap: 20px; margin-top: 10px; }
                .stat { padding: 5px 10px; background: #f0f0f0; border-radius: 4px; }
                .priority-high { background: #ffebee; color: #c62828; }
                .filters { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
                .filter-btn { padding: 5px 10px; text-decoration: none; border: 1px solid #ddd; border-radius: 4px; }
                .filter-btn.active { background: #007bff; color: white; }
                .add-task-form { display: flex; gap: 10px; margin-bottom: 20px; }
                .task-item { display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 5px; }
                .task-item.completed { opacity: 0.6; }
                .task-item.completed .task-title { text-decoration: line-through; }
                .task-title { flex: 1; }
                .empty-state { text-align: center; padding: 40px; color: #666; }
                input, select, button { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
                button { background: white; cursor: pointer; }
                button:hover { background: #f0f0f0; }
            </style>
        </head>
        <body>
            <div class="task-app">
                ' . $content . '
            </div>
        </body>
        </html>';
    }
}

// Controlador principal
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';
    $model = new TaskModel();
    $viewModel = new TaskViewModel($model);
    
    $result = $viewModel->handleAction($action, $_POST);
    
    // Redirect after POST to prevent resubmission
    header('Location: ' . $_SERVER['PHP_SELF'] . '?' . http_build_query($_GET));
    exit;
}

// Render the view
$model = new TaskModel();
$viewModel = new TaskViewModel($model);
$view = new TaskView($viewModel);

echo $view->render();
?>`
    },
    relatedPatterns: ["mvc", "observer"]
  }
];

// ARCHITECTURAL PATTERNS
export const mockArchitectures: Architecture[] = [
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