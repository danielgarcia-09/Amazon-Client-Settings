const express = require("express");
const {
  userController,
  orderController,
  paymentController,
} = require("../controllers/index");
const router = express.Router();

//* User endpoints
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.editUser);
router.delete('/user/:id', userController.deleteUser);

//? Order endpoints
router.get("/orders/:id", orderController.getOrders);
router.get("/order/:id", orderController.getOrderById);
router.post("/orders/:id", orderController.createOrder);
router.delete("/orders/:id", orderController.deleteOrder);

//! Payment endpoints
router.post("/payments", paymentController.createPayment);
router.get("/payments/:id", paymentController.getPaymentsByUserId);
router.get("/payment/:id", paymentController.getPaymentById);
router.delete("/payment/:id", paymentController.deletePayment);

module.exports = router;
