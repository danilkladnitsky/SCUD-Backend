const { Pool } = require("pg")
const db = require("./db")
const settings = require("./settings")

const pool = new Pool(settings.pool_settings)


module.exports = {
}
