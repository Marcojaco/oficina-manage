const carroService = require("../services/carroService");


async function criarCarro(req, res) {
    const dadosCarro = req.body;

    const resultado = await carroService.criarCarro(dadosCarro);

    return res.status(201).json({
        mensagem: "Carro criado com sucesso.",
        dados: resultado
    });
}


async function listarCarros(req, res) {

    const clienteId = req.query.cliente_id;

    const resultado = await carroService.listarCarros(clienteId);

    return res.status(200).json({
        dados: resultado
    });
}


async function buscarCarroPorId(req, res) {

    const id = Number(req.params.id);

    const resultado = await carroService.buscarCarroPorId(id);

    return res.status(200).json({
        dados: resultado
    });
}


async function atualizarCarro(req, res) {

    const id = Number(req.params.id);
    const novosDados = req.body;

    const resultado = await carroService.atualizarCarro(id, novosDados);

    return res.status(200).json({
        mensagem: resultado.mensagem,
        dados: resultado.carro
    });
}


async function deletarCarro(req, res) {

    const id = Number(req.params.id);

    const resultado = await carroService.deletarCarro(id);

    return res.status(200).json({
        mensagem: resultado.mensagem
    });
}


module.exports = {
    criarCarro,
    listarCarros,
    buscarCarroPorId,
    atualizarCarro,
    deletarCarro
};