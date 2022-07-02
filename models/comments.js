const db = require('../utilities/database')

// get all
exports.getAll = async function getAll () {
    let query = "select * from comments;"
    return await db.run_query(query)
}

// get by animal_id
exports.getByAnimalId = async function getByAnimalId (animal_id) {
    let query = "select * from comments where animal_id = ?;"
    let values = [animal_id]
    return await db.run_query(query, values)
}

// create a new comment in the database
exports.add = async function add (comment) {  
  let keys = Object.keys(comment)
  let values = Object.values(comment)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO comments (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}


//delete comment in the database
exports.remove = async function remove(id) {
    let query = 'DELETE FROM comments WHERE id = ?'
    let values = [id]
    let data = await db.run_query(query, values)
    return data
  }