function validarCriacaoUsuario(dadosUsuario) {
    let {
        nome,
        email,
        senha,
        role
    } = dadosUsuario;

    nome = nome?.trim();
    email = email?.trim().toLowerCase();
    role = role?.trim().toUpperCase();

    if (!nome) {
        throw new Error("O nome é obrigatório.");
    }

    if (nome.length < 3 || nome.length > 120) {
        throw new Error("Número de caracteres do nome inválido.");
    }

    if (!email) {
        throw new Error("O email é obrigatório.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        throw new Error("Email inválido.");
    }

    if (email.length > 120) {
        throw new Error("Email muito longo.");
    }

    if (!senha) {
        throw new Error("A senha é obrigatória.");
    }

    if (senha.length < 8 || senha.length > 72) {
        throw new Error("A senha deve ter entre 8 e 72 caracteres.");
    }

    if (!role) {
        role = "MECANICO";
    }

    if (!["ADMIN", "MECANICO"].includes(role)) {
        throw new Error("Tipo de usuário inválido.");
    }

    return {
        nome,
        email,
        senha,
        role
    };
}


function validarLogin(dadosLogin) {
    let {
        email,
        senha
    } = dadosLogin;

    email = email?.trim().toLowerCase();

    if (!email) {
        throw new Error("O email é obrigatório.");
    }

    if (!senha) {
        throw new Error("A senha é obrigatória.");
    }

    return {
        email,
        senha
    };
}


module.exports = {
    validarCriacaoUsuario,
    validarLogin
};