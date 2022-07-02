const passport = require('koa-passport')
const basicAuth = require('../auth_strategies/basic')

passport.use(basicAuth)
module.exports = passport.authenticate('basic', {session:false});