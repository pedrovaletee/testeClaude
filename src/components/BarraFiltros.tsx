import type { FiltrosAnuncio } from "../types";
import { CATEGORIAS } from "../types";

/*
  Barra com os campos de busca, categoria, faixa de preço e ordenação.
  Ela não guarda os valores: recebe os "filtros" e avisa a tela
  (através de onChange) toda vez que algo muda.
*/
interface Props {
  filtros: FiltrosAnuncio;
  onChange: (filtros: FiltrosAnuncio) => void;
}

export function BarraFiltros({ filtros, onChange }: Props) {
  // Função ajudante: muda só um campo e mantém o resto igual.
  function mudar(campo: keyof FiltrosAnuncio, valor: unknown) {
    onChange({ ...filtros, [campo]: valor });
  }

  // Transforma o texto do campo de preço em número (ou null se vazio).
  function paraNumero(texto: string): number | null {
    return texto === "" ? null : Number(texto);
  }

  return (
    <div className="row g-2 mb-4">
      <div className="col-12 col-md-4">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar anúncios..."
          value={filtros.busca}
          onChange={(e) => mudar("busca", e.target.value)}
        />
      </div>

      <div className="col-6 col-md-2">
        <select
          className="form-select"
          value={filtros.categoria}
          onChange={(e) => mudar("categoria", e.target.value)}
        >
          <option value="todas">Todas</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="col-3 col-md-2">
        <input
          type="number"
          className="form-control"
          placeholder="Mín."
          value={filtros.precoMin ?? ""}
          onChange={(e) => mudar("precoMin", paraNumero(e.target.value))}
        />
      </div>

      <div className="col-3 col-md-2">
        <input
          type="number"
          className="form-control"
          placeholder="Máx."
          value={filtros.precoMax ?? ""}
          onChange={(e) => mudar("precoMax", paraNumero(e.target.value))}
        />
      </div>

      <div className="col-6 col-md-1">
        <select
          className="form-select"
          value={filtros.ordenarPor}
          onChange={(e) => mudar("ordenarPor", e.target.value)}
        >
          <option value="data">Data</option>
          <option value="preco">Preço</option>
        </select>
      </div>

      <div className="col-6 col-md-1">
        <select
          className="form-select"
          value={filtros.direcao}
          onChange={(e) => mudar("direcao", e.target.value)}
        >
          <option value="desc">↓</option>
          <option value="asc">↑</option>
        </select>
      </div>
    </div>
  );
}
