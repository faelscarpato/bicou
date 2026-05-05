import { PRESTADOR_DEMO_ID } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { Bico, BicoStatus } from "@/lib/types";

type LegacyStatus = "accepted" | "checked_in" | "in_progress" | "finished" | "paid" | "cancelled";

interface LegacyJob {
  id: string;
  title: string;
  marketName: string;
  distance?: string;
  duration?: string;
  dateLabel?: string;
  totalValue?: number;
}

export function migrateLegacyGptData() {
  if (typeof window === "undefined") return;

  const state = useStore.getState();
  if (state.legacyGptMigrated) return;

  const accepted = parseJson<LegacyJob[]>(window.localStorage.getItem("acceptedJobs"), []);
  const statuses = parseJson<Record<string, LegacyStatus>>(window.localStorage.getItem("jobStatuses"), {});

  if (!accepted.length) {
    state.markLegacyGptMigrated();
    return;
  }

  const migrados = accepted
    .map((job) => mapLegacyJob(job, statuses[job.id] ?? "accepted"))
    .filter((bico): bico is Bico => Boolean(bico));

  if (migrados.length) {
    state.importLegacyBicos(migrados);
    return;
  }

  state.markLegacyGptMigrated();
}

function mapLegacyJob(job: LegacyJob, legacyStatus: LegacyStatus): Bico | null {
  if (legacyStatus === "cancelled") return null;

  const duracaoHoras = parseDuration(job.duration);
  const total = typeof job.totalValue === "number" ? job.totalValue : 0;
  const status = mapStatus(legacyStatus);

  return {
    id: `gpt-${job.id}`,
    categoria: job.title || "Bico migrado",
    titulo: job.title || "Bico migrado",
    descricao: "Bico aceito no protótipo GPT e migrado para o store unificado.",
    empresa: job.marketName || "Empresa migrada",
    empresaId: "legacy-gpt",
    bairro: "Região próxima",
    cidade: "São Paulo",
    data: job.dateLabel || "Hoje",
    horaInicio: "09:00",
    horaFim: "12:00",
    duracaoHoras,
    valorHora: duracaoHoras > 0 ? Math.round(total / duracaoHoras) : total,
    vagas: 1,
    distanciaKm: parseDistance(job.distance),
    status,
    prestadorConfirmadoId: PRESTADOR_DEMO_ID,
    checkInAt: ["checked_in", "in_progress", "finished", "paid"].includes(legacyStatus) ? "Migrado" : undefined,
    checkOutAt: ["finished", "paid"].includes(legacyStatus) ? "Migrado" : undefined,
    pagoAt: legacyStatus === "paid" ? "Migrado do protótipo GPT" : undefined,
  };
}

function mapStatus(status: LegacyStatus): BicoStatus {
  const map: Record<Exclude<LegacyStatus, "cancelled">, BicoStatus> = {
    accepted: "contrato_aceito",
    checked_in: "em_execucao",
    in_progress: "em_execucao",
    finished: "aguardando_confirmacao",
    paid: "pago",
  };

  return map[status as Exclude<LegacyStatus, "cancelled">] ?? "contrato_aceito";
}

function parseDuration(value?: string) {
  if (!value) return 1;
  const horas = value.match(/(\d+(?:[,.]\d+)?)\s*h/i);
  const minutos = value.match(/(\d+)\s*(?:m|min)/i);
  const horasValor = horas ? Number(horas[1].replace(",", ".")) : 0;
  const minutosValor = minutos ? Number(minutos[1]) / 60 : 0;
  return Math.max(0.5, horasValor + minutosValor || 1);
}

function parseDistance(value?: string) {
  if (!value) return 0;
  const number = Number((value.match(/(\d+(?:[,.]\d+)?)/)?.[1] || "0").replace(",", "."));
  return value.toLowerCase().includes("m") && !value.toLowerCase().includes("km") ? number / 1000 : number;
}

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
