import type { Endereco, ViaCepResposta } from "../types";

/** Remove tudo que não é dígito do CEP. */
export function normalizarCep(cep: string): string {
  return cep.replace(/\D/g, "");
}

export function cepValido(cep: string): boolean {
  return normalizarCep(cep).length === 8;
}

/**
 * Converte a resposta crua do ViaCEP em um Endereco tipado.
 * Lança erro quando o CEP não existe (campo `erro` na resposta).
 */
export function parseEndereco(resposta: ViaCepResposta): Endereco {
  if (resposta.erro) {
    throw new Error("CEP não encontrado.");
  }
  return {
    cep: resposta.cep ?? "",
    logradouro: resposta.logradouro ?? "",
    bairro: resposta.bairro ?? "",
    cidade: resposta.localidade ?? "",
    estado: resposta.uf ?? "",
  };
}

/** Busca o endereço no ViaCEP. Separado para facilitar mock nos testes. */
export async function buscarCep(cep: string): Promise<Endereco> {
  const limpo = normalizarCep(cep);
  if (!cepValido(limpo)) {
    throw new Error("CEP deve ter 8 dígitos.");
  }

  const resp = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
  if (!resp.ok) {
    throw new Error("Falha ao consultar o CEP.");
  }

  const dados = (await resp.json()) as ViaCepResposta;
  return parseEndereco(dados);
}
