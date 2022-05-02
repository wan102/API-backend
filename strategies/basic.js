const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users')

const verifyPassword = function (user, password) {
  // compare user.password with the password supplied
  return user.password === password
}

const checkUserAndPass = async (username, password, done) => {
  // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome
  let result

  try {
    result = await users.findByUsername(username)
  } catch (error) {
    console.error(`Error during authentication for user ${username}`)
    return done(error);
  }

  if (result.length) {
    const user = result[0]
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${username}`)
      return done(null, user);
    } else {
      console.log(`Password incorrect for user ${username}`)
    }
  } else {
    console.log(`No user found with username ${username}`)
  }
  return done(null, false)  // username or password were incorrect
}

const strategy = new BasicStrategy(checkUserAndPass)

module.exports = strategy
