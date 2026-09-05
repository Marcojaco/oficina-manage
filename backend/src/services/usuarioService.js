const bcrypt = require("bcrypt");

const usuarioModel = require("../models/usuarioModel");
const AppError = require("../errors/AppError");
const {
    validarCriacaoUsuario
} = require("../utils/usuarioValidator");


async function criarUsuario(dadosUsuario) {

    const dadosValidados =
        validarCriacaoUsuario(dadosUsuario);

    const usuarioExistente =
        await usuarioModel.buscarUsuarioPorEmail(
            dadosValidados.email
        );

    if (usuarioExistente) {
        throw new AppError(
            "Este email já está cadastrado.",
            409
        );
    }

    const senhaHash =
        await bcrypt.hash(dadosValidados.senha, 12);

    const resultado =
        await usuarioModel.criarUsuario({
            nome: dadosValidados.nome,
            email: dadosValidados.email,
            senhaHash,
            role: dadosValidados.role
        });

    return usuarioModel.buscarUsuarioPorId(resultado.id);
}


async function buscarUsuarioPorEmail(email) {

    return usuarioModel.buscarUsuarioPorEmail(email);

}


async function buscarUsuarioPorId(id) {

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError(
            "ID inválido",
            400
        );
    }

    const usuario =
        await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        throw new AppError(
            "Usuário não encontrado",
            404
        );
    }

    return usuario;
}


async function listarUsuarios() {

    return usuarioModel.listarUsuarios();

}


module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    listarUsuarios
};