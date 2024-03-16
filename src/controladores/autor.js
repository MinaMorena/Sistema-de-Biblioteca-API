const pool = require("../conexao");

async function cadastrarAutor(req, res) {
    const { nome, idade } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório." })
    }

    try {             // returning * retorna os valores inseridos com o id. 
        const query = "insert into autores (nome, idade) values ($1, $2) returning *"

        const { rows } = await pool.query(query, [nome, idade])
        return res.status(201).json(rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

async function buscarAutor(req, res) {
    const { id } = req.params;

    try {
        const query = "select * from autores where id = $1"
        const { rowCount, rows } = await pool.query(query, [id])

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "Autor não encontrado" })
        }

        let autor = rows[0]
        const livrosDoAutor = await pool.query("select * from livros where id_autor = $1", [id])
        autor.livros = livrosDoAutor.rows

        return res.json(autor)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = { cadastrarAutor, buscarAutor }