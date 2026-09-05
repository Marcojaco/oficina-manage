const express = require("express");

const clienteController = require("../controllers/clienteController");
const asyncHandler = require("../middlewares/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/clientes",
    authMiddleware,
    asyncHandler(clienteController.criarCliente)
);

router.get(
    "/clientes",
    authMiddleware,
    asyncHandler(clienteController.listarClientes)
);

router.get(
    "/clientes/:id",
    authMiddleware,
    asyncHandler(clienteController.buscarClientePorId)
);

router.put(
    "/clientes/:id",
    authMiddleware,
    asyncHandler(clienteController.atualizarCliente)
);

module.exports = router;