export const CATEGORIAS = [
  "Eletrônicos",
  "Móveis",
  "Veículos",
  "Imóveis",
  "Moda",
  "Esportes",
  "Outros",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Anuncio {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
  endereco: Endereco;
  criadoEm: string; // ISO date
}

/** Dados do formulário, sem campos gerados pelo sistema (id, criadoEm). */
export type AnuncioInput = Omit<Anuncio, "id" | "criadoEm">;

export type OrdenacaoCampo = "data" | "preco";
export type OrdenacaoDirecao = "asc" | "desc";

export interface FiltrosAnuncio {
  busca: string;
  categoria: Categoria | "todas";
  precoMin: number | null;
  precoMax: number | null;
  ordenarPor: OrdenacaoCampo;
  direcao: OrdenacaoDirecao;
}

/** Resposta crua da API do ViaCEP. */
export interface ViaCepResposta {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
}
