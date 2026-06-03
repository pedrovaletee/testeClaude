import { useEffect, useState } from "react";

/*
  Hook = uma função que reaproveita lógica do React.
  Este aqui funciona como o useState normal, mas com um extra:
  ele salva o valor no navegador (localStorage), então os dados
  não se perdem quando a página é fechada.
*/
export function useLocalStorage<T>(chave: string, valorInicial: T) {
  // 1) Ao iniciar, tenta ler o que já estava salvo no navegador.
  const [valor, setValor] = useState<T>(() => {
    const salvo = localStorage.getItem(chave);
    return salvo ? (JSON.parse(salvo) as T) : valorInicial;
  });

  // 2) Sempre que o valor mudar, salva de novo no navegador.
  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor));
  }, [chave, valor]);

  // Devolve o valor e a função para mudá-lo, igual ao useState.
  return [valor, setValor] as const;
}
