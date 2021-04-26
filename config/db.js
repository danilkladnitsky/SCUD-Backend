const {
  Pool
} = require("pg");
let {
  buildSchema
} = require("graphql");
let users = require("./users")
let auth = require("./auth")
let logs = require("./logs")
let secure = require("../secure")
let schema = buildSchema(`
  type Query {
    user(id: Int!, token: String!): User
    users(param: String, value: String, token: String!): [User]
    log(id: Int!): Log
    logs(param: String, value: String, token: String!): [Log]
    auth(login: String!, pwd: String!): AuthPayload
  }

  type Mutation {
    updateUser(id: Int!, name: String!, login: String!, mode: Int!, pwd: String, token: String!): ChangeOperation
    createUser(token: String!, name: String!, login: String!, mode: Int!, pwd: String!): ChangeOperation
    createCode(token: String!, name: String!, mode: Int!): ChangeOperation
    
    
  }

  type User {
    id: Int
    name: String
    login: String
    mode: Int
    pwd: String
  }

  type ChangeOperation {
    message: String
  }


  type Log {
    id: Int
    mode: Int
    guest_id: Int
    guest_name: String
    zone: String
    status: String
    date: String
  }

  type AuthPayload {
    token: String!
    id: Int!
    msg: String!
  }
`)


let root = {
  auth: (args) => {
    return auth._loginUser(args)
  },
  user: (args) => {
    return secure.authenticateToken(args, users._getUser)
  },
  users: (args) => {
    return secure.authenticateToken(args, users._getUsers)
  },
  logs: (args) => {
    return secure.authenticateToken(args, logs._getLogs)
  },
  updateUser: (args) => {
    return secure.authenticateToken(args, users._updateUser)
  },
  createUser: (args) => {
    return secure.authenticateToken(args, users._createUser)
  },
  createCode: (args) => {
    return secure.authenticateToken(args, users._createCode)
  }
}

exports.root = root;
exports.schema = schema;