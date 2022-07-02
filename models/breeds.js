const db = require('../utilities/database')

//list all the breeds in the database
exports.getAll = async function getAll () {
    let query = "select * from breeds;"
    let data = await db.run_query(query)  
    return data
  }