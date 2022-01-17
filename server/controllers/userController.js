const bcrypt = require("bcryptjs");
const formatError = require("../helpers/formatError");
const formatPwd = require("../helpers/formatPwd");
const db = require("../db/db");

let userController = {};

userController.getUserById = (req, res) => {
  const { id } = req.params;

  const user = db.prepare(`SELECT * FROM users WHERE id = ${id}`).get();

  if (!user)
    return res.status(404).json({
      error: {
        message: "User not found",
      },
    });

  return res.status(200).json({user});
};

userController.createUser = async (req, res) => {

  const { user } = req.body;

  user.password = await formatPwd( user.password );

  try {

    const newUser = db.prepare(
        `INSERT INTO users 
        (name,user_name,password,email,address,telephone)
        values (@name,@user_name,@password,@email,@address,@telephone)
    `).run(user);

    if (!newUser || newUser.changes === 0)
      return res.status(400).json({
        error: {
          message: "Check your data format",
        },
      });

    return res.status(201).json(newUser);

  } catch (error) {
    return res.status(400).json({
        error: {
          message: formatError(error.message)
        }
      });
  }
};

userController.editUser = async (req, res) => {

  const { id } = req.params;
  const { user } = req.body;

  try {
    const query = db.prepare(
      `UPDATE USERS SET 
            name = @name,
            user_name = @user_name, 
            password = @password,
            address = @address,
            telephone = @telephone
        WHERE id = ${id}`
    ).run(user);

    if (query.changes === 0) return res.status(400).json({
        error: {
            message: "BAD PETITION, check your data format",
        }
    });

    const updatedUser = db.prepare(`SELECT * FROM USERS WHERE id = ${id}`).get();
    return res.status(200).json({ user: updatedUser });

  } catch (error) {
      return res.status(400).json({
        error: {
          message: (error.message)
        }
      });
  }
};

userController.deleteUser = (req, res) => {
  const { id } = req.params;

  const query = db.prepare(`DELETE FROM USERS WHERE id = ${id}`);

  if (query.changes === 0)
  return res.status(404).json({
    error: {
      message: "User not found",
    },
  });

  return res.status(200).json(query);
}

module.exports = userController;
