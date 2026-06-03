import { Link } from "react-router-dom";
import type { Anuncio } from "../types";
import { useAnuncios } from "../context/AnunciosContext";
import { formatarPreco } from "../utils/formato";

/*
  O "cartão" que mostra um anúncio na lista.
  Recebe um anúncio por "props" e desenha o título, preço, etc.
*/
export function AnuncioCard({ anuncio }: { anuncio: Anuncio }) {
  const { ehFavorito, alternarFavorito } = useAnuncios();
  const favorito = ehFavorito(anuncio.id);

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <span className="badge text-bg-secondary">{anuncio.categoria}</span>
          {/* Botão de estrela: liga/desliga o favorito */}
          <button
            type="button"
            className="btn btn-sm btn-link p-0 fs-5 text-warning"
            onClick={() => alternarFavorito(anuncio.id)}
          >
            {favorito ? "★" : "☆"}
          </button>
        </div>

        <h5 className="card-title mt-2">{anuncio.titulo}</h5>
        <p className="fw-bold fs-5 mb-1">{formatarPreco(anuncio.preco)}</p>
        <p className="text-muted small mb-3">
          {anuncio.endereco.cidade}/{anuncio.endereco.estado}
        </p>

        {/* mt-auto empurra o botão para o rodapé do cartão */}
        <Link
          to={`/anuncio/${anuncio.id}`}
          className="btn btn-outline-primary btn-sm mt-auto"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
