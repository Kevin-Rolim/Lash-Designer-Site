import { Separator } from "@/components/ui/separator";
import { Heart, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Studio Lash Design</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Especializado em extensão de cílios com atendimento humanizado 
              e resultados naturais.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Agendar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  Depoimentos
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-medium">Serviços</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Extensão Fio a Fio</li>
              <li>Volume Russo</li>
              <li>Retirada Segura</li>
              <li>Tratamentos Faciais</li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h4 className="font-medium">Políticas</h4>
            <div className="text-sm text-background/70 space-y-3">
              <div>
                <h5 className="text-background font-medium mb-1">Cancelamento</h5>
                <p className="text-xs leading-relaxed">
                  Cancelamentos com até 24h de antecedência. 
                  Sem taxa para reagendamento.
                </p>
              </div>
              
              <div>
                <h5 className="text-background font-medium mb-1">Segurança</h5>
                <p className="text-xs leading-relaxed">
                  Materiais esterilizados, descartáveis e de qualidade internacional. 
                  Ambiente higienizado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-background/70">
            © 2024 Studio Lash Design. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-background/70">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>para realçar sua beleza</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;