const dbMongo = require('../helpers/database')

//get a single article by its id  
exports.getById = async function getById(id) {
  let data = await dbMongo.run_query('articles', { 'authorID': parseInt(id) })
  return data
}

//list all the articles in the database
exports.getAll = async function getAll(page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let data = await dbMongo.run_query('articles', {})
  return data
}

//create a new article in the database
exports.add = async function add(document) {
  let status = await dbMongo.run_insert('articles', document)
  return status
}
