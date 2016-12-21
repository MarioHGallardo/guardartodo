var express = require('express');
var router = express.Router();
var model = require('../models/storagelokertypes');

router.get('/api/storagelokertypes', function(request, response) {
  model.getAll(function(error, data) {
    response.status(200).json(data);
  });
});

router.get('/api/storagelokertypes/:id', function(request, response) {
  var id = request.params.id;
  model.getById(id,function(error, data) {
    if (typeof data !== 'undefined' && data.length > 0) {
      response.status(200).json(data);
    }
    else {
      response.status(404).json({"Mensaje":"No existe"});
    }
  });
});

router.post('/api/storagelokertypes', function(request, response) {
  model.insert(request.body,function(error, data) {
    if(data) {
      response.status(200).json({"Mensaje":"Insertado"});
    }
    else {
      response.status(500).json({"Mensaje":"Error"});
    }
  });
});

//Modificar un usuario
router.put('/api/storagelokertypes', function(request, response) {
    var datosUsuario = {
      id:request.query.id,
      nombre : request.query.nombre
      };

    storagelokertypesModel.update(datosUsuario,function(error, datos)
    {
      //si el usuario se ha actualizado correctamente mostramos un mensaje
      if(datos && datos.mensaje)
      {
        response.status(200).json(datos);
      }
      else
      {
        response.status(500).json({"mensaje":"Error"});

      }
    });

});
//Borrar un usuario

router.delete('/api/storagelokertypes', function(request, response) {
    var id = request.query.id;
    storagelokertypesModel.delete(id,function(error, datos)
    {
      if(datos && datos.mensaje === "Borrado")
      {
        response.status(200).json(datos);
      }
      else
      {
        response.status(500).json({"mensaje":"Error"});
      }
    });

});

module.exports = router;