let express = require('express');
let express_graphql = require('express-graphql').graphqlHTTP;
let db = require('./config/db');
const path = require("path");
let cors = require("cors")
const app = express();
app.use(express.static(path.join(__dirname,  "static")));
app.use(express.static("static"));
require('./routes')(app, {});
var bodyParser = require('body-parser'); 
app.use(cors())
app.use('/graphql', express_graphql({
  schema: db.schema,
  rootValue: db.root,
  graphiql: true
}))



app.listen(4000, () => console.log('Express Server Now Running On localhost:4000'));
