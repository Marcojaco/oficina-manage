const btnLogout = document.querySelector("#btn-logout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    window.location.href = "../index.html";
  });
}