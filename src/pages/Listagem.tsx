import { useState } from "react";
import { useAnuncios } from "../context/AnunciosContext";
import { AnuncioCard } from "../components/AnuncioCard";
import { BarraFiltros } from "../components/BarraFiltros";
import { aplicarFiltros, FILTROS_PADRAO } from "../utils/filtros";

/*
  Tela principal: mostra a lista de anúncios e a barra de filtros.
*/
export function Listagem() {
  const { anuncios } = useAnuncios();

  // Guarda quais filtros estão ativos (busca, categoria, preço, ordem).
  const [filtros, setFiltros] = useState(FILTROS_PADRAO);

  // Aplica os filtros e a ordenação na lista de anúncios.
  const visiveis = aplicarFiltros(anuncios, filtros);

  return (
    <section>
      <h1 className="mb-3">Anúncios</h1>

      <BarraFiltros filtros={filtros} onChange={setFiltros} />

      <p className="text-muted">
        {visiveis.length} anúncio{visiveis.length !== 1 ? "s" : ""}
      </p>

      {visiveis.length === 0 ? (
        <div className="alert alert-light border">
          Nenhum anúncio encontrado com esses filtros.
        </div>
      ) : (
        // row-cols define quantos cartões por linha em cada tamanho de tela.
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {visiveis.map((a) => (
            <div className="col" key={a.id}>
              <AnuncioCard anuncio={a} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
