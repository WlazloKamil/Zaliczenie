'use strict';
module.exports = (sequelize, DataTypes) => {
  const dane = sequelize.define('dane', {
    modelkomp: DataTypes.STRING,
    modelproc: DataTypes.STRING,
    speedavg: DataTypes.INTEGER,
    memtotal: DataTypes.INTEGER,
    memfree: DataTypes.INTEGER,
    memused: DataTypes.INTEGER,
    battery: DataTypes.INTEGER,
    disk1: DataTypes.INTEGER,
    disk2: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  dane.associate = function(models) {
    dane.belongsTo(models.uzytko,{
      foreignKey: 'userid', 

    
    });
  //dane.hasMany(models.uzytko, {as: 'rekordy'})
  };
  return dane;
};