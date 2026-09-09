const pool = require("../config/database.js");


async function criarCarro(dadosCarro) {
    const {
        cliente_id,
        placa,
        marca,
        modelo,
        ano,
        km,
        chassi,
        renavam,
        observacoes
    } = dadosCarro;

    const [resultado] = await pool.query(
        `
        INSERT INTO carros (
            cliente_id,
            placa,
            marca,
            modelo,
            ano,
            km,
            chassi,
            renavam,
            observacoes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            cliente_id,
            placa,
            marca,
            modelo,
            ano,
            km,
            chassi,
            renavam,
            observacoes
        ]
    );

    return {
        id: resultado.insertId
    };
}


async function listarCarros(clienteId) {

    if (clienteId) {
        const [linhas] = await pool.query(
            `
            SELECT
                c.id, c.cliente_id, c.placa, c.marca, c.modelo,
                c.ano, c.km, c.chassi, c.renavam, c.observacoes, c.created_at,
                cl.nome AS cliente_nome
            FROM carros c
            JOIN clientes cl ON cl.id = c.cliente_id
            WHERE c.ativo = 1 AND c.cliente_id = ?
            ORDER BY c.id DESC
            `,
            [clienteId]
        );
        return linhas;
    }

    const [linhas] = await pool.query(
        `
        SELECT
            c.id, c.cliente_id, c.placa, c.marca, c.modelo,
            c.ano, c.km, c.chassi, c.renavam, c.observacoes, c.created_at,
            cl.nome AS cliente_nome
        FROM carros c
        JOIN clientes cl ON cl.id = c.cliente_id
        WHERE c.ativo = 1
        ORDER BY c.id DESC
        `
    );
    return linhas;
}


async function buscarCarroPorId(id) {
    const [linhas] = await pool.query(
        `
        SELECT
            c.id, c.cliente_id, c.placa, c.marca, c.modelo,
            c.ano, c.km, c.chassi, c.renavam, c.observacoes, c.created_at,
            cl.nome AS cliente_nome
        FROM carros c
        JOIN clientes cl ON cl.id = c.cliente_id
        WHERE c.id = ? AND c.ativo = 1
        `,
        [id]
    );
    return linhas[0] || null;
}


async function buscarCarroPorPlaca(placa) {
    const [linhas] = await pool.query(
        `
        SELECT id
        FROM carros
        WHERE placa = ? AND ativo = 1
        `,
        [placa]
    );
    return linhas[0] || null;
}


async function atualizarCarro(id, novosDados) {
    const {
        cliente_id,
        placa,
        marca,
        modelo,
        ano,
        km,
        chassi,
        renavam,
        observacoes
    } = novosDados;

    await pool.query(
        `
        UPDATE carros
        SET
            cliente_id = ?,
            placa = ?,
            marca = ?,
            modelo = ?,
            ano = ?,
            km = ?,
            chassi = ?,
            renavam = ?,
            observacoes = ?
        WHERE id = ?
        `,
        [
            cliente_id,
            placa,
            marca,
            modelo,
            ano,
            km,
            chassi,
            renavam,
            observacoes,
            id
        ]
    );
}


async function deletarCarro(id) {
    await pool.query(
        `
        UPDATE carros
        SET ativo = 0
        WHERE id = ?
        `,
        [id]
    );
}


module.exports = {
    criarCarro,
    listarCarros,
    buscarCarroPorId,
    buscarCarroPorPlaca,
    atualizarCarro,
    deletarCarro
};