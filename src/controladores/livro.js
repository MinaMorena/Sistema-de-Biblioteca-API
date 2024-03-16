const pool = require("../conexao");

async function cadastrarLivro(req, res) {
    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório." })
    }

    try {
        const resultado = await pool.query("select * from autores where id = $1", [id])

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Autor não encontrado" })
        }

        const query = `
        insert into livros (nome, genero, editora, data_publicacao, id_autor)
        values ($1, $2, $3, $4, $5) returning *`

        const livro = await pool.query(query, [nome, genero, editora, data_publicacao, id])
        return res.status(201).json(livro.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

async function listarLivros(req, res) {
    try {
        const query = `
        select l.id, l.nome, l.genero, l.editora, l.data_publicacao, l.id_autor, a.nome as autor_nome, 
        a.idade as autor_idade from livros l left join autores a on l.id_autor = a.id
        `

        const { rows } = await pool.query(query)

        const livros = rows.map(livro => {
            const { id_autor, autor_nome, autor_idade, ...dadosLivro } = livro
            return {
                ...dadosLivro,
                autor: {
                    id: id_autor,
                    nome: autor_nome,
                    idade: autor_idade
                }
            }
        })

        return res.json(livros)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = { cadastrarLivro, listarLivros }