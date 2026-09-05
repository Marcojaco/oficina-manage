const clienteService = require("../services/clienteService");


async function criarCliente(req, res) {
    const dadosCliente = req.body;

    const resultado = await clienteService.criarCliente(dadosCliente);

    return res.status(201).json({
        mensagem: "cliente criado com sucesso",
        dados: resultado
    });
}

async function listarClientes(req, res) {
        
    const resultado = await clienteService.listarClientes();

    return res.status(200).json({
        dados: resultado
    });
};

async function buscarClientePorId(req, res) {

    const id = Number(req.params.id);

    const resultado = await clienteService.buscarClientePorId(id);

    return res.status(200).json({
        dados: resultado
    });
};

async function atualizarCliente(req, res) {

    const id = Number(req.params.id);

    const novosDados = req.body;

    const resultado = await clienteService.atualizarCliente(id, novosDados);

    return res.status(200).json({
        mensagem: "cliente atualizado com sucesso",
        dados: resultado
    });
}

module.exports = {
    criarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente
}