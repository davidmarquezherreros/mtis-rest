"use strict";

module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    reservada: DataTypes.INTEGER
  }, {
    name: {singular: 'Stock', plural: 'Stocks'},
  });
  return Stock;
};
