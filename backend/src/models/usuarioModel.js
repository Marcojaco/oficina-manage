const pool = require("../config/database");

async function buscarUsuarioPorEmail(email) {
    const [linhas] = await pool.query(
        `
        SELECT
            id,
            nome,
            email,
            senha_hash,
            role,
            ativo,
            created_at
        FROM usuarios
        WHERE email = ?
        `,
        [email]
    );

    return linhas[0] || null;
}

async function buscarUsuarioPorId(id) {
    const [linhas] = await pool.query(
        `
        SELECT
            id,
            nome,
            email,
            role,
            ativo,
            created_at
        FROM usuarios
        WHERE id = ?
        `,
        [id]
    );

    return linhas[0] || null;
}

async function criarUsuario(dadosUsuario) {
    const {
        nome,
        email,
        senhaHash,
        role
    } = dadosUsuario;

    const [resultado] = await pool.query(
        `
        INSERT INTO usuarios (
            nome,
            email,
            senha_hash,
            role
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            nome,
            email,
            senhaHash,
            role
        ]
    );

    return {
        id: resultado.insertId
    };
}

async function listarUsuarios() {
    const [linhas] = await pool.query(
        `
        SELECT
            id,
            nome,
            email,
            role,
            ativo,
            created_at
        FROM usuarios
        ORDER BY id DESC
        `
    );

    return linhas;
}

module.exports = {
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    criarUsuario,
    listarUsuarios
};