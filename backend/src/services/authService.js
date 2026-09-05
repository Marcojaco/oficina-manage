const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioModel =
    require("../models/usuarioModel");

const AppError =
    require("../errors/AppError");

const {
    validarLogin
} = require("../utils/usuarioValidator");


async function login(dadosLogin) {

    const dadosValidados =
        validarLogin(dadosLogin);

    const usuario =
        await usuarioModel.buscarUsuarioPorEmail(
            dadosValidados.email
        );

    if (!usuario) {
        throw new AppError(
            "Email ou senha inválidos.",
            401
        );
    }

    if (!usuario.ativo) {
        throw new AppError(
            "Usuário desativado.",
            403
        );
    }

    const senhaCorreta =
        await bcrypt.compare(
            dadosValidados.senha,
            usuario.senha_hash
        );

    if (!senhaCorreta) {
        throw new AppError(
            "Email ou senha inválidos.",
            401
        );
    }

    const token = jwt.sign(
        {
            sub: usuario.id,
            role: usuario.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        }
    };
}


module.exports = {
    login
};