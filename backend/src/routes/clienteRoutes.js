const express = require("express");
const clienteController = require("../controllers/clienteController");


const router = express.Router();

router.post("/clientes", clienteController.criarCliente);
router.get("/clientes", clienteController.listarCliente);
router.get("/clientes/:id", clienteController.buscarClientePorId);

module.exports = router;