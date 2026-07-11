const pool = require("../config/database.js");

async function criarCliente(dadosCliente) {
    const {nome, cpf, telefone, email, endereco, cidade, estado, cep} = dadosCliente;
    const [resultado] = await pool
        .query(
            'INSERT INTO clientes (nome, cpf, telefone, email, endereco, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, cpf, telefone, email, endereco, cidade, estado, cep]
        );
    return resultado.insertId;
 }

async function listarCliente() {
  const [linhas] = await pool
    .query('SELECT id, nome, telefone, endereco FROM clientes');
  return linhas;
}

async function buscarClientePorId(id) {
  const [linhas] = await pool
    .query('SELECT nome, endereco, cpf FROM clientes WHERE id = ?', [id]);
    return linhas[0];
}

 module.exports = {
    criarCliente,
    listarCliente,
    buscarClientePorId
 }