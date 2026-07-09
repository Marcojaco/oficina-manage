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


module.exports = {
    criarCliente
}