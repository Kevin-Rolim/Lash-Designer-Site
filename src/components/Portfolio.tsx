import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Importe cada imagem com o caminho RELATIVO
// Corrigido para o alias '@/assets/...' que funciona no seu projeto
import image1 from "@/assets/portfolio/image1.jpg";
import image2 from "@/assets/portfolio/image2.jpg";
import image3 from "@/assets/portfolio/image3.jpg";
import image4 from "@/assets/portfolio/image4.jpg";
import image5 from "@/assets/portfolio/image5.jpg";
import image6 from "@/assets/portfolio/image6.jpg";
import image7 from "@/assets/portfolio/image7.jpg";
import image8 from "@/assets/portfolio/image8.jpg";
import image9 from "@/assets/portfolio/image9.jpg";

// Array de imagens do portfólio (agora usando as variáveis importadas)
const portfolioImages = [
  { id: 1, src: image1, alt: "Volume Russo Clássico" },
  { id: 2, src: image2, alt: "Volume Brasileiro Natural" },
  { id: 3, src: image3, alt: "Mega Volume Dramático" },
  { id: 4, src: image4, alt: "Volume 5D Perfeito" },
  { id: 5, src: image5, alt: "Designer de Sobrancelhas" },
  { id: 6, src: image6, alt: "Efeito Fox Eyes" },
  { id: 7, src: image7, alt: "Volume Híbrido Luxo" },
  { id: 8, src: image8, alt: "Alongamento Natural" },
  { id: 9, src: image9, alt: "Resultado Impecável" }
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? portfolioImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Calcula quais imagens mostrar (carrossel duplo)
  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % portfolioImages.length;
      images.push(portfolioImages[index]);
    }
    return images;
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-marble relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-rose-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-champagne/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-2 bg-gradient-accent rounded-full text-sm font-semibold text-foreground mb-4 shadow-glow">
            Galeria de Trabalhos
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-gold via-rose-gold-light to-champagne bg-clip-text text-transparent">
            Portfólio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Cada olhar conta uma história. Veja algumas das transformações realizadas com técnicas exclusivas e materiais premium.
          </p>
        </div>

        {/* Carrossel Principal */}
        <div className="relative max-w-7xl mx-auto">
          {/* Botões de Navegação */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground p-3 rounded-full shadow-elegant transition-all duration-300 hover:scale-110 -ml-4"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground p-3 rounded-full shadow-elegant transition-all duration-300 hover:scale-110 -mr-4"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Grid de Imagens (Carrossel Duplo) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {getVisibleImages().map((image, idx) => (
              <Card
                key={`${image.id}-${idx}`}
                className="group relative overflow-hidden border-rose-gold/20 bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  
                  {/* Imagem Real */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />


                  {/* === MUDANÇA AQUI === */}
                  {/* Overlay de gradient (bem mais sutil) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent z-10" />
                  
                  {/* Padrão decorativo (também por cima) */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--rose-gold)_1px,_transparent_1px)] bg-[length:24px_24px]" />
                  </div>

                  {/* Efeito shimmer no hover (também por cima) */}
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  {/* === MUDANÇA AQUI === */}
                  {/* Texto sobre a imagem (REMOVIDO) */}
                  
                </div>
              </Card>
            ))}
          </div>

          {/* Indicadores de Slide */}
          <div className="flex justify-center gap-2 mt-8">
            {portfolioImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Ir para imagem ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <p className="text-muted-foreground mb-6 font-light">
            Quer ver seu olhar transformado também?
          </p>
          <a 
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-hero text-white rounded-full font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Agende Seu Horário
            <span className="text-lg">✨</span>
          </a>
        </div>
      </div>
    </section>
  );
}