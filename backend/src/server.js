require("dotenv").config({
    path: "../.env"
});

const express = require("express");
const cors = require("cors");

const clienteRoutes =
    require("./routes/clienteRoutes");

const usuarioRoutes =
    require("./routes/usuarioRoutes");

const authRoutes =
    require("./routes/authRoutes");

const carroRoutes =
    require("./routes/carroRoutes");

const errorHandler =
    require("./middlewares/errorHandler");


const app = express();


app.use(express.json());

app.use(cors());


app.use(authRoutes);
app.use(usuarioRoutes);
app.use(clienteRoutes);


app.use(errorHandler);


app.listen(process.env.PORT, () => {

    console.log(
        `Servidor rodando na porta ${process.env.PORT}`
    );

});