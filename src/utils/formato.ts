/** Formata um valor numérico como moeda brasileira. */
export function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Formata uma data ISO como dd/mm/aaaa. */
export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}
