const express = require("express");

const usuarioController =
    require("../controllers/usuarioController");

const asyncHandler =
    require("../middlewares/asyncHandler");

const authMiddleware =
    require("../middlewares/authMiddleware");

const roleMiddleware =
    require("../middlewares/roleMiddleware");


const router = express.Router();


router.post(
    "/usuarios",
    authMiddleware,
    roleMiddleware("ADMIN"),
    asyncHandler(usuarioController.criarUsuario)
);


router.get(
    "/usuarios",
    authMiddleware,
    roleMiddleware("ADMIN"),
    asyncHandler(usuarioController.listarUsuarios)
);


router.get(
    "/usuarios/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    asyncHandler(usuarioController.buscarUsuarioPorId)
);


module.exports = router;