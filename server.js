//Подключаем необходимые библиотеки
let express = require('express');
let express_graphql = require('express-graphql').graphqlHTTP;
let db = require('./config/db');
const path = require("path");
let cors = require("cors")
const app = express();

//Подключаем папку static для доступа к сгенерированным qr кодам
app.use(express.static(path.join(__dirname,  "static")));
app.use(express.static("static"));

//Подключаем маршруты
require('./routes')(app, {});

//Настраиваем CORS
app.use(cors())

//Настраиваем Graphql
app.use('/graphql', express_graphql({
  schema: db.schema,
  rootValue: db.root,
  graphiql: true
}))


//Включаем сервер
app.listen(4000, () => console.log('Express Server Now Running On localhost:4000'));
