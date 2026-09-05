const pool = require("../config/database.js");

async function criarCliente(dadosCliente) {
    const {
        nome,  
        telefone,  
        endereco, 
        cidade, 
        estado, 
        cep} = dadosCliente;

    const [resultado] = await pool
      .query(
          `
          INSERT INTO clientes (nome, 
          telefone, 
          endereco, 
          cidade, 
          estado, 
          cep) VALUES (?, ?, ?, ?, ?, ?)
          `,
          [nome, 
            telefone, 
            endereco, 
            cidade,
            estado, 
            cep]
        );

    return {
      id: resultado.insertId
    };
 };

async function listarClientes() {
  const [linhas] = await pool
    .query('SELECT id, nome, telefone, endereco FROM clientes');
  return linhas;
};

async function buscarClientePorId(id) {

    const [linhas] = await pool.query(
        `
        SELECT
            id,
            nome,
            telefone,
            endereco,
            cidade,
            estado,
            cep
        FROM clientes
        WHERE id = ?
        `,
        [id]
    );
    return linhas[0] || null;
};


async function atualizarCliente(id, novosDados) {
    const {
        nome,
        telefone,
        endereco,
        cidade,
        estado,
        cep
    } = novosDados;
    await pool.query(
        `
        UPDATE clientes
        SET
            nome = ?,
            telefone = ?,
            endereco = ?,
            cidade = ?,
            estado = ?,
            cep = ?
        WHERE id = ?
        `,
        [
            nome,
            telefone,
            endereco,
            cidade,
            estado,
            cep,
            id
        ]
    );

};

 module.exports = {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente
 };