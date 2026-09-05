const usuarioService = require("../services/usuarioService");


async function criarUsuario(req, res) {

    const resultado =
        await usuarioService.criarUsuario(req.body);

    return res.status(201).json({
        mensagem: "Usuário criado com sucesso.",
        dados: resultado
    });
}


async function listarUsuarios(req, res) {

    const resultado =
        await usuarioService.listarUsuarios();

    return res.status(200).json({
        dados: resultado
    });
}


async function buscarUsuarioPorId(req, res) {

    const id = Number(req.params.id);

    const resultado =
        await usuarioService.buscarUsuarioPorId(id);

    return res.status(200).json({
        dados: resultado
    });
}


module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorId
};