const Router = require('koa-router')
const model = require('../models/users')
const can = require('../permission/users')
const auth = require('../controllers/auth')
const router = Router({prefix: '/api/v1/users'})

router.get('/', auth, getAll)

async function getAll(ctx) {
  const permission = can.readAll(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const result = await model.getAll()
    if (result.length) {
      ctx.body = result;
    }    
  }
}

module.exports = router