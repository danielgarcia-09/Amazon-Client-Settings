const db = require("../db/db");

let orderController = {};

orderController.createOrder = (req, res) => {
  const { id } = req.params;

  const { order } = req.body;

  const newOrder = db
    .prepare(
      `INSERT INTO orders 
        (user_id, name, price, rating, manufacturer, item_info, quantity)
        values (${id}, @name, @price, @rating, @manufacturer, @item_info, @quantity)
    `
    )
    .run(order);

  if (newOrder.changes === 0)
    return res.status(400).json({
      error: {
        message: "Check your data format",
      },
    });

  return res.status(200).json(newOrder);
};

orderController.getOrders = (req, res) => {
  const { id } = req.params;
  const { limit } = req.query;

  const query =
    limit > 0
      ? `SELECT * FROM orders WHERE user_id = ${id} LIMIT ${limit}`
      : `SELECT * FROM orders WHERE user_id = ${id}`;

  const orders = db.prepare(query).all();

  if (orders.length === 0)
    return res.status(404).json({
      error: {
        message: "No orders yet",
      },
    });

  return res.status(200).json({ orders });
};

orderController.getOrderById = (req, res) => {
  const { id } = req.params;

  const orders = db
    .prepare(`SELECT * FROM orders WHERE order_id = ${id}`)
    .get();

  if (!orders || orders.length === 0)
    return res.status(404).json({
      error: {
        message: "No order found",
      },
    });

  return res.status(200).json(orders);
};

orderController.editOrder = (req, res) => {
  const { id } = req.params;
  const { order } = req.body;

  const query = db
    .prepare(
      `UPDATE orders SET name = @name, price = @price, rating = @rating, manufacturer = @manufacturer, item_info = @item_info, quantity = @quantity, address_id = @address_id WHERE order_id = ${id}`
    )
    .run(order);

  if (query.changes === 0)
    return res.status(400).json({
      error: {
        message: "Check your data format",
      },
    });

  return res.status(200).json(query);
};

orderController.deleteOrder = (req, res) => {
  const { id } = req.params;

  const deleteOrder = db
    .prepare(`DELETE FROM orders WHERE order_id = ${id}`)
    .run();

  if (deleteOrder.changes === 0)
    return res.status(404).json({
      error: {
        message: "Order not found",
      },
    });

  return res.status(200).json(deleteOrder);
};

module.exports = orderController;
