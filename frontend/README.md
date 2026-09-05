# HQR Mecânica — Frontend

Frontend em HTML, CSS e JavaScript puro.

## Estrutura
- `index.html`: login
- `registro.html`: registro
- `pages/dashboard.html`: dashboard
- `pages/clientes.html`: listagem
- `pages/cliente-form.html`: cadastro/edição
- `pages/veiculos.html`, `ordens-servico.html`, `agenda.html`: telas preparadas
- `js/config.js`: URL do backend
- `js/api.js`: camada HTTP

## Backend esperado
A aplicação de clientes já usa:
- `GET /clientes`
- `GET /clientes/:id`
- `POST /clientes`
- `PUT /clientes/:id`

O login/registro usam provisoriamente:
- `POST /login`
- `POST /register`

Se seus endpoints de autenticação tiverem outros nomes, altere `js/auth.js`.

## Rodar
Não abra os HTML via `file://` se o navegador bloquear requisições. Sirva a pasta com um servidor local, por exemplo:

`npx serve .`

ou use a extensão Live Server do VS Code.

Altere `js/config.js` se o backend estiver em outra porta.
