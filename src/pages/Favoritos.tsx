import { Link } from "react-router-dom";
import { useAnuncios } from "../context/AnunciosContext";
import { AnuncioCard } from "../components/AnuncioCard";

/*
  Tela que mostra só os anúncios marcados como favoritos.
*/
export function Favoritos() {
  const { anuncios, favoritos } = useAnuncios();

  // Pega da lista completa só os anúncios cujo id está nos favoritos.
  const lista = anuncios.filter((a) => favoritos.includes(a.id));

  return (
    <section>
      <h1 className="mb-3">Favoritos</h1>

      {lista.length === 0 ? (
        <div className="alert alert-light border">
          Você ainda não favoritou nenhum anúncio. <Link to="/">Ver anúncios</Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {lista.map((a) => (
            <div className="col" key={a.id}>
              <AnuncioCard anuncio={a} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
