const express = require("express");
const routes = require("./routes/clienteRoutes");
const db = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json())

app.use(routes);


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});