"use strict";

function users(sequelize, DataTypes) {
  return sequelize.define("users", {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  });
}

module.exports = users;