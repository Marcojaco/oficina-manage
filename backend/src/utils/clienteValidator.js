async function validarCliente(dadosCliente) {

    let {
        nome,
        telefone,
        endereco,
        cidade,
        estado,
        cep
    } = dadosCliente;

    telefone = telefone?.replace(/\D/g, "");
    cep = cep?.replace(/\D/g, "");
    estado = estado?.trim().toUpperCase();

    const regexNomeSimbolos = /[@#!$%^&*()_+\-=\[\]{};:"\\|,.<>\/?1234567890]/;
    const regexTelefoneSimbolos = /[@#!$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/;
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


    return {
        nome: nome.trim(),
        telefone,
        endereco: endereco.trim(),
        cidade: cidade.trim(),
        estado,
        cep
    };
}

module.exports = {
    validarCliente
};