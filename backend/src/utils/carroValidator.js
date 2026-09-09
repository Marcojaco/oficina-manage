function validarCarro(dadosCarro) {

    let {
        cliente_id,
        placa,
        marca,
        modelo,
        ano,
        km,
        chassi,
        renavam,
        observacoes
    } = dadosCarro;


    // cliente_id
    cliente_id = Number(cliente_id);

    if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
        throw new Error("Cliente inválido.");
    }


    // Placa
    placa = placa?.trim().toUpperCase().replace(/[\s-]/g, "");

    if (!placa) {
        throw new Error("A placa é obrigatória.");
    }

    const regexPlacaAntiga = /^[A-Z]{3}[0-9]{4}$/;
    const regexPlacaMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if (!regexPlacaAntiga.test(placa) && !regexPlacaMercosul.test(placa)) {
        throw new Error("Placa inválida. Use o formato ABC1234 ou ABC1D23.");
    }


    // Marca
    marca = marca?.trim();

    if (!marca) {
        throw new Error("A marca é obrigatória.");
    }

    if (marca.length < 2 || marca.length > 60) {
        throw new Error("Número de caracteres da marca inválido.");
    }


    // Modelo
    modelo = modelo?.trim();

    if (!modelo) {
        throw new Error("O modelo é obrigatório.");
    }

    if (modelo.length < 1 || modelo.length > 60) {
        throw new Error("Número de caracteres do modelo inválido.");
    }


    // Ano
    ano = Number(ano);
    const anoAtual = new Date().getFullYear();

    if (!Number.isInteger(ano) || ano < 1950 || ano > anoAtual + 1) {
        throw new Error("Ano inválido.");
    }


    // Km (opcional)
    if (km !== undefined && km !== null && km !== "") {
        km = Number(km);

        if (!Number.isInteger(km) || km < 0) {
            throw new Error("Quilometragem inválida.");
        }
    } else {
        km = null;
    }


    // Chassi (opcional)
    if (chassi) {
        chassi = chassi.trim().toUpperCase();

        if (chassi.length !== 17) {
            throw new Error("Chassi deve conter 17 caracteres.");
        }
    } else {
        chassi = null;
    }


    // Renavam (opcional)
    if (renavam) {
        renavam = renavam.replace(/\D/g, "");

        if (renavam.length !== 11) {
            throw new Error("Renavam deve conter 11 dígitos.");
        }
    } else {
        renavam = null;
    }


    // Observações (opcional)
    observacoes = observacoes?.trim() || null;

    if (observacoes && observacoes.length > 500) {
        throw new Error("Observações muito longas (máximo 500 caracteres).");
    }


    return {
        cliente_id,
        placa,
        marca,
        modelo,
        ano,
        km,
        chassi,
        renavam,
        observacoes
    };
}


module.exports = {
    validarCarro
};