const router = require("express").Router();

const orderController = require("../controller/OrderController.js");
const userAuth = require("../middleware/auth.js");

router.get("/order", userAuth.authenticate, orderController.getOrderBook);
router.post("/order", userAuth.authenticate, orderController.createOrder);
router.patch("/order", userAuth.authenticate, orderController.patchOrder);

module.exports = router;
