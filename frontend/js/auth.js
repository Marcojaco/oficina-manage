function showAuthMessage(text, type) {
    const el = document.querySelector("#mensagem");

    if (!el) return;

    el.textContent = text;
    el.className = `mensagem ${type}`;
}


const loginForm = document.querySelector("#login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const button =
            document.querySelector("#btn-login");

        button.disabled = true;
        button.textContent = "ENTRANDO...";

        try {

            const data = await apiRequest(
                "/auth/login",
                {
                    method: "POST",

                    body: JSON.stringify({
                        email:
                            document
                                .querySelector("#email")
                                .value
                                .trim(),

                        senha:
                            document
                                .querySelector("#senha")
                                .value
                    })
                }
            );

            if (!data?.dados?.token) {
                throw new Error(
                    "Token não recebido pelo servidor."
                );
            }

            localStorage.setItem(
                "token",
                data.dados.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(data.dados.usuario)
            );

            window.location.href =
                "pages/dashboard.html";

        } catch (error) {

            showAuthMessage(
                error.message,
                "erro"
            );

        } finally {

            button.disabled = false;
            button.textContent = "ENTRAR";

        }
    });
}