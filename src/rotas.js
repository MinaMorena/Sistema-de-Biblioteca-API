const express = require("express");
const { cadastrarAutor, buscarAutor } = require("./controladores/autor");
const { cadastrarLivro, listarLivros } = require("./controladores/livro");

const rota = express();

rota.post("/autor", cadastrarAutor);
rota.get("/autor/:id", buscarAutor);
rota.post("/autor/:id/livro", cadastrarLivro);
rota.get("/livro", listarLivros);

module.exports = rota