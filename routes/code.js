let code = require('../config/code')
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()
module.exports = function(app) {
  app.post('/code/:id', (req, res) => {
    code.createCode(req.params.id, res)
  });

  app.get('/code', (req, res) => {
    code.createUniqueCode(res)
  });
};