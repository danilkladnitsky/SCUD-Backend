//Подключаем необходимые модули
let logs = require('../config/logs')
let secure = require('../secure')

module.exports = function(app) {
  //Получаем все логи
  app.get('/logs', async(req, res) => {
    logs.getAllLogs(res)
  });

  app.get('/logs/:param/:value', (req, res) => {
    //Выдаём логи по параметрам
    logs.getLogsByParam(req.params.param, req.params.value, res);
  });

  app.post('/logs', (req, res) => {
    //Вносим новый лог
    logs.insertLog(req.query.guest_id, req.query.guest_name, req.query.mode, req.query.zone, req.query.status,  res)
  });

};