const pool = require("../config/database.js");

async function criarCliente(dadosCliente) {
    const {nome, telefone, endereco} = dadosCliente;
    const [resultado] = await pool
        .query(
            'INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)',
            [nome, telefone, endereco]
        );
    return resultado.insertId;
 }

 module.exports = {
    criarCliente
 }