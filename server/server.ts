import express from "express";
import cors from "cors";
import { google } from "googleapis";
import axios from "axios";
import dotenv from "dotenv";
import { JWT } from "google-auth-library";
import { URLSearchParams } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de CORS para permitir requisições do frontend
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());

// --- Configuração do Google Calendar (Autenticação via Conta de Serviço) ---
const auth = new JWT({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
});

const calendar = google.calendar({
  version: "v3",
  auth: auth,
});

// --- LISTA DE SERVIÇOS ATUALIZADA ---
const SERVICES: Record<
  string,
  { name: string; duration: number; price: number }
> = {
  // ATUALIZADOS
  "volume-brasileiro": { name: "Volume Brasileiro", duration: 90, price: 130 }, // 1h30
  "volume-5d": { name: "Volume 5D", duration: 90, price: 150 }, // 1h30
  "mega-volume": { name: "Mega Volume", duration: 120, price: 180 }, // 2h

  // NÃO ALTERADOS
  "designer-simples": {
    name: "Designer de Sobrancelha Simples",
    duration: 30,
    price: 30,
  },
  "designer-henna": {
    name: "Designer de Sobrancelha com Henna",
    duration: 45,
    price: 50,
  },
  "limpeza-pele": {
    name: "Limpeza de Pele / Dermaplaning",
    duration: 60,
    price: 100,
  },

  // NOVOS
  "manutencao-vb-5d": {
    name: "Manutenção (Vol. Brasileiro/5D)",
    duration: 60, // 1h
    price: 95,
  },
  "manutencao-mega": {
    name: "Manutenção (Mega Volume)",
    duration: 60, // 1h
    price: 100,
  },
  remocao: {
    name: "Remoção",
    duration: 30, // 30min
    price: 30,
  },
};
// --- FIM DA ATUALIZAÇÃO ---

// Horários de funcionamento
const BUSINESS_HOURS = {
  weekdays: { start: 9, end: 18.5 }, // 9h às 18:30
  saturday: { start: 8, end: 14 },
  sunday: null, // Fechado
};

/**
 * Verifica se um horário está disponível (LÓGICA DE COLISÃO CORRIGIDA)
 * Compara um [slotStart, slotEnd] com uma lista de [busyStart, busyEnd]
 */
function isTimeSlotAvailable(
  slotStart: Date,
  duration: number,
  busyBlocks: any[], // Lista de blocos ocupados da API free/busy
  businessHours: { start: number; end: number } | null // (Não usado para 'end')
): boolean {
  if (!businessHours) return false;

  const slotStartMs = slotStart.getTime();
  const slotEndMs = slotStartMs + duration * 60000;

  // 2. Verifica conflitos com blocos ocupados (LÓGICA CORRIGIDA)
  for (const block of busyBlocks) {
    const busyStartMs = new Date(block.start).getTime();
    const busyEndMs = new Date(block.end).getTime();

    // Lógica de colisão mais simples:
    // Colide se NÃO for totalmente antes OU totalmente depois.
    const isTotallyBefore = slotEndMs <= busyStartMs;
    const isTotallyAfter = slotStartMs >= busyEndMs;

    // Se NÃO estiver totalmente antes E NÃO estiver totalmente depois, há colisão.
    if (!(isTotallyBefore || isTotallyAfter)) {
      return false; // Colisão detectada!
    }
  }

  return true; // Sem colisões
}

/**
 * GET /api/available-slots
 * Retorna horários disponíveis para agendamento (Versão Corrigida)
 */
app.get("/api/available-slots", async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res
        .status(400)
        .json({ error: "serviceId e date são obrigatórios" });
    }

    const service = SERVICES[serviceId as string];
    if (!service) {
      return res.status(400).json({ error: "Serviço inválido" });
    }

    // --- CORREÇÃO DE FUSO HORÁRIO ---
    const selectedDateStr = date as string;
    const startOfDay = new Date(selectedDateStr + "T00:00:00-03:00");
    const endOfDay = new Date(selectedDateStr + "T23:59:59-03:00");

    // --- CORREÇÃO DE LÓGICA (freebusy.query) ---
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
        timeZone: "America/Sao_Paulo",
      },
    });

    const calendarId = process.env.GOOGLE_CALENDAR_ID as string;
    const busyBlocks =
      freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

    // [DEBUG] Log de debug (agora no lugar certo)
    console.log(
      `[DEBUG] Blocos ocupados para ${selectedDateStr}:`,
      JSON.stringify(busyBlocks)
    );

    // 2. Gera os slots
    const availableSlots = [];
    const selectedDate = new Date(selectedDateStr + "T00:00:00-03:00");
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0) {
      return res.json({ availableSlots: [] });
    }

    const businessHours =
      dayOfWeek === 6 ? BUSINESS_HOURS.saturday : BUSINESS_HOURS.weekdays;

    const startHour = Math.floor(businessHours.start);
    const startMinute = (businessHours.start % 1) * 60;
    const endHour = Math.floor(businessHours.end);
    const endMinute = (businessHours.end % 1) * 60;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === startHour && minute < startMinute) continue;
        if (hour === endHour && minute > endMinute) break; 
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        const slotTimeStr = `${selectedDateStr}T${hourStr}:${minuteStr}:00-03:00`;
        const slotTime = new Date(slotTimeStr);

        // --- FILTRO DE HORÁRIOS PASSADOS (REATIVADO) ---

        // --- FILTRO DE HORÁRIOS PASSADOS (REATIVADO) ---
        const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
        if (slotTime < oneHourFromNow) continue;
        // --- FIM DO FILTRO ---

        if (
          isTimeSlotAvailable(
            slotTime,
            service.duration,
            busyBlocks,
            businessHours
          )
        ) {
          availableSlots.push({
            time: slotTime.toISOString(),
            display: `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`,
          });
        }
      }
    }

    res.json({ availableSlots });
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    res.status(500).json({
      error: "Erro ao buscar horários disponíveis",
    });
  }
});

/**
 * POST /api/create-booking
 * Cria um novo agendamento no Google Calendar
 */
app.post("/api/create-booking", async (req, res) => {
  try {
    const { serviceId, dateTime, customerName, customerPhone, recaptchaToken } =
      req.body;

    // Validações...
    if (
      !serviceId ||
      !dateTime ||
      !customerName ||
      !customerPhone ||
      !recaptchaToken
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }
    if (customerName.length > 100 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(customerName)) {
      return res.status(400).json({ error: "Nome inválido." });
    }
    if (
      !/^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/.test(
        customerPhone.replace(/\s/g, "")
      )
    ) {
      return res.status(400).json({ error: "Número de telefone inválido" });
    }

    // reCAPTCHA
    const recaptchaBody = new URLSearchParams();
    recaptchaBody.append("secret", process.env.RECAPTCHA_SECRET_KEY as string);
    recaptchaBody.append("response", recaptchaToken);

    const recaptchaVerification = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      recaptchaBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    if (
      !recaptchaVerification.data.success ||
      recaptchaVerification.data.score < 0.5
    ) {
      return res.status(400).json({
        error: "Verificação de segurança falhou. Tente novamente.",
      });
    }

    const service = SERVICES[serviceId];
    if (!service) {
      return res.status(400).json({ error: "Serviço inválido" });
    } 

    // Correção de Fuso Horário
    const startTime = new Date(dateTime + ":00-03:00"); 
    const endTime = new Date(startTime.getTime() + service.duration * 60000);

    // Cria evento no Google Calendar
    const event = {
      summary: `${service.name} - ${customerName}`,
      description: `Cliente: ${customerName}\nTelefone: ${customerPhone}\nServiço: ${service.name}\nValor: R$ ${service.price},00`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    };

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    res.json({
      success: true,
      message: "Agendamento realizado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({
      error: "Erro ao criar agendamento. Tente novamente.",
    });
  }
});

/**
 * GET /api/google-reviews
 * Busca avaliações do Google Places
 */
app.get("/api/google-reviews", async (req, res) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: process.env.GOOGLE_PLACE_ID,
          fields: "reviews,rating,user_ratings_total",
          key: process.env.GOOGLE_PLACE_KEY,
        },
      }
    );

    if (response.data.status !== "OK") {
      throw new Error("Erro ao buscar avaliações do Google");
    }

    const { reviews, rating, user_ratings_total } = response.data.result;

    res.json({
      reviews: reviews || [],
      averageRating: rating || 0,
      totalRatings: user_ratings_total || 0,
    });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({
      error: "Erro ao buscar avaliações do Google",
    });
  }
});

/**
 * Health check endpoint
 */
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📅 Google Calendar ID: ${process.env.GOOGLE_CALENDAR_ID}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
});