import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/google-reviews`);
      const data = await response.json();
      
      setReviews(data.reviews);
      setDisplayedReviews(data.reviews.slice(0, )); // Mostra apenas 6 inicialmente
      setAverageRating(data.averageRating);
      setTotalRatings(data.totalRatings);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      // Fallback para reviews estáticas caso a API falhe
      setDisplayedReviews([
        {
          author_name: "Alexandra Nunes Lek",
          rating: 5,
          text: "Lugar lindinho aconchegante Hellen Rocha ótima profissional , maravilhosa atenciosa um trabalho mais que perfeito.",
          time: Date.now(),
          relative_time_description: "há 2 meses"
        },
        {
          author_name: "Daniele de Fátima Santana Ramadan",
          rating: 5,
          text: "Profissional excelente!!! Adoro!!! Só faço meus cílios com ela!!! Super indico!!!",
          time: Date.now(),
          relative_time_description: "há 1 mês"
        }
      ]);
      setAverageRating(5.0);
      setTotalRatings(127);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 px-6 bg-gradient-marble">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Carregando avaliações...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="testimonials" className="py-32 px-6 bg-gradient-marble relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Depoimentos</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 mt-4">
              O que nossas <span className="text-primary bg-clip-text bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark">clientes</span> dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Mais de <span className="text-foreground font-semibold">{totalRatings} clientes satisfeitas</span> que confiaram em nosso trabalho<br />
              Sua satisfação é nossa maior conquista ✨
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {displayedReviews.map((review, index) => (
              <Card 
                key={index} 
                className="bg-card/95 backdrop-blur-sm border border-primary/10 shadow-soft hover:shadow-intense hover:-translate-y-1 transition-all duration-500 group"
              >
                <CardContent className="p-7">
                  {/* Stars */}
                  <div className="flex mb-5 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'} group-hover:scale-110 transition-transform duration-300`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                    "{review.text}"
                  </p>
                  
                  {/* Client info */}
                  <div className="border-t border-border/50 pt-5">
                    <h4 className="font-bold text-foreground text-lg">{review.author_name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{review.relative_time_description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 space-y-6">
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm px-8 py-4 rounded-full border border-primary/20 shadow-soft">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-primary font-bold text-lg">{averageRating.toFixed(1)} estrelas</span>
              <span className="w-px h-4 bg-border" />
              <span className="text-muted-foreground font-medium">{totalRatings} avaliações</span>
            </div>

            {/* Ver Mais Button */}
            {reviews.length > 6 && (
              <div>
                <Button
                  onClick={() => setShowAllModal(true)}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Ver Todas as Avaliações ({reviews.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal para Ver Todas as Avaliações */}
      {showAllModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowAllModal(false)}>
          <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">Todas as Avaliações</h3>
                <p className="text-muted-foreground mt-1">{reviews.length} avaliações do Google</p>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-4">
              {reviews.map((review, index) => (
                <Card key={index} className="border border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{review.author_name}</h4>
                        <p className="text-sm text-muted-foreground">{review.relative_time_description}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{review.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}