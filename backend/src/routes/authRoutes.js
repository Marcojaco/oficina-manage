const express = require("express");

const authController =
    require("../controllers/authController");

const asyncHandler =
    require("../middlewares/asyncHandler");


const router = express.Router();


router.post(
    "/auth/login",
    asyncHandler(authController.login)
);


module.exports = router;