const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/users')
const can = require('../permission/users')
const auth = require('../utilities/auth')
const {validateRegister} = require('../utilities/validation')

const router = Router({prefix: '/api/v1/users'})

router.post('/login', bodyParser(),login)
router.post('/register', bodyParser(), validateRegister, register)


async function login(ctx) {
  const body = ctx.request.body
  let result = await model.get(body)
  if (result) {
    ctx.status = 200
    ctx.body = result
  } else {
    ctx.status = 500
    ctx.body = {error_message: "Login fail."}
  }
}

async function register(ctx) {
  const body = ctx.request.body
  if (body.admin_password == 'IamAAdminPassword') {
    body.is_admin = true
  }
  delete body["admin_password"]
  let result = await model.add(body)
  if (result instanceof Object) {
    ctx.status = 201
    ctx.body = {message: "Register successful, please login."}
  } else {
    ctx.status=500
    ctx.body = {error_message: result}
  }
  
}


module.exports = router