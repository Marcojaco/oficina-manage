const tbody = document.querySelector("#veiculos-tbody");
const busca = document.querySelector("#busca");
let veiculos = [];

function normalizarLista(data) {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.dados) ? data.dados : [];
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function renderVeiculos(lista) {
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhum veículo encontrado.</td></tr>';
    return;
  }
  tbody.innerHTML = lista.map(v => `
    <tr>
      <td>${escapeHtml(v.placa)}</td>
      <td>${escapeHtml(v.marca)} ${escapeHtml(v.modelo)}</td>
      <td>${escapeHtml(v.ano)}</td>
      <td>${escapeHtml(v.cliente_nome)}</td>
      <td class="actions">
        <a class="action-link" href="veiculo-form.html?id=${encodeURIComponent(v.id)}">Editar</a>
        <button class="action-link btn-excluir" data-id="${encodeURIComponent(v.id)}">Excluir</button>
      </td>
    </tr>`).join("");
}

function filtrar() {
  const termo = busca.value.toLowerCase().trim();
  renderVeiculos(veiculos.filter(v =>
    [v.placa, v.marca, v.modelo, v.cliente_nome].some(campo => String(campo ?? "").toLowerCase().includes(termo))
  ));
}
busca.addEventListener("input", filtrar);

async function carregarVeiculos() {
  try {
    const data = await apiRequest("/carros");
    veiculos = normalizarLista(data);
    renderVeiculos(veiculos);
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty">${escapeHtml(error.message)}</td></tr>`;
  }
}

tbody.addEventListener("click", async (event) => {
  const botao = event.target.closest(".btn-excluir");
  if (!botao) return;

  const confirmar = confirm("Tem certeza que deseja excluir este veículo?");
  if (!confirmar) return;

  botao.disabled = true;
  botao.textContent = "Excluindo...";

  try {
    await apiRequest(`/carros/${botao.dataset.id}`, { method: "DELETE" });
    await carregarVeiculos();
  } catch (error) {
    alert(error.message);
    botao.disabled = false;
    botao.textContent = "Excluir";
  }
});

carregarVeiculos();