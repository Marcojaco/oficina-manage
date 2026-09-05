const AppError =
    require("../errors/AppError");


function roleMiddleware(...rolesPermitidas) {

    return function (req, res, next) {

        if (!req.usuario) {
            throw new AppError(
                "Usuário não autenticado.",
                401
            );
        }

        if (
            !rolesPermitidas.includes(
                req.usuario.role
            )
        ) {
            throw new AppError(
                "Você não tem permissão para realizar esta ação.",
                403
            );
        }

        next();
    };
}


module.exports = roleMiddleware;