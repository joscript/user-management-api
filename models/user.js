const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      postCode: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterValidate: async function (user) {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.matchPassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  };

  return User;
};
