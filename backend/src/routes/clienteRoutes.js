const express = require("express");
const clienteController = require("../controllers/clienteController");


const router = express.Router();

router.post("/clientes", clienteController.criarCliente);

module.exports = router;