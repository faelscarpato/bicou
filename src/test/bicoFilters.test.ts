import { describe, expect, it } from "vitest";
import { criarParametrosConsultaBicos, filtrarEOrdenarBicos, getBicoDateISO } from "@/lib/bicoFilters";
import { Bico } from "@/lib/types";

const baseBico: Bico = {
  id: "base",
  categoria: "Reposição de produtos",
  titulo: "Bico base",
  descricao: "Teste",
  empresa: "Mercado teste",
  empresaId: "e1",
  bairro: "Centro",
  cidade: "São Paulo",
  data: "Hoje",
  horaInicio: "09:00",
  horaFim: "12:00",
  duracaoHoras: 3,
  valorHora: 20,
  vagas: 1,
  distanciaKm: 2,
  status: "publicado",
};

describe("bicoFilters", () => {
  const hoje = new Date(2026, 4, 5);
  const bicos: Bico[] = [
    { ...baseBico, id: "b1", categoria: "Limpeza leve", data: "Hoje", valorHora: 20, distanciaKm: 1.5 },
    { ...baseBico, id: "b2", categoria: "Reposição de produtos", data: "Amanhã", valorHora: 18, distanciaKm: 4 },
    { ...baseBico, id: "b3", categoria: "Reposição de produtos", data: "Sexta-feira", valorHora: 30, distanciaKm: 2.5 },
  ];

  it("filtra por categoria, data e faixa de valor", () => {
    const resultado = filtrarEOrdenarBicos(
      bicos,
      {
        categorias: ["Reposição de produtos"],
        dataISO: "2026-05-06",
        valorHora: [10, 25],
        ordenarPor: "publicacao",
      },
      hoje,
    );

    expect(resultado.map((bico) => bico.id)).toEqual(["b2"]);
  });

  it("ordena por maior valor por hora", () => {
    const resultado = filtrarEOrdenarBicos(
      bicos,
      {
        categorias: [],
        valorHora: [0, 100],
        ordenarPor: "valor",
      },
      hoje,
    );

    expect(resultado.map((bico) => bico.id)).toEqual(["b3", "b1", "b2"]);
  });

  it("gera parametros prontos para futura consulta Supabase", () => {
    expect(
      criarParametrosConsultaBicos({
        categorias: ["Limpeza leve"],
        dataISO: "2026-05-05",
        valorHora: [15, 40],
        ordenarPor: "proximidade",
      }),
    ).toEqual({
      categorias: ["Limpeza leve"],
      data: "2026-05-05",
      valorHoraMin: 15,
      valorHoraMax: 40,
      ordenarPor: "proximidade",
    });
  });

  it("converte datas relativas para ISO", () => {
    expect(getBicoDateISO({ ...baseBico, data: "Hoje" }, hoje)).toBe("2026-05-05");
    expect(getBicoDateISO({ ...baseBico, data: "Amanhã" }, hoje)).toBe("2026-05-06");
  });
});
