// Connect to mongoDB
const mongoClient = require("mongodb").MongoClient
// Import the mongoose module
var mongoose = require('mongoose');
const mongoAuth = require('../config')

const mongo_username = mongoAuth.configMongo.user
const mongo_password = mongoAuth.configMongo.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configMongo.host}`
const DATABASE_NAME = mongoAuth.configMongo.dbname

exports.run_query = async function run_query(collection, query) {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
  console.log(result)
  return result
}

exports.run_insert = async function run_insert(collection, document) {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  return { "status": 201, "description": "Data insert successfully" }
}
