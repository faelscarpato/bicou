import { Bico, Empresa, Prestador } from "./types";

export const empresas: Empresa[] = [
  { id: "e1", nome: "Mercado Boa Compra", cidade: "São Paulo", bicosPublicados: 8, status: "ativa", risco: "baixo" },
  { id: "e2", nome: "Mercadinho São José", cidade: "São Paulo", bicosPublicados: 5, status: "ativa", risco: "baixo" },
  { id: "e3", nome: "HortiMais", cidade: "Campinas", bicosPublicados: 6, status: "ativa", risco: "medio" },
  { id: "e4", nome: "Super Bairro", cidade: "São Paulo", bicosPublicados: 9, status: "ativa", risco: "baixo" },
  { id: "e5", nome: "Loja Central", cidade: "Guarulhos", bicosPublicados: 6, status: "pendente", risco: "medio" },
];

export const prestadores: Prestador[] = [
  { id: "p1", nome: "João S.", bairro: "Centro", distanciaKm: 1.8, experiencias: ["reposição", "estoque"], avaliacao: 4.8, servicosConcluidos: 32, taxaComparecimento: 98, disponivel: true, bio: "Trabalho em mercados há 3 anos. Pontual e organizado.", avatar: "JS" },
  { id: "p2", nome: "Maria A.", bairro: "Vila Nova", distanciaKm: 2.4, experiencias: ["organização de loja"], avaliacao: 4.9, servicosConcluidos: 41, taxaComparecimento: 99, disponivel: true, bio: "Especialista em organização visual e gôndolas.", avatar: "MA" },
  { id: "p3", nome: "Rafael P.", bairro: "Jardim América", distanciaKm: 3.1, experiencias: ["validade", "estoque"], avaliacao: 4.7, servicosConcluidos: 22, taxaComparecimento: 95, disponivel: true, bio: "Atento a detalhes, foco em conferência de validade.", avatar: "RP" },
  { id: "p4", nome: "Lucas M.", bairro: "Santana", distanciaKm: 1.2, experiencias: ["reposição", "eventos"], avaliacao: 4.8, servicosConcluidos: 28, taxaComparecimento: 97, disponivel: true, bio: "Disposição e energia para bicos rápidos.", avatar: "LM" },
  { id: "p5", nome: "Fernanda R.", bairro: "Tatuapé", distanciaKm: 4.0, experiencias: ["limpeza leve"], avaliacao: 4.6, servicosConcluidos: 15, taxaComparecimento: 93, disponivel: false, bio: "Cuidado e organização em ambientes comerciais.", avatar: "FR" },
  { id: "p6", nome: "Carlos T.", bairro: "Mooca", distanciaKm: 2.9, experiencias: ["estoque"], avaliacao: 4.7, servicosConcluidos: 19, taxaComparecimento: 96, disponivel: true, bio: "Experiência com cargas e estoque pesado.", avatar: "CT" },
  { id: "p7", nome: "Ana V.", bairro: "Pinheiros", distanciaKm: 3.6, experiencias: ["organização", "validade"], avaliacao: 4.9, servicosConcluidos: 37, taxaComparecimento: 99, disponivel: true, bio: "Comunicação clara e foco no detalhe.", avatar: "AV" },
  { id: "p8", nome: "Bruno L.", bairro: "Ipiranga", distanciaKm: 4.8, experiencias: ["eventos", "reposição"], avaliacao: 4.5, servicosConcluidos: 11, taxaComparecimento: 92, disponivel: true, bio: "Apoio em eventos e reposição rápida.", avatar: "BL" },
];

export const categorias = [
  "Reposição de produtos",
  "Organização de gôndolas",
  "Conferência de validade",
  "Apoio em estoque",
  "Apoio em evento",
  "Limpeza leve",
];

export const bicosIniciais: Bico[] = [
  {
    id: "b1", categoria: "Organização de gôndolas", titulo: "Organização de gôndolas",
    descricao: "Organizar 4 corredores antes do pico do fim de tarde.",
    empresa: "Mercado Boa Compra", empresaId: "e1", bairro: "Centro", cidade: "São Paulo",
    data: "Hoje", horaInicio: "14:00", horaFim: "18:00", duracaoHoras: 4, valorHora: 20, vagas: 1,
    distanciaKm: 1.8, status: "confirmado", prestadorConfirmadoId: "p1",
    requisitos: "Sem necessidade de experiência prévia.", esforcoFisico: true, fornecMaterial: true, fornecEPI: "na",
    responsavel: "Sr. Antônio", telefoneResp: "(11) 98888-0001",
  },
  {
    id: "b2", categoria: "Apoio em estoque", titulo: "Apoio em estoque",
    descricao: "Receber e organizar mercadoria que chega pela manhã.",
    empresa: "Mercadinho São José", empresaId: "e2", bairro: "Vila Nova", cidade: "São Paulo",
    data: "Amanhã", horaInicio: "08:00", horaFim: "12:00", duracaoHoras: 4, valorHora: 18, vagas: 2,
    distanciaKm: 2.5, status: "aguardando",
    requisitos: "Esforço físico leve.", esforcoFisico: true, fornecMaterial: true, fornecEPI: "sim",
    responsavel: "Dona Cláudia", telefoneResp: "(11) 98888-0002",
  },
  {
    id: "b3", categoria: "Conferência de validade", titulo: "Conferência de validade",
    descricao: "Conferir validade dos hortifrúti e setor de laticínios.",
    empresa: "HortiMais", empresaId: "e3", bairro: "Jardim América", cidade: "Campinas",
    data: "Sexta-feira", horaInicio: "09:00", horaFim: "12:00", duracaoHoras: 3, valorHora: 22, vagas: 1,
    distanciaKm: 3.2, status: "publicado",
    requisitos: "Atenção a detalhes.", esforcoFisico: false, fornecMaterial: true, fornecEPI: "na",
    responsavel: "Sr. Marcos", telefoneResp: "(19) 98888-0003",
  },
];

export const PRESTADOR_DEMO_ID = "p4";
export const EMPRESA_DEMO_ID = "e1";
