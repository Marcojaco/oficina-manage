const carroModel = require("../models/carroModel");
const clienteModel = require("../models/clienteModel");
const AppError = require("../errors/AppError");
const { validarCarro } = require("../utils/carroValidator");


/* FUNÇÕES AUXILIARES */

async function buscarCarroOuFalhar(id) {
    const carro = await carroModel.buscarCarroPorId(id);

    if (!carro) {
        throw new AppError("Carro não encontrado", 404);
    }

    return carro;
}


async function verificarClienteExiste(clienteId) {
    const cliente = await clienteModel.buscarClientePorId(clienteId);

    if (!cliente) {
        throw new AppError("Cliente informado não existe.", 404);
    }
}


async function verificarPlacaDuplicada(placa, idParaIgnorar = null) {
    const carroExistente = await carroModel.buscarCarroPorPlaca(placa);

    if (carroExistente && carroExistente.id !== idParaIgnorar) {
        throw new AppError("Já existe um carro cadastrado com essa placa.", 409);
    }
}


/* FUNÇÕES PRINCIPAIS */

async function criarCarro(dadosCarro) {

    const dadosValidados = validarCarro(dadosCarro);

    await verificarClienteExiste(dadosValidados.cliente_id);

    await verificarPlacaDuplicada(dadosValidados.placa);

    const resultado = await carroModel.criarCarro(dadosValidados);

    const carroCriado = await carroModel.buscarCarroPorId(resultado.id);

    return {
        carro: carroCriado
    };
}


async function listarCarros(clienteId) {

    if (clienteId !== undefined) {
        clienteId = Number(clienteId);

        if (!Number.isInteger(clienteId) || clienteId <= 0) {
            throw new AppError("ID de cliente inválido", 400);
        }
    }

    return carroModel.listarCarros(clienteId);
}


async function buscarCarroPorId(id) {

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }

    return buscarCarroOuFalhar(id);
}


async function atualizarCarro(id, novosDados) {

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }

    await buscarCarroOuFalhar(id);

    const dadosValidados = validarCarro(novosDados);

    await verificarClienteExiste(dadosValidados.cliente_id);

    await verificarPlacaDuplicada(dadosValidados.placa, id);

    await carroModel.atualizarCarro(id, dadosValidados);

    const carroAtualizado = await carroModel.buscarCarroPorId(id);

    return {
        mensagem: "Carro atualizado com sucesso.",
        carro: carroAtualizado
    };
}


async function deletarCarro(id) {

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }

    await buscarCarroOuFalhar(id);

    await carroModel.deletarCarro(id);

    return {
        mensagem: "Carro removido com sucesso."
    };
}


module.exports = {
    criarCarro,
    listarCarros,
    buscarCarroPorId,
    atualizarCarro,
    deletarCarro
};