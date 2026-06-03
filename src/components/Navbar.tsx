import { Link, NavLink } from "react-router-dom";

/*
  Barra de navegação no topo do site.
  As classes (navbar, bg-primary, btn...) são do Bootstrap: elas já
  vêm prontas com cores, espaçamento e responsividade.
*/
export function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📦 Anúncios
        </Link>

        <div className="navbar-nav me-auto">
          <NavLink className="nav-link" to="/" end>
            Anúncios
          </NavLink>
          <NavLink className="nav-link" to="/favoritos">
            Favoritos
          </NavLink>
        </div>

        <Link className="btn btn-light btn-sm" to="/novo">
          + Anunciar
        </Link>
      </div>
    </nav>
  );
}
