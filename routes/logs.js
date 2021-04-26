let logs = require('../config/logs')
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()
let secure = require('../secure')

module.exports = function(app) {
  app.get('/logs', async(req, res) => {
    logs.getAllLogs(res)
    console.log("Get logs");
  });

  app.get('/logs/:param/:value', (req, res) => {
    logs.getLogsByParam(req.params.param, req.params.value, res);
    console.log("Get logs specified");
  });

  app.post('/logs', (req, res) => {
    logs.insertLog(req.query.guest_id, req.query.guest_name, req.query.mode, req.query.zone, req.query.status,  res)
  });

};