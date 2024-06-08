const router = require("express").Router();

const orderController = require("../controller/OrderController.js");
const userAuth = require("../middleware/auth.js");

router.get("/order", userAuth.authenticate, orderController.getOrder);
router.post("/order", userAuth.authenticate, orderController.createOrder);

module.exports = router;
