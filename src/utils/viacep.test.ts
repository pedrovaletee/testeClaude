import { describe, it, expect, vi, afterEach } from "vitest";
import { normalizarCep, cepValido, parseEndereco, buscarCep } from "./viacep";
import type { ViaCepResposta } from "../types";

describe("normalizarCep / cepValido", () => {
  it("remove caracteres não numéricos", () => {
    expect(normalizarCep("90010-150")).toBe("90010150");
    expect(normalizarCep("90.010-150")).toBe("90010150");
  });

  it("valida tamanho de 8 dígitos", () => {
    expect(cepValido("90010-150")).toBe(true);
    expect(cepValido("123")).toBe(false);
  });
});

describe("parseEndereco", () => {
  it("converte resposta válida em Endereco tipado", () => {
    const resposta: ViaCepResposta = {
      cep: "90010-150",
      logradouro: "Rua dos Andradas",
      bairro: "Centro Histórico",
      localidade: "Porto Alegre",
      uf: "RS",
    };
    expect(parseEndereco(resposta)).toEqual({
      cep: "90010-150",
      logradouro: "Rua dos Andradas",
      bairro: "Centro Histórico",
      cidade: "Porto Alegre",
      estado: "RS",
    });
  });

  it("lança erro quando a resposta indica CEP inexistente", () => {
    expect(() => parseEndereco({ erro: true })).toThrow("CEP não encontrado");
  });

  it("usa string vazia para campos ausentes", () => {
    expect(parseEndereco({ cep: "01001-000" }).logradouro).toBe("");
  });
});

describe("buscarCep", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejeita CEP com formato inválido antes de chamar a API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await expect(buscarCep("123")).rejects.toThrow("8 dígitos");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("retorna endereço em caso de sucesso", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ cep: "90010-150", localidade: "Porto Alegre", uf: "RS" }),
        { status: 200 }
      )
    );
    const endereco = await buscarCep("90010-150");
    expect(endereco.cidade).toBe("Porto Alegre");
    expect(endereco.estado).toBe("RS");
  });

  it("propaga erro quando o CEP não existe", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ erro: true }), { status: 200 })
    );
    await expect(buscarCep("00000-000")).rejects.toThrow("CEP não encontrado");
  });
});
