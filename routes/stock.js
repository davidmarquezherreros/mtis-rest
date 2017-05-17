var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET nodes listing. */
router.get('/', function(req, res, next) {
  models.Stock.findAll().then(function(stock) {
    var resultado = {"tam": stock.length, "stock":stock}
		res.status(200).send(resultado).end();
	});
});
/* GET ID*/
router.get('/:id', function(req, res, next) {
  if(isNaN(req.params.id)){
  req.status(400).send('Bad request').end();
}
else{
  models.Stock.findById(req.params.id).then(function(stock){
    if(stock){
      res.status(200).send(stock).end();
    }
    else{
      res.status(404).send('Resource not found').end();
    }
  });
}
});

/* POST */
router.post('/:id/actualizar', function(pet, resp, next) {
  var nuevo = pet.body;
  if(isNaN(nuevo.cantidad)==false && isNaN(pet.params.id)==false){ // Mirar todos los campos
    if(nuevo.cantidad instanceof String) nuevo.cantidad = parseInt(nuevo.cantidad);
    var negative = false;
    if(nuevo.cantidad < 0){
      negative = true;
    }
    models.Stock.findById(pet.params.id).then(function(stock){
      if(stock){
        if(negative ==true){
          var auxcantidad = parseInt(nuevo.cantidad) + parseInt(stock.cantidad);
          if(auxcantidad >= 0){
            models.Stock.update(
              {
                cantidad: auxcantidad
              },
              {
                where: {id:pet.params.id}
              }).then(function(stock){
                resp.header('Location','http://localhost:3000/stock/'+stock.id);
                resp.status(204).send(stock).end();
              });
          }
          else{
            resp.status(304).send("No tenemos suficiente stock").end();
          }
        }else{
          models.Stock.update(
            {
              cantidad: stock.cantidad + nuevo.cantidad
            },
            {
              where: {id:pet.params.id}
            }).then(function(stock){
              resp.header('Location','http://localhost:3000/stock/'+stock.id);
              resp.status(204).send(stock).end();
            });
        }
      }
      else{
          resp.status(404).send("Resource not found").end();
      }
    });
  }
  else{
    resp.status(400).send('Bad request').end();
  }
});
/* POST */
router.post('/:id/reservar', function(pet, resp, next) {
  var nuevo = pet.body;
  if(isNaN(nuevo.cantidad)==false && isNaN(pet.params.id)==false){ // Mirar todos los campos
    models.Stock.findById(pet.params.id).then(function(stock){
      if(stock){
          if(stock.cantidad >= stock.cantidad){
            models.Stock.update(
              {
                cantidad: stock.cantidad - nuevo.cantidad,
                reservada: stock.reservada + nuevo.cantidad
              },
              {
                where: {id:pet.params.id}
              }).then(function(stock){
                resp.header('Location','http://localhost:3000/stock/'+stock.id);
                resp.status(204).send(stock).end();
              });
        }
        else{
          resp.status(304).send("Not enough stockage").end();
        }
      }
      else{
          resp.status(404).send("Resource not found").end();
      }
    });
  }
  else{
    resp.status(400).send('Bad request').end();
  }
});


module.exports = router;
