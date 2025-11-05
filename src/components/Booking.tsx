import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// --- ATUALIZAÇÃO DOS SERVIÇOS ---
// Este objeto DEVE ter as mesmas chaves e preços do objeto no server.ts
// A duração não é necessária aqui, pois o backend cuida disso.
const SERVICES: Record<string, { name: string; price: number }> = {
  // ATUALIZADOS (preço não mudou, mas as chaves são as mesmas)
  'volume-brasileiro': { name: 'Volume Brasileiro', price: 130 },
  'volume-5d': { name: 'Volume 5D', price: 150 },
  'mega-volume': { name: 'Mega Volume', price: 180 },

  // NÃO ALTERADOS
  'designer-simples': { name: 'Designer de Sobrancelha', price: 30 },
  'designer-henna': { name: 'Designer com Henna', price: 50 },
  'limpeza-pele': { name: 'Dermaplaning', price: 100 },

  // NOVOS
  'manutencao-vb-5d': { name: "Manutenção (Vol. Brasileiro/5D)", price: 95 },
  'manutencao-mega': { name: "Manutenção (Mega Volume)", price: 100 },
  'remocao': { name: "Remoção", price: 30 },
};
// --- FIM DA ATUALIZAÇÃO ---


export default function Booking() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { toast } = useToast();

  // Carrega script do reCAPTCHA
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Busca horários disponíveis quando serviço e data são selecionados
  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  // Gera próximos 21 dias
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Pula domingos
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('pt-BR', { 
            weekday: 'short', 
            day: '2-digit', 
            month: '2-digit' 
          })
        });
      }
    }
    
    return dates;
  };

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch(
        `${API_URL}/api/available-slots?serviceId=${selectedService}&date=${selectedDate}`
      );
      
      if (!response.ok) throw new Error('Erro ao buscar horários');
      
      const data = await response.json();
      setAvailableSlots(data.availableSlots);
      setSelectedTime(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os horários disponíveis.",
        variant: "destructive"
      });
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      toast({
        title: "Atenção",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Executa reCAPTCHA
      const recaptchaToken = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { 
        action: 'booking' 
      });

      // Combina data e hora
      const dateTime = `${selectedDate}T${selectedTime}`;

      const response = await fetch(`${API_URL}/api/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          dateTime,
          customerName,
          customerPhone,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar agendamento');
      }

      // Mostra o nome do serviço correto na confirmação
      toast({
        title: "Agendamento Confirmado! ✨",
        description: `Seu horário para ${SERVICES[selectedService as keyof typeof SERVICES].name} foi confirmado para ${new Date(dateTime + ":00-03:00").toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}.`,
      });

      // Limpa formulário
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime(null);
      setCustomerName('');
      setCustomerPhone('');
      setAvailableSlots([]);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível realizar o agendamento.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return value;
  };

  return (
    <section id="booking" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-primary font-semibold text-sm tracking-widest uppercase">Agendamento</span>
        <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 mt-4">
          Reserve seu <span className="text-primary">horário</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
          Sistema de agendamento online com confirmação automática<br />
          <span className="text-foreground font-medium">Escolha o melhor horário para você</span>
        </p>
        
        <Card className="bg-card/95 backdrop-blur-sm border border-primary/20 shadow-intense">
          <CardContent className="p-10">
            {/* Passo 1: Escolher Serviço */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">1</span>
                Escolha o Serviço
              </h3>
              {/* O grid agora é md:grid-cols-3 para caberem os 9 serviços */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(SERVICES).map(([id, service]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedService(id);
                      setSelectedTime(null);
                      setAvailableSlots([]);
                    }}
                    className={`p-5 rounded-xl transition-all duration-300 border text-left ${
                      selectedService === id
                        ? "bg-gradient-to-br from-primary to-rose-gold-dark text-primary-foreground border-primary shadow-elegant scale-105"
                        : "bg-card/80 hover:bg-gradient-to-br hover:from-primary hover:to-rose-gold-dark hover:text-primary-foreground border-border hover:border-primary hover:scale-105"
                    }`}
                  >
                    <div className="font-bold text-lg mb-1">{service.name}</div>
                    <div className="text-sm opacity-80">R$ {service.price},00</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Passo 2: Escolher Data */}
            {selectedService && (
              <div className="mb-8 animate-scale-in">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">2</span>
                  Escolha a Data
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                  {getAvailableDates().map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-4 rounded-xl transition-all duration-300 border ${
                        selectedDate === date.value
                          ? "bg-gradient-to-br from-primary to-rose-gold-dark text-primary-foreground border-primary shadow-elegant scale-105"
                          : "bg-card/80 hover:bg-gradient-to-br hover:from-primary hover:to-rose-gold-dark hover:text-primary-foreground border-border hover:border-primary hover:scale-105"
                      }`}
                    >
                      <div className="text-xs font-semibold mb-1">{date.display.split(',')[0]}</div>
                      <div className="text-sm font-bold">{date.display.split(',')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Passo 3: Escolher Horário */}
            {selectedDate && (
              <div className="mb-8 animate-scale-in">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">3</span>
                  Escolha o Horário
                </h3>
                {loadingSlots ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Carregando horários...</p>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum horário disponível para esta data. Tente outra data.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.display)} // <-- LINHA CORRIGIDA
                        className={`p-4 rounded-xl transition-all duration-300 border ${
                          selectedTime === slot.display
                            ? "bg-gradient-to-br from-primary to-rose-gold-dark text-primary-foreground border-primary shadow-elegant scale-105"
                            : "bg-card/80 hover:bg-gradient-to-br hover:from-primary hover:to-rose-gold-dark hover:text-primary-foreground border-border hover:border-primary hover:scale-105"
                        }`}
                      >
                        <Clock className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-base font-bold">{slot.display}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Passo 4: Dados do Cliente */}
            {selectedTime && (
              <div className="mb-8 animate-scale-in">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">4</span>
                  Seus Dados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Nome completo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      maxLength={100}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Telefone (WhatsApp)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(formatPhone(e.target.value))}
                      maxLength={15}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Botão de Confirmação */}
            {selectedTime && customerName && customerPhone && (
              <div className="text-center animate-scale-in">
                <Button 
                  onClick={handleBooking}
                  disabled={loading}
                  size="lg"
                  className="bg-gradient-to-r from-rose-gold via-primary to-rose-gold-dark hover:shadow-intense text-primary-foreground shadow-elegant transition-all duration-500 px-12 py-7 text-lg font-bold rounded-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-6 h-6 mr-2" />
                      Confirmar Agendamento
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Este site é protegido pelo reCAPTCHA e as{' '}
                  <a href="https://policies.google.com/privacy" className="underline">Políticas de Privacidade</a> e{' '}
                  <a href="https://policies.google.com/terms" className="underline">Termos de Serviço</a> do Google se aplicam.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}