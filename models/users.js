const dbMongo = require('../helpers/database')

exports.findByUsername = async function getByUsername(username) {
  const user = await dbMongo.run_query('users', { 'username': username })
  console.log(user)
  return user
}

//list all the articles in the database
exports.getAll = async function getAll() {
  // TODO: use page, limit, order to give pagination
  let data = await dbMongo.run_query('users', {})
  return data
}
