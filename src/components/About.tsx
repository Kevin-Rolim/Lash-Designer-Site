import { Card } from "@/components/ui/card";
import lashDesignerImage from "@/assets/hellen-rocha.jpg";
const About = () => {
  return <section id="about" className="py-32 px-6 bg-gradient-marble relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 order-2 md:order-1">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Sobre mim</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mt-4 leading-tight">
                Olá — sou<br />
                <span className="text-primary bg-clip-text bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark">Hellen Rocha</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-xl">
                Lash designer certificada com <span className="text-primary font-semibold">mais de 4 anos de experiência</span>. 
                Sou Licenciada, Embaixadora e Grand Master pela Beautyeyes.
              </p>
              
              <p>
                Trabalho com técnicas seguras e materiais de qualidade internacional.

Meu foco é realçar sua beleza natural. Como mãe e empresária, entendo perfeitamente a importância de respeitar sua rotina e seu estilo de vida.

Esse mundo dos cílios é mágico e foi a melhor escolha que fiz. Cada atendimento é único, pensado especialmente para você.


              </p>
              
              <div className="bg-gradient-card p-6 rounded-2xl border border-primary/20 shadow-soft">
                <p className="text-primary font-semibold text-xl">
                  ✨ Eu te convido para conhecer o seu próximo nível.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                  <div className="text-3xl font-display font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground mt-1">Clientes satisfeitas</div>
                </div>
                <div className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                  <div className="text-3xl font-display font-bold text-primary">4+</div>
                  <div className="text-sm text-muted-foreground mt-1">Anos de experiência</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative order-1 md:order-2">
            <div className="relative group">
              <Card className="overflow-hidden shadow-intense border-0 transform group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10" />
                <img 
                  src={lashDesignerImage} 
                  alt="Hellen Rocha - Lash Designer Certificada especialista em extensão de cílios" 
                  className="w-full h-[600px] object-cover"
                />
              </Card>
              
              {/* Decorative floating elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-accent rounded-full opacity-80 blur-xl animate-float" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-card rounded-full opacity-70 blur-xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;