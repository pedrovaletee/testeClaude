## Grupo

- Pedro Henrique Bernhardt Valete, Juliano Tavares da Silva e Érik Crestani Bueno

## Descrição da aplicação

A aplicação é um site de anúncios, parecido com o OLX. O usuário vai poder cadastrar produtos à venda e navegar pelos anúncios disponíveis.

As funcionalidades planejadas são:

- Listar, cadastrar, editar, remover e ver os detalhes de um anúncio;
- Buscar e filtrar os anúncios por categoria e faixa de preço, com ordenação por preço ou data;
- Marcar anúncios como favoritos e acessá-los em uma página separada;
- Preencher o endereço automaticamente a partir do CEP, usando a API do ViaCEP;
- Salvar os anúncios e os favoritos no navegador (localStorage), para que não se percam ao fechar a página.

## Justificativa da escolha do tema

Pensamos em uma plataforma de anúncios pois é algo que a gente usa no dia a dia e entende como funciona, o que facilita pensar nas telas e nas funcionalidades.

O cadastro e a listagem de anúncios cobrem o CRUD completo e a parte de busca, filtro e ordenação. Os anúncios e os favoritos ficam guardados em contexto e no localStorage, o que nos dá o uso de estado local e estado compartilhado. A integração com o ViaCEP entra como a API externa: ao digitar o CEP no formulário, buscamos o endereço e tratamos os estados de carregando, sucesso e erro. As telas (ex: listagem, cadastro, detalhes e favoritos) viram rotas diferentes, e a busca de CEP e o acesso ao localStorage devem ficar em hooks próprios para reaproveitar a lógica.

Para os testes, queremos cobrir as funções de filtro e ordenação e o tratamento da resposta da API. A tipagem estrita do TypeScript será usada para representar os dados (ex: anúncio, categoria, endereço) com interfaces próprias.
