import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAnuncios } from "../context/AnunciosContext";
import { useCep } from "../hooks/useCep";
import { CATEGORIAS } from "../types";
import type { Categoria, Endereco } from "../types";

// Endereço em branco, usado quando o formulário começa vazio.
const ENDERECO_VAZIO: Endereco = {
  cep: "",
  logradouro: "",
  bairro: "",
  cidade: "",
  estado: "",
};

/*
  Tela de formulário usada para CRIAR um anúncio novo
  e também para EDITAR um existente (quando tem id na URL).
*/
export function Cadastro() {
  const { id } = useParams();
  const { obter, adicionar, editar } = useAnuncios();
  const navigate = useNavigate();
  const cep = useCep(); // hook que busca o endereço pelo CEP

  const editando = Boolean(id); // tem id => estamos editando

  // Cada campo do formulário guardado em seu próprio estado.
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState<Categoria>(CATEGORIAS[0]);
  const [endereco, setEndereco] = useState<Endereco>(ENDERECO_VAZIO);
  const [erroForm, setErroForm] = useState("");
  const [cepOk, setCepOk] = useState(false); // mostra mensagem de sucesso do CEP

  // Quando estamos editando, preenche o formulário com os dados atuais.
  useEffect(() => {
    if (!id) return;
    const existente = obter(id);
    if (existente) {
      setTitulo(existente.titulo);
      setDescricao(existente.descricao);
      setPreco(String(existente.preco));
      setCategoria(existente.categoria);
      setEndereco(existente.endereco);
    }
  }, [id, obter]);

  // Muda só um campo do endereço, mantendo os outros.
  function mudarEndereco(campo: keyof Endereco, valor: string) {
    setEndereco({ ...endereco, [campo]: valor });
  }

  // Botão "Buscar CEP": chama a API e preenche os campos de endereço.
  async function buscarCep() {
    setCepOk(false);
    const resultado = await cep.consultar(endereco.cep);
    if (resultado) {
      setEndereco({ ...resultado, cep: endereco.cep });
      setCepOk(true);
    }
  }

  // Envio do formulário: valida e salva (cria ou edita).
  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErroForm("");

    const precoNumero = Number(preco);
    if (titulo.trim() === "") {
      setErroForm("Informe um título.");
      return;
    }
    if (precoNumero <= 0) {
      setErroForm("Informe um preço válido.");
      return;
    }

    const dados = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      preco: precoNumero,
      categoria,
      endereco,
    };

    if (editando && id) {
      editar(id, dados);
      navigate(`/anuncio/${id}`);
    } else {
      const novo = adicionar(dados);
      navigate(`/anuncio/${novo.id}`);
    }
  }

  return (
    <section style={{ maxWidth: 640 }}>
      <h1 className="mb-3">{editando ? "Editar anúncio" : "Novo anúncio"}</h1>

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Preço (R$)</label>
            <input
              type="number"
              className="form-control"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="border rounded p-3 mb-3">
          <legend className="float-none w-auto px-2 fs-6">Endereço</legend>

          <div className="row align-items-end mb-2">
            <div className="col">
              <label className="form-label">CEP</label>
              <input
                className="form-control"
                placeholder="00000-000"
                value={endereco.cep}
                onChange={(e) => mudarEndereco("cep", e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={buscarCep}
                disabled={cep.carregando}
              >
                {cep.carregando ? "Buscando..." : "Buscar CEP"}
              </button>
            </div>
          </div>

          {/* Mensagens dos três estados do CEP */}
          {cep.erro && <div className="alert alert-danger py-2">{cep.erro}</div>}
          {cepOk && (
            <div className="alert alert-success py-2">Endereço preenchido pelo CEP.</div>
          )}

          <div className="row mb-2">
            <div className="col">
              <label className="form-label">Logradouro</label>
              <input
                className="form-control"
                value={endereco.logradouro}
                onChange={(e) => mudarEndereco("logradouro", e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">Bairro</label>
              <input
                className="form-control"
                value={endereco.bairro}
                onChange={(e) => mudarEndereco("bairro", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label">Cidade</label>
              <input
                className="form-control"
                value={endereco.cidade}
                onChange={(e) => mudarEndereco("cidade", e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">Estado (UF)</label>
              <input
                className="form-control"
                maxLength={2}
                value={endereco.estado}
                onChange={(e) => mudarEndereco("estado", e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </fieldset>

        {erroForm && <div className="alert alert-danger">{erroForm}</div>}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editando ? "Salvar alterações" : "Publicar anúncio"}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
