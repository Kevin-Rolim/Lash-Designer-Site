import { Card, CardContent } from "@/components/ui/card";
// --- ATUALIZAÇÃO DOS ÍCONES ---
import { 
  Sparkles, 
  Eye, 
  Scissors, 
  ShieldCheck, // Ícone para Remoção
  Heart, 
  Waves,
  RotateCcw // Ícone para Manutenção
} from "lucide-react";
// --- FIM DA ATUALIZAÇÃO ---

const services = [
  // --- SERVIÇOS ATUALIZADOS ---
  {
    id: "volume-brasileiro",
    icon: Waves,
    title: "Volume Brasileiro",
    description: "Equilíbrio perfeito entre volume e naturalidade. Técnica que harmoniza com o formato do seu rosto, proporcionando um olhar marcante mas delicado.",
    duration: "1h30", // ATUALIZADO
    price: "R$ 130"
  },
  {
    id: "volume-5d",
    icon: Sparkles,
    title: "Volume 5D",
    description: "Densidade intensa com leveza garantida. Cinco fios ultrafinos aplicados por cílio natural, criando volume dramático sem pesar.",
    duration: "1h30", // ATUALIZADO
    price: "R$ 150"
  },
  {
    id: "mega-volume",
    icon: Eye,
    title: "Mega Volume",
    description: "Máximo volume e glamour absoluto. Para quem deseja o máximo impacto e densidade, mantendo o conforto e a saúde dos cílios naturais.",
    duration: "2h", // ATUALIZADO
    price: "R$ 180"
  },
  // --- NOVOS SERVIÇOS ---
  {
    id: "manutencao-vb-5d",
    icon: RotateCcw,
    title: "Manutenção (Vol. Brasileiro/5D)",
    description: "Mantenha seu olhar perfeito. Limpeza, reposição dos fios e realinhamento para Volume Brasileiro ou 5D (até 21 dias).",
    duration: "1h",
    price: "R$ 95"
  },
  {
    id: "manutencao-mega",
    icon: RotateCcw,
    title: "Manutenção (Mega Volume)",
    description: "Restaure a densidade máxima. Limpeza e reposição cuidadosa dos fans para seu Mega Volume (até 21 dias).",
    duration: "1h",
    price: "R$ 100"
  },
  {
    id: "remocao",
    icon: ShieldCheck,
    title: "Remoção",
    description: "Remoção segura e profissional da extensão de cílios, preservando 100% a saúde dos seus fios naturais.",
    duration: "30min",
    price: "R$ 30"
  },
  // --- SERVIÇOS ANTIGOS (SEM ALTERAÇÃO) ---
  {
    id: "designer-simples",
    icon: Scissors,
    title: "Designer de Sobrancelha",
    description: "Modelagem personalizada com técnica precisa. Design que valoriza seu rosto e realça a expressão do olhar de forma natural.",
    duration: "30min",
    price: "R$ 30"
  },
  {
    id: "designer-henna",
    icon: Heart,
    title: "Designer com Henna",
    description: "Design perfeito com preenchimento natural. Henna de alta qualidade que corrige falhas e intensifica a cor, durando até 15 dias.",
    duration: "45min",
    price: "R$ 50"
  },
  {
    id: "limpeza-pele",
    icon: ShieldCheck, // Alterei o ícone de Dermaplaning para não conflitar com Remoção
    title: "Dermaplaning",
    description: "Limpeza profunda e renovação da pele. Remove impurezas e pelos faciais, deixando a pele radiante e preparada para tratamentos.",
    duration: "1h",
    price: "R$ 100"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Nossos serviços</span>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 mt-4">
            Experiências que <span className="text-primary bg-clip-text bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark">transformam</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada serviço é realizado com cuidado e atenção aos detalhes,<br />
            <span className="text-foreground font-medium">priorizando sua segurança e satisfação</span>
          </p>
        </div>
        
        {/* O grid agora é md:grid-cols-3 para caberem os 9 serviços */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id}
                className="group hover:shadow-intense transition-all duration-700 border border-primary/10 bg-gradient-card backdrop-blur-sm hover:-translate-y-2 hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-2xl group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                          {service.title}
                        </h3>
                        <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full whitespace-nowSrap">
                          {service.duration}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed text-base mb-5">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <p className="text-primary font-bold text-2xl">
                          {service.price}
                        </p>
                        <button 
                          onClick={() => {
                            const bookingSection = document.getElementById('booking');
                            bookingSection?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                        >
                          Agendar →
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}