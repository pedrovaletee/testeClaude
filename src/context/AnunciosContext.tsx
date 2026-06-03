import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Anuncio, AnuncioInput } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ANUNCIOS_SEED } from "../data/seed";

/*
  O "Context" é uma caixa de dados que fica disponível para o app inteiro.
  Assim qualquer tela pode ler a lista de anúncios e os favoritos,
  sem precisar passar essas informações de componente em componente.
*/

// Tudo o que o Context oferece para as telas.
interface AnunciosContextValor {
  anuncios: Anuncio[];
  favoritos: string[]; // guardamos só os ids dos anúncios favoritados
  adicionar: (input: AnuncioInput) => Anuncio;
  editar: (id: string, input: AnuncioInput) => void;
  remover: (id: string) => void;
  obter: (id: string) => Anuncio | undefined;
  alternarFavorito: (id: string) => void;
  ehFavorito: (id: string) => boolean;
}

const AnunciosContext = createContext<AnunciosContextValor | null>(null);

export function AnunciosProvider({ children }: { children: ReactNode }) {
  // useLocalStorage = igual ao useState, mas também salva no navegador.
  const [anuncios, setAnuncios] = useLocalStorage<Anuncio[]>("anuncios", ANUNCIOS_SEED);
  const [favoritos, setFavoritos] = useLocalStorage<string[]>("favoritos", []);

  // Cria um anúncio novo (gera o id e a data automaticamente).
  function adicionar(input: AnuncioInput): Anuncio {
    const novo: Anuncio = {
      ...input,
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString(),
    };
    setAnuncios([novo, ...anuncios]);
    return novo;
  }

  // Substitui os dados de um anúncio já existente.
  function editar(id: string, input: AnuncioInput) {
    setAnuncios(anuncios.map((a) => (a.id === id ? { ...a, ...input } : a)));
  }

  // Apaga o anúncio e tira ele dos favoritos também.
  function remover(id: string) {
    setAnuncios(anuncios.filter((a) => a.id !== id));
    setFavoritos(favoritos.filter((fid) => fid !== id));
  }

  // Procura um anúncio pelo id.
  function obter(id: string): Anuncio | undefined {
    return anuncios.find((a) => a.id === id);
  }

  // Adiciona ou remove dos favoritos (liga/desliga).
  function alternarFavorito(id: string) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  function ehFavorito(id: string): boolean {
    return favoritos.includes(id);
  }

  const valor: AnunciosContextValor = {
    anuncios,
    favoritos,
    adicionar,
    editar,
    remover,
    obter,
    alternarFavorito,
    ehFavorito,
  };

  return <AnunciosContext.Provider value={valor}>{children}</AnunciosContext.Provider>;
}

// Atalho para as telas pegarem os dados: const { anuncios } = useAnuncios()
export function useAnuncios(): AnunciosContextValor {
  const ctx = useContext(AnunciosContext);
  if (!ctx) {
    throw new Error("useAnuncios precisa estar dentro de <AnunciosProvider>.");
  }
  return ctx;
}
