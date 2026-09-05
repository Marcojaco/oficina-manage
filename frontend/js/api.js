async function apiRequest(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${window.APP_CONFIG.API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch (_) {}

    if (!response.ok) {

        if (response.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            // Só redireciona se a página atual não for o login
            if (!window.location.pathname.endsWith("index.html")) {
                window.location.href = "../index.html";
            }
        }

        throw new Error(
            data?.erro ||
            data?.mensagem ||
            data?.message ||
            "Erro na requisição."
        );
    }

    return data;
}