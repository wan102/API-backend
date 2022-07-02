const db = require('../utilities/database')

// get all
exports.getAll = async function getAll () {
    let query = "select * from bookmarks;"
    let data = await db.run_query(query)  
    return data
  }

// get by user_id
exports.getByUserId = async function getByUserId (user_id) {
    let query = "select bookmarks.*, animals.name, animals.image_url, animals.birthday, animals.gender, animals.isneutered, animals.note, animals.status, animals.breed_id, animals.centre_id from bookmarks inner join animals on bookmarks.animal_id = animals.id where user_id = ?;"
    let values = [user_id]
    return await db.run_query(query, values)
  }

// get by user_id and animal_id
exports.getByUserIdAnimalId = async function getByUserIdAnimalId ({user_id, animal_id}) {
    let query = "select * from bookmarks where user_id = ? and animal_id = ?;"
    let values = [user_id, animal_id]
    return await db.run_query(query, values)
  }

// create
exports.add = async function add (bookmark) {  
    let keys = Object.keys(bookmark)
    let values = Object.values(bookmark)  
    keys = keys.join(',')   
    let parm = ''
    for(i=0; i<values.length; i++){ parm +='?,'}
    parm=parm.slice(0,-1)
    let query = `INSERT INTO bookmarks (${keys}) VALUES (${parm})`
    try{
      await db.run_query(query, values)  
      return {"status": 201}
    } catch(error) {
      return error
    }
  }
// delete
exports.remove = async function remove(id) {
    let query = 'DELETE FROM bookmarks WHERE id = ?'
    let values = [id]
    let data = await db.run_query(query, values)
    return data
  }
  