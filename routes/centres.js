const Router = require('koa-router')
const model = require('../models/centres')

const router = Router({prefix: '/api/v1/centres'})

// get all active
router.get('/', getAll)

// get all active
async function getAll(ctx) {
    ctx.body = await model.getAll()
}
module.exports = router