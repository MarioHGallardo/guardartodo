var moment = require('moment'),
    _ = require("lodash");

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
  secret: config.secretKey
});

function getAll (done) {
  db.get().query(`SELECT r.*, c.name, sl.number, slt.name as storagelokertypename
                    FROM rent r
                      INNER JOIN client c ON r.clientId = c.clientId
                      INNER JOIN storageloker sl ON r.storagelokerId = sl.storagelokerId
                      INNER JOIN storagelokertype slt ON slt.storagelokertypeId = sl.storagelokertypeId
                    WHERE r.enable = 1
                    ORDER BY r.active DESC, r.startDate DESC`, function(err, rows) {
    if(err) throw err;
    done(rows);
  });
}

function getById (id, done) {
  db.get().query('SELECT * FROM rent WHERE rentId = ? AND enable = 1', id, function(err, row) {
    if(err) throw err;
    done(row[0]);
  });
}

function insert (data,done) {
  let userAuthorization;
  data.clientId = data.client.clientId;
  data.storagelokerId = data.storageloker.storagelokerId;
  data.startDate = moment(data.startDate).format("YYYY-MM-DD HH:MM");
  userAuthorization = data.user;
  delete data.client;
  delete data.storageloker;
  delete data.storagelokertype;
  delete data.user;

  db.get().query('INSERT INTO rent SET ?', data, function(err, result) {
    if(err) throw err;
    insertAuthorizedUsers(userAuthorization, result);
    done(result)
  });
}

function update (id, data, done) {
  data.clientId = data.client.clientId;
  data.storagelokerId = data.storageloker.storagelokerId;
  data.startDate = moment(data.startDate).format("YYYY-MM-DD HH:MM");
  delete data.client;
  delete data.storageloker;
  delete data.storagelokertype;
  db.get().query('UPDATE rent SET ? WHERE rentId = ? AND enable = 1', [data, id], function(err, result) {
    if(err) throw err;
    done(result);
  });
}

function remove (id, done) {
  db.get().query('UPDATE rent SET enable = 0 WHERE rentId = ?', id, function(err, result) {
    if(err) throw err;
    done(result);
  });
}

function insertAuthorizedUsers(users, result) {

  let mapped = _.map(users, item => _.extend(_.pick(item, 'userId'), {"rentId": result.insertId}));
  console.log(JSON.stringify(mapped));
  //db.get().query('INSERT INTO rentauthorization SET ?', id, function(err, result) {

  //});
    //if(err) throw err;

  //});
}

app.use('/api/rents', jwtCheck);
app.get('/api/rents', function(req, res) {
  moment.locale('es');
  getAll(function(result) {
    _.forEach(result, function(value) {
      value.startDateToString = moment(value.startDate).fromNow();
      value.endDateToString = moment(value.endDate).fromNow();
    });
    res.status(200).send(result);
  });
});

app.get('/api/rents/:id', function(req, res) {
  getById(req.params.id, function(result) {
    res.status(200).send(result);
  });
});

app.post('/api/rents', function(req, res) {
  insert(req.body, function(result) {
    res.status(200).send(result);
  });
});

app.put('/api/rents/:id', function(req, res) {
  update(req.params.id,req.body,function(result) {
    res.status(200).send(result);
  });
});

app.delete('/api/rents/:id', function(req, res) {
  remove(req.params.id, function(result) {
    res.status(200).send(result);
  });
});
