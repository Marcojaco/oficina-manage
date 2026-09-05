const jwt = require("jsonwebtoken");

const AppError =
    require("../errors/AppError");


function authMiddleware(req, res, next) {

    const authorization =
        req.headers.authorization;

    if (!authorization) {
        throw new AppError(
            "Token de autenticação não informado.",
            401
        );
    }

    const partes =
        authorization.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {
        throw new AppError(
            "Formato do token inválido.",
            401
        );
    }

    const token = partes[1];

    try {

        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.usuario = payload;

        next();

    } catch (erro) {

        throw new AppError(
            "Token inválido ou expirado.",
            401
        );

    }
}


module.exports = authMiddleware;