export type BicoStatus =
  | "publicado"
  | "aguardando"
  | "confirmado"
  | "contrato_aceito"
  | "em_execucao"
  | "aguardando_confirmacao"
  | "concluido"
  | "pago";

export interface Prestador {
  id: string;
  nome: string;
  bairro: string;
  distanciaKm: number;
  experiencias: string[];
  avaliacao: number;
  servicosConcluidos: number;
  taxaComparecimento: number;
  disponivel: boolean;
  bio: string;
  avatar: string;
}

export interface Empresa {
  id: string;
  nome: string;
  cidade: string;
  bicosPublicados: number;
  status: "ativa" | "pendente";
  risco: "baixo" | "medio" | "alto";
}

export interface Bico {
  id: string;
  categoria: string;
  titulo: string;
  descricao: string;
  empresa: string;
  empresaId: string;
  bairro: string;
  cidade: string;
  endereco?: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  duracaoHoras: number;
  valorHora: number;
  vagas: number;
  distanciaKm: number;
  status: BicoStatus;
  requisitos?: string;
  esforcoFisico?: boolean;
  fornecMaterial?: boolean;
  fornecEPI?: "sim" | "nao" | "na";
  responsavel?: string;
  telefoneResp?: string;
  prestadorConfirmadoId?: string;
  checkInAt?: string;
  checkOutAt?: string;
  pagoAt?: string;
  avaliacao?: { pontualidade: number; qualidade: number; comunicacao: number; comentario: string };
}

export const STATUS_LABELS: Record<BicoStatus, string> = {
  publicado: "Publicado",
  aguardando: "Aguardando prestadores",
  confirmado: "Prestador confirmado",
  contrato_aceito: "Contrato demo aceito",
  em_execucao: "Em execução",
  aguardando_confirmacao: "Aguardando confirmação",
  concluido: "Concluído",
  pago: "Pago demo",
};
