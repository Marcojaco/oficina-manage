const tbody = document.querySelector("#clientes-tbody");
const busca = document.querySelector("#busca");
let clientes = [];

function normalizarLista(data) {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.dados) ? data.dados : [];
}

function renderClientes(lista) {
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhum cliente encontrado.</td></tr>';
    return;
  }
  tbody.innerHTML = lista.map(cliente => `
    <tr>
      <td>${escapeHtml(cliente.nome)}</td>
      <td>${formatTelefone(cliente.telefone)}</td>
      <td>${escapeHtml(cliente.cidade || "")}</td>
      <td>${escapeHtml(cliente.estado || "")}</td>
      <td class="actions">
        <a class="action-link" href="cliente-form.html?id=${encodeURIComponent(cliente.id)}">Editar</a>
        <button class="action-link btn-excluir" data-id="${encodeURIComponent(cliente.id)}">Excluir</button>
      </td>
    </tr>`).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function formatTelefone(value) {
  const v = String(value ?? "").replace(/\D/g,"");
  if (v.length === 11) return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  if (v.length === 10) return `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
  return value || "";
}
function filtrar() {
  const termo = busca.value.toLowerCase().trim();
  renderClientes(clientes.filter(c =>
    [c.nome,c.telefone,c.cidade,c.estado].some(v => String(v ?? "").toLowerCase().includes(termo))
  ));
}
busca.addEventListener("input", filtrar);

async function carregarClientes() {
  try {
    const data = await apiRequest("/clientes");
    clientes = normalizarLista(data);
    renderClientes(clientes);
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty">${escapeHtml(error.message)}</td></tr>`;
  }
}
carregarClientes();

tbody.addEventListener("click", async (event) => {
  const botao = event.target.closest(".btn-excluir");
  if (!botao) return;

  const id = botao.dataset.id;
  const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
  if (!confirmar) return;

  botao.disabled = true;
  botao.textContent = "Excluindo...";

  try {
    await apiRequest(`/clientes/${id}`, { method: "DELETE" });
    await carregarClientes();
  } catch (error) {
    alert(error.message);
    botao.disabled = false;
    botao.textContent = "Excluir";
  }
});