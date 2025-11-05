import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react";

const LOCATION = {
  address: "Rua Giacomo Ângelo Moioli, 1341 - João Peres",
  city: "Cedral - SP",
  zipCode: "CEP 15895-130",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    preferredDate: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Olá! Gostaria de agendar um horário:
    
Nome: ${formData.name}
Telefone: ${formData.phone}
Serviço: ${formData.service}
Data preferida: ${formData.preferredDate}
Observações: ${formData.message}`;
    
    const phoneNumber = "5511981952760"; // Número do WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openGPS = () => {
    // Detecta o dispositivo e abre o app de GPS apropriado
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    const googleMapsUrl = `https://maps.app.goo.gl/zF3czRnHYFiwkXVr8`;
    const appleMapsUrl = `https://maps.apple.com/place?place-id=IC6A3E94D43A9F2C8&address=Avenida+Antônio+dos+Santos+Galante%2C+Cedral+-+SP%2C+15895-000%2C+Brasil&coordinate=-20.9088222%2C-49.2636831&name=Studio+Hellen+Rocha+beauty+academy&_provider=9902`;
    if (isIOS) {
      // iOS oferece escolha entre Apple Maps e Waze
      const choice = confirm("Abrir no Apple Maps? (Cancele para abrir no navegador)");
      window.open(choice ? appleMapsUrl : googleMapsUrl, '_blank');
    } else if (isAndroid) {
      // Android geralmente abre o Google Maps ou Waze
      window.open(googleMapsUrl, '_blank');
    } else {
      // Desktop - abre Google Maps no navegador
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Entre em <span className="text-primary font-medium">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Atendemos por agendamento. Fale conosco no WhatsApp ou preencha o formulário.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <Card className="shadow-elegant border-0 bg-gradient-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-medium text-foreground mb-6">
                Solicite seu agendamento
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nome completo
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      WhatsApp
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Serviço desejado
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="border-border focus:border-primary">
                      <SelectValue placeholder="Escolha o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volume-brasileiro">Volume Brasileiro - R$ 130</SelectItem>
                      <SelectItem value="volume-5d">Volume 5D - R$ 150</SelectItem>
                      <SelectItem value="mega-volume">Mega Volume - R$ 180</SelectItem>
                      <SelectItem value="designer-simples">Designer de Sobrancelha - R$ 30</SelectItem>
                      <SelectItem value="designer-henna">Designer com Henna - R$ 50</SelectItem>
                      <SelectItem value="limpeza-pele">Dermaplaning - R$ 100</SelectItem>
                      <SelectItem value="avaliacao">Avaliação Gratuita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Data preferida
                  </label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="border-border focus:border-primary"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Observações (opcional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Alguma observação ou preferência?"
                    className="border-border focus:border-primary min-h-[100px]"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  Enviar solicitação
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato e Localização */}
          <div className="space-y-6">
            {/* Informações */}
            <Card className="bg-gradient-accent border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-foreground mb-4">Informações de contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">(11) 98195-2760</p>
                      <p className="text-sm text-muted-foreground">WhatsApp e ligações</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Chat pelo WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 1h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Seg - Sex: 9h às 18:30</p>
                      <p className="text-sm text-muted-foreground">Sábado: 8h às 14h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card className="bg-card border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-medium text-foreground">Nossa localização</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-foreground font-medium">{LOCATION.address}</p>
                  <p className="text-muted-foreground">{LOCATION.city}, {LOCATION.zipCode}</p>
                  <p className="text-sm text-muted-foreground">
                    📍 Próximo ao Almeida Acabamentos
                    <br />
                    🅿️ Estacionamento na calçada
                    <br />
                    🗺️ Busque no Google Maps por "Lash Designer Cedral"
                  </p>
                  
                  {/* Botão para abrir GPS */}
                  <Button
                    onClick={openGPS}
                    variant="outline"
                    className="w-full mt-4 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Abrir no GPS
                  </Button>
                </div>
                
                {/* Map Placeholder */}
                <div className="mt-4 bg-gradient-hero rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-foreground font-medium">Studio Lash Design</p>
                    <p className="text-sm text-muted-foreground">{LOCATION.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}