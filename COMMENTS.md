Olá, pessoal!
Abaixo os tópicos necessários sobre o projeto.

DECISÃO DE ARQUITETURA:

- Comecei o projeto do 0 utilizando o vue-cli. Segui um desenvolvimento padrão focando nas funcionalidades, até porque na prática eu nunca utilizei TDD, por exemplo. Infelizmente não consegui aplicar os testes nos componentes.
  Como a minha intensão era disponibilizar o teste pratíco no Heroku, utilizei um addon do Heroku chamado JawsDB MySQL para criar o banco.

LISTA DE BIBLIOTECAS DE TERCEIROS UTILIZADAS:

- Usei Eslint, prettier, editorconfig e gitattributes para padronização de código.

Frontend:

- Axios -> Para requisições http. Escolhi usar axios ao invés de fetch pela praticidade das requisições, pela compatibilidade e pelo conjunto de funcionalidades.
- Vue the Mask -> Já utilizei antes em outros projetos. É uma ótima biblioteca para adicionar máscaras nos inputs.

Backend:

- Nodemon -> Apenas para o desenvolvimento. Clássico para o autoreload da aplicação.
- Morgan -> Para ter o controle de Logs.
- Cors -> Para as políticas do header das requisições.

O QUE VOCÊ MELHORARIA SE TIVESSE MAIS TEMPO:

Frontend:

- Com certeza poderia melhorar o layout em vários aspectos. Como entendi que o teste é algo mais funcional, o layout ficou bem básico.
- Um foco mais em semântica e acessibilidade.
- Melhor utilização da componentização. Alguns elementos poderiam ser divididos para uma melhor reutilização. Como era apenas uma página, mantive uma abordagem mais simples.
- Acredito que o uso do Vuex para um melhor controle de estados seria interessante, me baseando que teriam diversas outras rotas, cadastros e gerenciamentos.
- Optei por manter uma validação de campos padrão sem usar uma lib externa. Mas acredito que com maior complexidade do projeto, utilizaria algo como o VeeValidate.
- Arquitetura de pastas e de arquivos parecem boas. Mas, de repente, separaria os scripts do template, pois conforme a lógica cresce, dificulta a manutenção do componente com scrolls muito longos.
- Utilização de typescript.
- A utilização de SWR para uma melhor experiência do usuário. Claro que depende do projeto como um todo, mas me parece uma boa ideia de utilização.

Backend:

- Arquitetura de pastas. Implementando a divisão das responsabilidades para controllers e etc.
- Apesar de eu ter feito um tratamento de erros, é algo que poderia ser melhorado deixando mais completo.
- Utilização de typescript.

QUAIS REQUISITOS OBRIGATÓRIOS QUE NÃO FORAM ENTREGUES:

- Testes -> Estava como um item desejável, mas acho que se encaixa igual.

Galera, agradeço imensamente a oportunidade.
Foi um teste bem interessante e divertido de realizar.
Um ótimo dia! Abraços!
