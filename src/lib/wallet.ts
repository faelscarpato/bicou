import { PRESTADOR_DEMO_ID } from "@/lib/mockData";
import { Bico, BicoStatus, SaqueDemo } from "@/lib/types";

export interface RecebimentoCarteira {
  id: string;
  titulo: string;
  empresa: string;
  valor: number;
  previsao: string;
  status: string;
  bico: Bico;
}

export function calcularTotalBico(bico: Bico) {
  return bico.valorHora * bico.duracaoHoras;
}

export function criarResumoCarteira(bicos: Bico[], saques: SaqueDemo[], saldoInicial: number) {
  const bicosDoPrestador = bicos.filter((bico) => bico.prestadorConfirmadoId === PRESTADOR_DEMO_ID);
  const pagos = bicosDoPrestador.filter((bico) => bico.status === "pago");
  const proximos = bicosDoPrestador.filter((bico) =>
    ["contrato_aceito", "em_execucao", "aguardando_confirmacao", "concluido"].includes(bico.status),
  );
  const totalPago = pagos.reduce((acc, bico) => acc + calcularTotalBico(bico), 0);
  const totalSacado = saques.reduce((acc, saque) => acc + saque.valor, 0);

  return {
    saldoDisponivel: Math.max(0, saldoInicial + totalPago - totalSacado),
    totalRecebido: saldoInicial + totalPago,
    totalSacado,
    proximosRecebiveis: proximos.map(mapRecebimento),
    pagamentosRecebidos: pagos.map(mapRecebimento),
  };
}

function mapRecebimento(bico: Bico): RecebimentoCarteira {
  return {
    id: bico.id,
    titulo: bico.titulo,
    empresa: bico.empresa,
    valor: calcularTotalBico(bico),
    previsao: previsaoPorStatus(bico.status, bico.data),
    status: statusRecebivel(bico.status),
    bico,
  };
}

function statusRecebivel(status: BicoStatus) {
  const labels: Partial<Record<BicoStatus, string>> = {
    contrato_aceito: "Bico aceito",
    em_execucao: "Em andamento",
    aguardando_confirmacao: "Aguardando confirmação",
    concluido: "Pronto para pagamento",
    pago: "Recebido",
  };

  return labels[status] ?? "Em análise";
}

function previsaoPorStatus(status: BicoStatus, data: string) {
  if (status === "contrato_aceito") return data;
  if (status === "em_execucao") return "Após o check-out";
  if (status === "aguardando_confirmacao") return "Após confirmação da empresa";
  if (status === "concluido") return "Após pagamento demo";
  if (status === "pago") return "Disponível agora";
  return data;
}
