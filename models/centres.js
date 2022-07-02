const db = require('../utilities/database')

//list all the centres in the database
exports.getAll = async function getAll () {
    let query = "select * from centres;"
    let data = await db.run_query(query)  
    return data
  }