import { Bico } from "@/lib/types";

export type OrdenacaoBicos = "publicacao" | "proximidade" | "valor" | "data";

export interface BicosFiltersState {
  categorias: string[];
  dataISO?: string;
  valorHora: [number, number];
  ordenarPor: OrdenacaoBicos;
}

export const DEFAULT_BICOS_FILTERS: BicosFiltersState = {
  categorias: [],
  dataISO: undefined,
  valorHora: [0, 100],
  ordenarPor: "publicacao",
};

export function getCategoriasDisponiveis(bicos: Bico[]) {
  return Array.from(new Set(bicos.map((bico) => bico.categoria))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function getValorHoraRange(bicos: Bico[]): [number, number] {
  if (!bicos.length) return DEFAULT_BICOS_FILTERS.valorHora;

  const valores = bicos.map((bico) => bico.valorHora);
  const min = 0;
  const max = Math.max(DEFAULT_BICOS_FILTERS.valorHora[1], Math.ceil(Math.max(...valores) / 5) * 5);

  return [min, max];
}

export function filtrarEOrdenarBicos(bicos: Bico[], filters: BicosFiltersState, hoje = new Date()) {
  return bicos
    .map((bico, index) => ({ bico, index }))
    .filter(({ bico }) => {
      const porCategoria =
        filters.categorias.length === 0 || filters.categorias.some((categoria) => bico.categoria === categoria);
      const porData = !filters.dataISO || getBicoDateISO(bico, hoje) === filters.dataISO;
      const porValor = bico.valorHora >= filters.valorHora[0] && bico.valorHora <= filters.valorHora[1];

      return porCategoria && porData && porValor;
    })
    .sort((a, b) => compararBicos(a, b, filters.ordenarPor, hoje))
    .map(({ bico }) => bico);
}

export function criarParametrosConsultaBicos(filters: BicosFiltersState) {
  return {
    categorias: filters.categorias,
    data: filters.dataISO,
    valorHoraMin: filters.valorHora[0],
    valorHoraMax: filters.valorHora[1],
    ordenarPor: filters.ordenarPor,
  };
}

export function toDateISO(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateISO(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

export function getBicoDateISO(bico: Bico, hoje = new Date()) {
  const label = bico.data.trim().toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}$/.test(label)) return label;
  if (label === "hoje") return toDateISO(hoje);
  if (label === "amanhã" || label === "amanha") return toDateISO(addDays(hoje, 1));

  const weekdayIndex = WEEKDAYS_PT.findIndex((weekday) => label.includes(weekday));
  if (weekdayIndex >= 0) return toDateISO(nextWeekday(hoje, weekdayIndex));

  return undefined;
}

function compararBicos(
  a: { bico: Bico; index: number },
  b: { bico: Bico; index: number },
  ordenarPor: OrdenacaoBicos,
  hoje: Date,
) {
  if (ordenarPor === "proximidade") return a.bico.distanciaKm - b.bico.distanciaKm;
  if (ordenarPor === "valor") return b.bico.valorHora - a.bico.valorHora;
  if (ordenarPor === "data") return compararData(a.bico, b.bico, hoje);

  return a.index - b.index;
}

function compararData(a: Bico, b: Bico, hoje: Date) {
  const aTime = fromDateISO(getBicoDateISO(a, hoje))?.getTime() ?? Number.MAX_SAFE_INTEGER;
  const bTime = fromDateISO(getBicoDateISO(b, hoje))?.getTime() ?? Number.MAX_SAFE_INTEGER;
  return aTime - bTime;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function nextWeekday(date: Date, weekdayIndex: number) {
  const current = date.getDay();
  const offset = (weekdayIndex - current + 7) % 7;
  return addDays(date, offset);
}

const WEEKDAYS_PT = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
