import { useState } from "react";
import type { Endereco } from "../types";
import { buscarCep } from "../utils/viacep";

/*
  Hook que busca o endereço a partir do CEP usando a API do ViaCEP.
  Ele controla os três estados que a tela precisa mostrar:
  "carregando", "sucesso" e "erro".
*/
export function useCep() {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Faz a busca e devolve o endereço (ou null, se deu erro).
  async function consultar(cep: string): Promise<Endereco | null> {
    setCarregando(true);
    setErro(null);
    try {
      const endereco = await buscarCep(cep);
      setCarregando(false);
      return endereco;
    } catch (e) {
      // Se algo deu errado, guarda a mensagem para mostrar na tela.
      const mensagem = e instanceof Error ? e.message : "Erro ao buscar o CEP.";
      setErro(mensagem);
      setCarregando(false);
      return null;
    }
  }

  return { carregando, erro, consultar };
}
