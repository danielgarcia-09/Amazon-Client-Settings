const addressController = require("./address.controller");
const authController = require("./auth.controller");
const orderController = require("./order.controller");
const paymentController = require("./payment.controller");

module.exports = {
  orderController,
  paymentController,
  authController,
  addressController
};
