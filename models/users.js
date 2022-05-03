const db = require('../helpers/database')

exports.findByUsername = async function getByUsername(username) {
  const query = 'select * from users where username = ?'
  const user = await db.run_query(query, [username])
  return user
/*
    let username = ctx.params.username
  console.log(username)
  let article = await db.getByIdMongo(username)
  if (article) {
    ctx.body = article[0]
  }
  */
}

//list all the articles in the database
exports.getAll = async function getAll() {
  // TODO: use page, limit, order to give pagination
  let data = await db.run_query('users', {})
  return data
}
