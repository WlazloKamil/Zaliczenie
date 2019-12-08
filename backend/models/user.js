'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    nick: DataTypes.STRING
  }, {});
  Users.associate = function(models) {

  };
  return Users;
};