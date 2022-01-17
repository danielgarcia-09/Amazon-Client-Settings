const formatError = require("../helpers/formatError");;
const db = require("../db/db");

let paymentController = {};

paymentController.createPayment = (req, res) => {
  const { payment_method } = req.body;

  try {
    const query = db
      .prepare(
        `INSERT INTO paymentMethods
        (user_id, company, card_number, valid_until, cvv)
        values (@user_id, @company, @card_number, @valid_until, @cvv)
    `).run(payment_method);

    if (query.changes === 0)
      return res.status(400).json({
        error: {
          message: "Check your data format",
        },
      });

    return res.status(201).json(query);

  } catch (error) {
    return res.status(400).json({
      error: {
        message: formatError( error.message )
      },
    });
  }
};

paymentController.getPaymentById = (req, res) => {
  const { id } = req.params;

  const query = db
    .prepare(`SELECT * FROM paymentMethods WHERE id = ${id}`)
    .get();

  if (!query || query.length === 0)
    return res.status(404).json({
      error: {
        message: "Payment method not found",
      },
    });

  return res.status(200).json(query);
};

paymentController.getPaymentsByUserId = (req, res) => {
  const { id } = req.params;
  const { limit } = req.query;

  const query = (limit > 0)
    ? `SELECT * FROM paymentMethods WHERE user_id = ${id} LIMIT ${limit}`
    : `SELECT * FROM paymentMethods WHERE user_id = ${id}`;

  const payments = db.prepare(query).all();

  if (!payments || payments.length === 0)
    return res.status(404).json({
      error: {
        message: "Payments not found",
      },
    });

  return res.status(200).json({payments});
};

paymentController.editPayment = (req, res) => {
  const { id } = req.params;
  const { payment_method } = req.body;

  try {
    const query = db
      .prepare(
        `UPDATE paymentMethods SET
            user_id = @user_id, 
            company = @company, 
            card_number = @card_number, 
            valid_until = @valid_until, 
            cvv = @cvv
        WHERE id = ${id}`
      ).run(payment_method);

    if (query.changes === 0)
      return res.status(400).json({
        error: {
          message: "Check your data format",
        },
      });

    return res.status(201).json(query);

  } catch (error) {
    return res.status(400).json({
      error: {
        message: formatError( error.message ),
      },
    });
  }
};

paymentController.deletePayment = (req, res) => {
  const { id } = req.params;

  const query = db.prepare(`DELETE FROM paymentMethods WHERE id = ${id}`).run();

  if (query.changes === 0)
    return res.status(404).json({
      error: {
        message: "Payment method not found",
      },
    });

  return res.status(200).json(query);
};

module.exports = paymentController;
