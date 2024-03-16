# Sistema de Bibliotecas API

Este projeto é uma API para um sistema de bibliotecas. Foi desenvolvido usando PostgreSQL para o banco de dados e JavaScript para a lógica do servidor.

## Configuração do Banco de Dados

O banco de dados é configurado usando PostgreSQL. O esquema do banco de dados inclui duas tabelas: `autores` e `livros`.

A tabela `autores` possui os seguintes campos:
- `id`: uma chave primária gerada automaticamente.
- `nome`: um campo de texto que armazena o nome do autor.
- `idade`: um campo inteiro que armazena a idade do autor.

A tabela `livros` possui os seguintes campos:
- `id`: uma chave primária gerada automaticamente.
- `nome`: um campo de texto que armazena o nome do livro.
- `genero`: um campo de texto que armazena o gênero do livro.
- `editora`: um campo de texto que armazena a editora do livro.
- `data_publicacao`: um campo de data que armazena a data de publicação do livro.
- `id_autor`: uma chave estrangeira que referencia o id do autor do livro na tabela `autores`.

## Configuração do Servidor

O servidor é configurado usando Express.js. O servidor usa o middleware `express.json()` para analisar o corpo das solicitações como JSON.

O servidor também usa um roteador Express, que é importado do módulo `rotas.js`. Este roteador define várias rotas para diferentes endpoints da API.

## Rotas da API

A API possui os seguintes endpoints:

- `POST /autor`: Cadastra um novo autor. Espera um corpo de solicitação com os campos `nome` e `idade`.
- `GET /autor/:id`: Busca um autor pelo id. O id é passado como parâmetro na URL.
- `POST /autor/:id/livro`: Cadastra um novo livro para um autor. O id do autor é passado como parâmetro na URL. Espera um corpo de solicitação com os campos `nome`, `genero`, `editora` e `data_publicacao`.
- `GET /livro`: Lista todos os livros.

## Executando o Projeto

Para executar o projeto, você precisa ter Node.js e PostgreSQL instalados em sua máquina.

Primeiro, instale as dependências do projeto com o comando `npm install`.

Em seguida, crie o banco de dados e as tabelas usando o arquivo `dump.sql`.

Finalmente, inicie o servidor com o comando `npm run dev`. O servidor irá rodar na porta 3000. O Nodemon irá reiniciar automaticamente o servidor sempre que você fizer alterações no código.