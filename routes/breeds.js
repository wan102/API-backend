const Router = require('koa-router')
const model = require('../models/breeds')

const router = Router({prefix: '/api/v1/breeds'})


// get all breeds
router.get('/', getAll)


// get all active
async function getAll(ctx) {
    ctx.body = await model.getAll()
}


module.exports = router