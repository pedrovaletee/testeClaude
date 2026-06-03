import { describe, it, expect } from "vitest";
import { filtrarAnuncios, ordenarAnuncios, aplicarFiltros } from "./filtros";
import type { Anuncio, FiltrosAnuncio } from "../types";

function fazAnuncio(over: Partial<Anuncio>): Anuncio {
  return {
    id: "x",
    titulo: "Item",
    descricao: "",
    preco: 100,
    categoria: "Outros",
    endereco: { cep: "", logradouro: "", bairro: "", cidade: "", estado: "" },
    criadoEm: "2026-01-01T00:00:00.000Z",
    ...over,
  };
}

const base: FiltrosAnuncio = {
  busca: "",
  categoria: "todas",
  precoMin: null,
  precoMax: null,
  ordenarPor: "data",
  direcao: "desc",
};

const dados: Anuncio[] = [
  fazAnuncio({ id: "1", titulo: "Bicicleta aro 29", categoria: "Esportes", preco: 1200, criadoEm: "2026-03-01T00:00:00.000Z" }),
  fazAnuncio({ id: "2", titulo: "iPhone 13", categoria: "Eletrônicos", preco: 2800, criadoEm: "2026-05-01T00:00:00.000Z" }),
  fazAnuncio({ id: "3", titulo: "Sofá 3 lugares", descricao: "tecido suede", categoria: "Móveis", preco: 950, criadoEm: "2026-04-01T00:00:00.000Z" }),
];

describe("filtrarAnuncios", () => {
  it("filtra por texto no título (case-insensitive)", () => {
    const r = filtrarAnuncios(dados, { ...base, busca: "iphone" });
    expect(r.map((a) => a.id)).toEqual(["2"]);
  });

  it("filtra por texto na descrição", () => {
    const r = filtrarAnuncios(dados, { ...base, busca: "suede" });
    expect(r.map((a) => a.id)).toEqual(["3"]);
  });

  it("filtra por categoria", () => {
    const r = filtrarAnuncios(dados, { ...base, categoria: "Esportes" });
    expect(r.map((a) => a.id)).toEqual(["1"]);
  });

  it("filtra por faixa de preço", () => {
    const r = filtrarAnuncios(dados, { ...base, precoMin: 1000, precoMax: 2000 });
    expect(r.map((a) => a.id)).toEqual(["1"]);
  });

  it("combina busca e categoria", () => {
    const r = filtrarAnuncios(dados, { ...base, busca: "sofá", categoria: "Móveis" });
    expect(r.map((a) => a.id)).toEqual(["3"]);
  });

  it("retorna vazio quando nada casa", () => {
    expect(filtrarAnuncios(dados, { ...base, busca: "geladeira" })).toHaveLength(0);
  });
});

describe("ordenarAnuncios", () => {
  it("ordena por preço ascendente", () => {
    const r = ordenarAnuncios(dados, "preco", "asc");
    expect(r.map((a) => a.preco)).toEqual([950, 1200, 2800]);
  });

  it("ordena por preço descendente", () => {
    const r = ordenarAnuncios(dados, "preco", "desc");
    expect(r.map((a) => a.preco)).toEqual([2800, 1200, 950]);
  });

  it("ordena por data (mais recente primeiro)", () => {
    const r = ordenarAnuncios(dados, "data", "desc");
    expect(r.map((a) => a.id)).toEqual(["2", "3", "1"]);
  });

  it("não muta o array original", () => {
    const copia = [...dados];
    ordenarAnuncios(dados, "preco", "asc");
    expect(dados).toEqual(copia);
  });
});

describe("aplicarFiltros", () => {
  it("filtra e depois ordena", () => {
    const r = aplicarFiltros(dados, {
      ...base,
      precoMin: 900,
      ordenarPor: "preco",
      direcao: "asc",
    });
    expect(r.map((a) => a.id)).toEqual(["3", "1", "2"]);
  });
});
