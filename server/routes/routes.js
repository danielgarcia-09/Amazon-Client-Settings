const express = require("express");
const {
  authController,
  orderController,
  paymentController,
} = require("../controllers/index");
const authenticate = require("../middlewares/auth");
const router = express.Router();

//* Auth endpoints
router.get("/auth/:id",authenticate, authController.getUserById);
router.get("/auth",authenticate, authController.authUser);
router.post("/user", authController.createUser);
router.post("/auth", authController.login);
router.put("/auth/:id", authenticate, authController.editUser);
router.delete('/auth/:id', authenticate, authController.deleteUser);

//? Order endpoints
router.get("/orders/:id", authenticate, orderController.getOrders);
router.get("/order/:id", authenticate, orderController.getOrderById);
router.post("/orders/:id", authenticate, orderController.createOrder);
router.delete("/orders/:id", authenticate, orderController.deleteOrder);

//! Payment endpoints
router.post("/payments", authenticate, paymentController.createPayment);
router.get("/payments/:id", authenticate, paymentController.getPaymentsByUserId);
router.get("/payment/:id", authenticate, paymentController.getPaymentById);
router.delete("/payment/:id", authenticate, paymentController.deletePayment);

module.exports = router;
