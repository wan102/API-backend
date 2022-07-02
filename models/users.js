//findout user in Database

const db = require('../utilities/database')

exports.findByUsername = async function getByUsername(user_name) {
  const query = 'SELECT * from users where user_name = ?'
  const user = await db.run_query(query, [user_name])
  return user
}


// get user
exports.get = async function get (body) {
  const query = 'SELECT * from users where user_name = ? and password = ? limit 1'
  const user = await db.run_query(query, [body.user_name, body.password])
  return user[0]
}

// register a new user
exports.add = async function post (user) {
  // check duplicate
  const duplicateEmail = 'SELECT * from users where email = ?'
  const duplicateEmailResult = await db.run_query(duplicateEmail, [user.email])
  if (duplicateEmailResult.length >= 1) {
    return "This email already registered."
  }
  const duplicateUserName = 'SELECT * from users where user_name = ?'
  const duplicateUserNameResult = await db.run_query(duplicateUserName, [user.user_name])
  if (duplicateUserNameResult.length >= 1) {
    return "This user name already registered."
  }
  // create user
  let keys = Object.keys(user)
  let values = Object.values(user)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO users (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)
    return {"status": 201}
  } catch(error) {
    return error
  }
}
//list all the articles in the database
exports.getAll = async function getAll () {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM users;"
  let data = await db.run_query(query)  
  return data
}