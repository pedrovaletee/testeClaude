import type { Anuncio, FiltrosAnuncio } from "../types";

/** Filtra anúncios por texto de busca, categoria e faixa de preço. */
export function filtrarAnuncios(
  anuncios: Anuncio[],
  filtros: FiltrosAnuncio
): Anuncio[] {
  const buscaNorm = filtros.busca.trim().toLowerCase();

  return anuncios.filter((anuncio) => {
    if (buscaNorm) {
      const alvo = `${anuncio.titulo} ${anuncio.descricao}`.toLowerCase();
      if (!alvo.includes(buscaNorm)) return false;
    }

    if (filtros.categoria !== "todas" && anuncio.categoria !== filtros.categoria) {
      return false;
    }

    if (filtros.precoMin != null && anuncio.preco < filtros.precoMin) return false;
    if (filtros.precoMax != null && anuncio.preco > filtros.precoMax) return false;

    return true;
  });
}

/** Ordena (sem mutar) por preço ou data, asc ou desc. */
export function ordenarAnuncios(
  anuncios: Anuncio[],
  ordenarPor: FiltrosAnuncio["ordenarPor"],
  direcao: FiltrosAnuncio["direcao"]
): Anuncio[] {
  const fator = direcao === "asc" ? 1 : -1;

  return [...anuncios].sort((a, b) => {
    if (ordenarPor === "preco") {
      return (a.preco - b.preco) * fator;
    }
    const dataA = new Date(a.criadoEm).getTime();
    const dataB = new Date(b.criadoEm).getTime();
    return (dataA - dataB) * fator;
  });
}

/** Aplica filtro + ordenação em sequência. */
export function aplicarFiltros(
  anuncios: Anuncio[],
  filtros: FiltrosAnuncio
): Anuncio[] {
  const filtrados = filtrarAnuncios(anuncios, filtros);
  return ordenarAnuncios(filtrados, filtros.ordenarPor, filtros.direcao);
}

export const FILTROS_PADRAO: FiltrosAnuncio = {
  busca: "",
  categoria: "todas",
  precoMin: null,
  precoMax: null,
  ordenarPor: "data",
  direcao: "desc",
};
