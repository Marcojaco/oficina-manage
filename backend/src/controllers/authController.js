const authService =
    require("../services/authService");


async function login(req, res) {

    const resultado =
        await authService.login(req.body);

    return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        dados: resultado
    });
}


module.exports = {
    login
};