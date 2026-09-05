function errorHandler(err, req, res, next) {

    const status = err.statusCode || 500;
    const mensagem = err.message || "Erro interno do servidor";

    return res.status(status).json({
        erro: mensagem
    });

}

module.exports = errorHandler;