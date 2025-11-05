import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 animate-fade-in-up">
        <div className="mb-6">
          <span className="inline-block px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm tracking-wider border border-primary/20 animate-scale-in">
            ✨ Especialista em Extensão de Cílios
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8 tracking-tight leading-tight">
          Seu olhar,<br />
          <span className="text-primary bg-clip-text bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark">
            nosso cuidado
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Atendimento humanizado e resultados naturais<br />
          <span className="text-foreground font-medium">Realce sua beleza</span> com técnicas seguras e cuidado personalizado
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark hover:shadow-intense text-primary-foreground shadow-elegant transition-all duration-500 px-10 py-7 text-lg font-semibold rounded-full group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Marcar seu horário
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>+100 clientes satisfeitas</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>4+ anos de experiência</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;