//Подключаем необходимые модули
let code = require('../config/code')

module.exports = function(app) {
  app.post('/code/:id', (req, res) => {
    //Создаём qr-код для пользователя по его ID
    code.createCode(req.params.id, res)
  });

  app.get('/code', (req, res) => {
    //Создаём одноразовый qr-код для пользователя
    code.createUniqueCode(res)
  });
};