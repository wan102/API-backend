const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users')

const verifyPassword = function (user, password) {
  return user.password === password
}

const checkUserAndPass = async (user_name, password, done) => {
  let result

  try {
    result = await users.findByUsername(user_name)
  } catch (error) {
    console.error(`Error during authentication for user ${user_name}`)
    return done(error);
  }

  if (result.length) {
    const user = result[0]
    if (verifyPassword(user, password)) {
      return done(null, user);
    } else {
      console.log(`incorrect`)
    }
  } else {
    console.log(`${user_name} user not found`)
  }
  return done(null, false)  
}

const strategy = new BasicStrategy(checkUserAndPass)

module.exports = strategy
