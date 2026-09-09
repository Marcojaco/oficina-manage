const form = document.querySelector("#form-veiculo");
const params = new URLSearchParams(location.search);
const veiculoId = params.get("id");
const clientePreSelecionado = params.get("cliente_id");

const $ = id => document.querySelector(id);
const clienteSelect = $("#cliente-veiculo");
const placa = $("#placa-veiculo"), marca = $("#marca-veiculo"), modelo = $("#modelo-veiculo");
const ano = $("#ano-veiculo"), km = $("#km-veiculo"), chassi = $("#chassi-veiculo");
const renavam = $("#renavam-veiculo"), obs = $("#obs-veiculo");
const mensagem = $("#mensagem"), btn = $("#btn-salvar");

function msg(text, type) { mensagem.textContent = text; mensagem.className = `mensagem ${type}`; }

function normalizarLista(data) {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.dados) ? data.dados : [];
}

placa.addEventListener("input", () => {
  placa.value = placa.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
});

async function carregarClientes() {
  try {
    const data = await apiRequest("/clientes");
    const clientes = normalizarLista(data);

    if (!clientes.length) {
      clienteSelect.innerHTML = '<option value="">Nenhum cliente cadastrado</option>';
      return;
    }

    clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>' +
      clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join("");

    if (clientePreSelecionado) {
      clienteSelect.value = clientePreSelecionado;
    }
  } catch (e) {
    clienteSelect.innerHTML = '<option value="">Erro ao carregar clientes</option>';
    msg(e.message, "erro");
  }
}

async function carregarVeiculo() {
  if (!veiculoId) return;
  $("#titulo-form").textContent = "Editar veículo";
  btn.textContent = "SALVAR ALTERAÇÕES";

  try {
    const data = await apiRequest(`/carros/${encodeURIComponent(veiculoId)}`);
    const v = data?.dados || data;

    clienteSelect.value = v.cliente_id;
    placa.value = v.placa || "";
    marca.value = v.marca || "";
    modelo.value = v.modelo || "";
    ano.value = v.ano || "";
    km.value = v.km ?? "";
    chassi.value = v.chassi || "";
    renavam.value = v.renavam || "";
    obs.value = v.observacoes || "";
  } catch (e) {
    msg(e.message, "erro");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mensagem.className = "mensagem";

  if (!clienteSelect.value) {
    return msg("Selecione um cliente.", "erro");
  }

  const payload = {
    cliente_id: Number(clienteSelect.value),
    placa: placa.value.trim(),
    marca: marca.value.trim(),
    modelo: modelo.value.trim(),
    ano: Number(ano.value),
    km: km.value.trim() || null,
    chassi: chassi.value.trim() || null,
    renavam: renavam.value.trim() || null,
    observacoes: obs.value.trim() || null
  };

  btn.disabled = true;
  btn.textContent = veiculoId ? "SALVANDO..." : "CADASTRANDO...";

  try {
    await apiRequest(
      veiculoId ? `/carros/${encodeURIComponent(veiculoId)}` : "/carros",
      { method: veiculoId ? "PUT" : "POST", body: JSON.stringify(payload) }
    );

    msg(veiculoId ? "Veículo atualizado com sucesso!" : "Veículo cadastrado com sucesso!", "sucesso");

    if (!veiculoId) {
      form.reset();
    }
  } catch (e) {
    msg(e.message, "erro");
  } finally {
    btn.disabled = false;
    btn.textContent = veiculoId ? "SALVAR ALTERAÇÕES" : "CADASTRAR";
  }
});

carregarClientes().then(carregarVeiculo);