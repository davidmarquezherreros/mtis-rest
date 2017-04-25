"use strict";

module.exports = function(sequelize, DataTypes) {
  var Orden = sequelize.define("Orden", {
    nombre: DataTypes.STRING,
    modelo: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    name: {singular: 'Orden', plural: 'Ordenes'},
  });
  return Orden;
};
