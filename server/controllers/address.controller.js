const db = require("../db/db");

let addressController = {};

addressController.getAddressByUserId = (req, res) => {
  const { id } = req.params;

  const adresses = db
    .prepare(`SELECT * FROM address WHERE user_id = ${id}`)
    .all();

  if (!adresses || adresses.length === 0)
    return res.status(404).json({
      error: {
        message: "Adresses not found",
      },
    });

  return res.status(200).json({ adresses });
};

addressController.createAddress = (req, res) => {
  const { address } = req.body;

  const newAddress = db
    .prepare(
      `INSERT INTO address (user_id, address1, address2, zip_code)
    VALUES (@user_id,@address1,@address2,@zip_code)`
    )
    .run(address);

  if (newAddress.changes === 0)
    return res.status(400).json({
      error: {
        message: "Check your data format",
      },
    });

  return res.status(200).json(newAddress);
};

addressController.editAddress = (req, res) => {
  const { id } = req.params;
  const { address } = req.body;

  const query = db
    .prepare(
      `UPDATE address SET user_id = @user_id, address1 = @address1, address2 = @address2, zip_code = @zip_code WHERE id = ${id})`
    )
    .run(address);

  if (query.changes === 0)
    return res.status(400).json({
      error: {
        message: "Check your data format",
      },
    });

  return res.status(200).json(query);
};

addressController.deleteAddress = (req, res) => {
  const { id } = req.params;

  const query = db.prepare(`DELETE FROM address WHERE id = ${id})`).run();

  if (query.changes === 0)
    return res.status(404).json({
      error: {
        message: "Address not found",
      },
    });

  return res.status(200).json(query);
};

module.exports = addressController;
