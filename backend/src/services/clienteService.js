const clienteModel = require("../models/clienteModel");

async function criarCliente(dadosCliente) {
    const { nome, telefone, endereco } = dadosCliente;
    
    const regexNomeSimbolos = /[@#!$%^&*()_+\-=\[\]{};:"\\|,.<>\/?1234567890]/;
    const regexTelefoneSimbolos = /[@#!$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/;
    
    // validação do nome
    if (!nome) {
        throw new Error("O nome é obrigatório.");
    }
    if (nome.length < 3 || nome.length > 150) {
        throw new Error("número de caracteres do nome ínvalido")
    }
    if (regexNomeSimbolos.test(nome)) {
        throw new Error("Erro: Símbolos especiais no nome não são permitidos.");
    }
    
    // validação do telefone
    if (!telefone) {
        throw new Error("O telefone é obrigatório.");
    }
    if (telefone.length < 12 || telefone.length > 12) {
        throw new Error("o número de caracteres do telefone é invalido")
    }
    if (regexTelefoneSimbolos.test(telefone)) {
        throw new Error("Erro: Símbolos especiais no telefone não são permitidos.");
    }

    const resultado = await clienteModel.criarCliente(dadosCliente);  
    return resultado
    
};


module.exports = {
    criarCliente
};