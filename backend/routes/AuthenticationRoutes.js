const router = require("express").Router();

const authenticationController = require("../controller/AuthenticationController.js");

router.post("/signUp", authenticationController.signUp);
router.post("/login", authenticationController.logIn);

module.exports = router;
