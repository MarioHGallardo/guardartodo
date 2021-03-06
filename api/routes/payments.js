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

function getAll (q, done) {
  db.get().query(`SELECT p.*, r.folio, c.name, sl.number, slt.price, f_get_payment_status(p.rentId) as partial
                  FROM payment p
                    INNER JOIN rent r ON p.rentId = r.rentId AND r.enable = 1
                    INNER JOIN client c ON r.clientId = c.clientId
                    LEFT JOIN storageloker sl ON r.storagelokerId = sl.storagelokerId
                    LEFT JOIN storagelokertype slt ON sl.storagelokertypeId = slt.storagelokertypeId
                  WHERE p.enable = 1;`, function(err, rows) {
    if(err) throw err;

    done(rows);
  });
}

function getById (id, done) {
  db.get().query('SELECT * FROM payment WHERE paymentId = ? AND enable = 1', id, function(err, row) {
    if(err) throw err;
    done(row[0]);
  });
}

function insert (data,done) {
  db.get().query('INSERT INTO payment SET ?', data, function(err, result) {
    if(err) throw err;
    done(result)
  });
}

function update (id, data, done) {
  db.get().query('UPDATE payment SET ? WHERE paymentId = ? AND enable = 1', [data, id], function(err, result) {
    if(err) throw err;
    done(result);
  });
}

function remove (id, done) {
  db.get().query('UPDATE payment SET enable = 0 WHERE paymentId = ?', id, function(err, result) {
    if(err) throw err;
    done(result);
  });
}


app.use('/api/payments', jwtCheck);
app.get('/api/payments', function(req, res) {
  getAll(req.query.q, function(result) {
    moment.locale('es');
    _.forEach(result, function(value) {
      value.month = moment(value.date).format('MMMM - YYYY').toUpperCaseFirstChar();
    });
    res.status(200).send(result);
  });
});

app.get('/api/payments/:id', function(req, res) {
  getById(req.params.id, function(result) {
    res.status(200).send(result);
  });
});

app.post('/api/payments', function(req, res) {
  insert(req.body, function(result) {
    res.status(200).send(result);
  });
});

app.put('/api/payments/:id', function(req, res) {
  update(req.params.id,req.body,function(result) {
    res.status(200).send(result);
  });
});

app.delete('/api/payments/:id', function(req, res) {
  remove(req.params.id, function(result) {
    res.status(200).send(result);
  });
});

