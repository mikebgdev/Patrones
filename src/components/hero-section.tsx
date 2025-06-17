export function HeroSection() {
  return (
    <section className="gradient-hero py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Patrones de Diseño
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Descubre y aprende los patrones de diseño de software más importantes, desde los clásicos GoF hasta arquitecturas modernas como DDD, CQRS y Event-Driven.
        </p>
      </div>
    </section>
  );
}
