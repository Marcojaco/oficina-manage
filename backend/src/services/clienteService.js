const clienteModel = require("../models/clienteModel");
const { validarCliente } = require("../utils/clienteValidator");

async function criarCliente(dadosCliente) {
    const dadosValidados = await validarCliente(dadosCliente);
    const resultado = await clienteModel.criarCliente(dadosValidados);
    return resultado;
};

async function listarCliente() {
    return clienteModel.listarCliente();
};

async function buscarClientePorId(id) {
    const resultado = await clienteModel.buscarClientePorId(id);
    return resultado
};


module.exports = {
    criarCliente,
    listarCliente,
    buscarClientePorId
};