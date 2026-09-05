const clienteModel = require("../models/clienteModel");
const AppError = require("../errors/AppError");
const { validarCliente } = require("../utils/clienteValidator");


/* FUNÇÕES AUXILIADORAS */
async function buscarClienteOuFalhar(id) {

    const cliente = await clienteModel.buscarClientePorId(id);

    if (!cliente) {
        throw new AppError("Cliente não encontrado", 404);
    }

    return cliente;
}

/* FUNÇÕES PRINCIPAIS */

async function criarCliente(dadosCliente) {
    const dadosValidados = await validarCliente(dadosCliente);
    
    const resultado = await clienteModel.criarCliente(dadosValidados);
    
    const clienteCriado = await clienteModel.buscarClientePorId(resultado.id);
    
    return {
        cliente: clienteCriado
    };
};

async function listarClientes() {
    return clienteModel.listarClientes();
};

async function buscarClientePorId(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }
    
    const resultado = await clienteModel.buscarClientePorId(id);
    
    if (!resultado) {
        throw new AppError("Cliente não encontrado", 404);
    }
    
    return resultado;
};


async function atualizarCliente(id, novosDados) {
        
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }
        
    await buscarClienteOuFalhar(id);

    const dadosValidados = await validarCliente(novosDados);

    await clienteModel.atualizarCliente(id, dadosValidados);

    const clienteAtualizado = await clienteModel.buscarClientePorId(id);

    return {
        mensagem: "Cliente atualizado com sucesso.",
        cliente: clienteAtualizado
    };
}

module.exports = {
    criarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente
};