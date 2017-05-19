var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET ALL*/
router.get('/', function(req, res, next) {
  models.Orden.findAll().then(function(orden) {
    var resultado = {"tam": orden.length, "nodes":orden}
		res.status(200).send(resultado).end();
	});
});

/* GET ID*/
router.get('/:id', function(req, res, next) {
  if(isNaN(req.params.id)){
  req.status(400).send('Bad request').end();
}
else{
  models.Orden.findById(req.params.id).then(function(orden){
    if(orden){
      res.status(200).send(orden).end();
    }
    else{
      res.status(404).send('Resource not found').end();
    }
  });
}
});
/* POST */
router.post('/', function(pet, resp, next) {
  var nuevo = pet.body;
  var items = [];
  if(nuevo.nombre && nuevo.modelo && isNaN(nuevo.cantidad)==false && nuevo.estado){ // Mirar todos los campos
    models.Stock.findAll().then(function(stock) {

      var esta = false;
      for(i = 0; i < stock.length && esta==false; i++){
        if(stock[i].nombre == nuevo.modelo){
          esta = true;
          console.error(esta);
        }
        console.error(esta);
      }
      if(esta==true){
        models.Orden.create({
          nombre: nuevo.nombre,
          modelo: nuevo.modelo,
          cantidad: nuevo.cantidad,
          estado: nuevo.estado
        }).then(function(orden){
          resp.header('Location','http://localhost:3000/ordenproduccion/'+orden.id);
          resp.status(201).send(orden).end();
        })
      }
      else{
        resp.status(200).send('No existe ese modelo').end();
      }
    });
  }
  else{
    resp.status(400).send('Bad request').end();
  }
});

/* PUT */
router.put('/:id', function(pet, resp, next) {
  var nuevo = pet.body;
  if(isNaN(pet.params.id) && nuevo.estado==undefined){
    req.status(400).send('Bad request').end();
  }
  else{
    models.Orden.findById(pet.params.id).then(function(orden){
      if(orden){
        models.Orden.update({estado: nuevo.estado},{where : {id:pet.params.id}})
          .then(function(orden){
            resp.status(200).send().end();
          });
      }
      else{
        resp.status(404).send("No se ha encontrado la orden con id: "+pet.params.id).end();
      }
    });
  }
});

module.exports = router;
