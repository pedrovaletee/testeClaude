import type { Anuncio } from "../types";

/** Anúncios de exemplo para o primeiro carregamento. */
export const ANUNCIOS_SEED: Anuncio[] = [
  {
    id: "seed-1",
    titulo: "iPhone 13 128GB",
    descricao: "Seminovo, sem marcas de uso, com caixa e carregador.",
    preco: 2800,
    categoria: "Eletrônicos",
    endereco: {
      cep: "90010-150",
      logradouro: "Rua dos Andradas",
      bairro: "Centro Histórico",
      cidade: "Porto Alegre",
      estado: "RS",
    },
    criadoEm: "2026-05-20T14:00:00.000Z",
  },
  {
    id: "seed-2",
    titulo: "Sofá retrátil 3 lugares",
    descricao: "Tecido suede cinza, muito confortável. Retirada no local.",
    preco: 950,
    categoria: "Móveis",
    endereco: {
      cep: "88010-400",
      logradouro: "Rua Felipe Schmidt",
      bairro: "Centro",
      cidade: "Florianópolis",
      estado: "SC",
    },
    criadoEm: "2026-05-28T09:30:00.000Z",
  },
  {
    id: "seed-3",
    titulo: "Bicicleta aro 29 MTB",
    descricao: "21 marchas, freio a disco, revisada recentemente.",
    preco: 1200,
    categoria: "Esportes",
    endereco: {
      cep: "80010-000",
      logradouro: "Rua XV de Novembro",
      bairro: "Centro",
      cidade: "Curitiba",
      estado: "PR",
    },
    criadoEm: "2026-06-01T18:45:00.000Z",
  },
];
