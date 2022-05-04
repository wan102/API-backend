const db = require('../helpers/database')

exports.findByUsername = async function getByUsername(username) {
  const query = 'select * from users where username = ?'
  const user = await db.run_query(query, [username])
  return user
/*
  const user = await dbMongo.run_query('users', {'username': parseInt(username)})
console.log(user)
return user
  }
*/
}

//list all the articles in the database
exports.getAll = async function getAll() {
  // TODO: use page, limit, order to give pagination
  let data = await db.run_query('users', {})
  return data
}
