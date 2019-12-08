'use strict';
module.exports = (sequelize, DataTypes) => {
  const uzytko = sequelize.define('uzytko', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    nick: DataTypes.STRING
  }, {});
  uzytko.associate = function(models) {
  //  uzytko.hasMany(models.dane, {as: 'rekordy'})
 //  uzytko.belongsTo(models.dane, {foreignKey: 'user', as: 'user_id'})
 uzytko.hasMany(models.dane, {
  foreignKey: 'userid', 


});
  };
  return uzytko;
};