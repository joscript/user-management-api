"use strict";

const data = require("../seedersData/usersData.json");

const users = data.map((d, index) => {
  return {
    ...d,
    id: index + 1,
    password: "$2a$10$7rKdFTkdIFdEnkFAoFNZ9ecU9GRs8tBAsqrYTJK8Z7FcVbTML0VCG", // decrypted value = password
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
