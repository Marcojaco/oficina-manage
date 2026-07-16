function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(cpf[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === Number(cpf[10]);
}

async function validarCliente(dadosCliente) {

    let {
        nome,
        cpf,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep
    } = dadosCliente;

    cpf = cpf?.replace(/\D/g, "");
    telefone = telefone?.replace(/\D/g, "");
    cep = cep?.replace(/\D/g, "");
    estado = estado?.trim().toUpperCase();

    const regexNomeSimbolos = /[@#!$%^&*()_+\-=\[\]{};:"\\|,.<>\/?1234567890]/;
    const regexTelefoneSimbolos = /[@#!$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexEstado = /^[A-Z]{2}$/;
    const regexCidade = /[@#!$%^&*()_+\=\[\]{};:"\\|<>\/?1234567890]/;

    // Nome
    nome = nome?.trim();
    if (!nome) {
        throw new Error("O nome é obrigatório.");
    }

    if (nome.length < 3 || nome.length > 150) {
        throw new Error("Número de caracteres do nome inválido.");
    }

    if (regexNomeSimbolos.test(nome)) {
        throw new Error("Símbolos especiais no nome não são permitidos.");
    }

    // CPF
    if (!cpf) {
        throw new Error("O CPF é obrigatório.");
    }

    if (!validarCPF(cpf)) {
        throw new Error("CPF inválido.");
    }

    // Telefone
    if (!telefone) {
        throw new Error("O telefone é obrigatório.");
    }

    if (telefone.length < 10 || telefone.length > 13) {
        throw new Error("Número de telefone inválido.");
    }

    if (regexTelefoneSimbolos.test(telefone)) {
        throw new Error("Símbolos especiais no telefone não são permitidos.");
    }

    // Email
    if (!email) {
        throw new Error("O email é obrigatório.");
    }

    if (email.length > 150) {
        throw new Error("O email é muito longo.");
    }

    if (!regexEmail.test(email)) {
        throw new Error("Email inválido.");
    }

    // Endereço
    if (!endereco) {
        throw new Error("O endereço é obrigatório.");
    }

    if (endereco.length < 5 || endereco.length > 200) {
        throw new Error("Número de caracteres do endereço inválido.");
    }

    // Cidade
    if (!cidade) {
        throw new Error("A cidade é obrigatória.");
    }

    if (cidade.length < 2 || cidade.length > 100) {
        throw new Error("Número de caracteres da cidade inválido.");
    }

    if (regexCidade.test(cidade)) {
        throw new Error("Cidade inválida.");
    }

    // Estado
    if (!estado) {
        throw new Error("O estado é obrigatório.");
    }

    if (!regexEstado.test(estado)) {
        throw new Error("Estado inválido. Utilize a sigla com 2 letras.");
    }

    // CEP
    if (!cep) {
        throw new Error("O CEP é obrigatório.");
    }

    if (cep.length !== 8) {
        throw new Error("CEP inválido.");
    }

    return {
        nome: nome.trim(),
        cpf,
        telefone,
        email: email.trim().toLowerCase(),
        endereco: endereco.trim(),
        cidade: cidade.trim(),
        estado,
        cep
    };
}

module.exports = {
    validarCliente
};