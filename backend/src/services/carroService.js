const express = require("express");

const carroController = require("../controllers/carroController");
const asyncHandler = require("../middlewares/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/carros",
    authMiddleware,
    asyncHandler(carroController.criarCarro)
);

router.get(
    "/carros",
    authMiddleware,
    asyncHandler(carroController.listarCarros)
);

router.get(
    "/carros/:id",
    authMiddleware,
    asyncHandler(carroController.buscarCarroPorId)
);

router.put(
    "/carros/:id",
    authMiddleware,
    asyncHandler(carroController.atualizarCarro)
);

module.exports = router;