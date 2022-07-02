const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/comments')
const {validateComment} = require('../utilities/validation')
const auth = require('../utilities/auth')
const router = Router({prefix: '/api/v1/comments'})

// get all comments
router.get('/', getAll)
// get by animal_id
router.get('/:animal_id([0-9]{1,})', getByAnimalId)
// create
router.post('/', bodyParser(), validateComment, create)
// delete by id
router.del('/:id([0-9]{1,})', auth, deleteComment)

// get all comments
async function getAll(ctx) {
    ctx.body = await model.getAll()
}

// get by animal_id
async function getByAnimalId(ctx) {
    ctx.body = await model.getByAnimalId(ctx.params.animal_id)
}

// create
async function create(ctx) {
    let result = await model.add(ctx.request.body)
    if (result instanceof Object) {
        ctx.status = 201
        ctx.body = {message: "Create comment success."}
        } else {
        ctx.status = 500
        ctx.body = {error_message: result}
    }
}

// delete
async function deleteComment(ctx) {
    let id = ctx.params.id
    result = await model.remove(id)
    if (result instanceof Object) {
        ctx.status = 200;
        ctx.body = { message: "Delete comment success."}
    } else {
        ctx.status = 500
        ctx.body = {error_message: result}
    }
}
module.exports = router