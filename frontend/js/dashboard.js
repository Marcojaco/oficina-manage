async function carregarResumo() {
  const total = document.querySelector("#total-clientes");
  if (!total) return;
  try {
    const data = await apiRequest("/clientes");
    const clientes = Array.isArray(data) ? data : (data?.dados || []);
    total.textContent = clientes.length;
  } catch (error) {
    total.textContent = "—";
    console.error(error);
  }
}
carregarResumo();

const btnLogout = document.querySelector("#btn-logout");

if (btnLogout) {

    btnLogout.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        window.location.href = "../index.html";

    });

}