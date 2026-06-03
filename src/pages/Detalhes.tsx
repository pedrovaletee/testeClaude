import { useParams, useNavigate, Link } from "react-router-dom";
import { useAnuncios } from "../context/AnunciosContext";
import { formatarData, formatarPreco } from "../utils/formato";

/*
  Tela com os detalhes de um anúncio.
  O id do anúncio vem da URL (ex: /anuncio/123).
*/
export function Detalhes() {
  const { id } = useParams(); // pega o id que está na URL
  const { obter, remover, ehFavorito, alternarFavorito } = useAnuncios();
  const navigate = useNavigate(); // serve para trocar de página por código

  const anuncio = id ? obter(id) : undefined;

  // Se não achou o anúncio, mostra um aviso.
  if (!anuncio) {
    return (
      <div className="alert alert-warning">
        Anúncio não encontrado. <Link to="/">Voltar para a lista</Link>
      </div>
    );
  }

  function apagar() {
    if (anuncio && confirm("Remover este anúncio?")) {
      remover(anuncio.id);
      navigate("/"); // volta para a lista
    }
  }

  const favorito = ehFavorito(anuncio.id);

  return (
    <section>
      <Link to="/" className="btn btn-link ps-0">
        ← Voltar
      </Link>

      <div className="card shadow-sm">
        <div className="card-body">
          <span className="badge text-bg-secondary">{anuncio.categoria}</span>

          <h1 className="h3 mt-2">{anuncio.titulo}</h1>
          <p className="fs-3 fw-bold text-primary mb-1">
            {formatarPreco(anuncio.preco)}
          </p>
          <p className="text-muted small">
            Publicado em {formatarData(anuncio.criadoEm)}
          </p>

          <h2 className="h5 mt-4">Descrição</h2>
          <p>{anuncio.descricao}</p>

          <h2 className="h5 mt-4">Localização</h2>
          <p className="mb-0">
            {anuncio.endereco.logradouro}
            {anuncio.endereco.bairro && `, ${anuncio.endereco.bairro}`}
            <br />
            {anuncio.endereco.cidade}/{anuncio.endereco.estado} — CEP{" "}
            {anuncio.endereco.cep}
          </p>

          <div className="d-flex gap-2 mt-4">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => alternarFavorito(anuncio.id)}
            >
              {favorito ? "★ Favoritado" : "☆ Favoritar"}
            </button>
            <Link to={`/anuncio/${anuncio.id}/editar`} className="btn btn-outline-primary">
              Editar
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={apagar}>
              Remover
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
