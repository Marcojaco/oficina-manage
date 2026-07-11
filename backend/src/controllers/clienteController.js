const clienteService = require("../services/clienteService");


async function criarCliente(req, res) {
    try {
        const dadosCliente = req.body;
        const resultado = await clienteService.criarCliente(dadosCliente);
        res.status(201).json({
            mensagem: "controller funcionando",
            cliente: resultado
        });
    }catch (erro) {
        const status = erro.status || 500;
        return res.status(status).json({ erro: erro.message || 'Erro ao registrar cliente' });
    };
};

async function listarCliente(req, res) {
    try {
        const resultado = await clienteService.listarCliente();
        return res.status(200).json({
            mensagem: "controller funcionando",
            cliente: resultado
        });
    }catch (erro) {
        const status = erro.status || 500;
        return res.status(status).json({ erro: erro.message || 'Erro ao listar cliente'});
    };
};

async function buscarClientePorId(req, res) {
    try {
        const id = req.params.id;
        const resultado = await clienteService.buscarClientePorId(id);
        return res.status(200).json({
            cliente: resultado
        });
    } catch (erro) {
        const status = erro.status || 500;
        return res.status(status).json({ erro: erro.message || 'Erro ao buscar cliente por id'});
    }
    
}


module.exports = {
    criarCliente,
    listarCliente,
    buscarClientePorId
}