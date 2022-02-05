const asyncHandler = require("express-async-handler");
const db = require("../models");

// authentication
const authenticate = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await db.user.findOne({ where: { userName } });

    if (user && (await user.matchPassword(password, user.password))) {
      res.json({
        message: "Login successful.",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
          address: user.address,
          postCode: user.postCode,
          contactNumber: user.phoneNumber,
        },
      });
    } else {
      res.status(401).send("Invalid Username or Password");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

// create
const create = asyncHandler(async (req, res) => {
  const { body } = req;

  const userExist = await db.user.findOne({ where: { email: req.body.email } });
  if (userExist) res.status(400).send("User Already Exists");

  try {
    const user = await db.user.create(body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
const update = asyncHandler(async (req, res) => {
  const { body } = req;

  const data = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    userName: body.userName,
    address: body.address,
    postCode: body.postCode,
    contactNumber: body.contactNumber,
  };

  try {
    await db.user.update(data, {
      where: { id: body.id },
    });

    return res.status(200).json({ ...data, id: body.id });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// fetch
const fetch = asyncHandler(async (req, res) => {
  try {
    const users = await db.user.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    if (users) {
      res.json(users);
    } else {
      res.status(404).send("No user were found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

// delete
const destroy = asyncHandler(async (req, res) => {
  try {
    await db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("User successfully deleted.");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// delete multiple
const destroyMultiple = asyncHandler(async (req, res) => {
  const { userIds } = req.body;

  try {
    if (userIds.length) {
      await db.user.destroy({
        where: {
          id: userIds,
        },
      });
      res.send("Users successfully deleted.");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = {
  authenticate,
  create,
  update,
  fetch,
  destroy,
  destroyMultiple,
};
