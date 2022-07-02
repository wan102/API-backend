const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const formidable = require('koa2-formidable')
const mime = require('mime-types')
const model = require('../models/bookmarks')
const {validateBookmark} = require('../utilities/validation')
const auth = require('../utilities/auth')

const router = Router({prefix: '/api/v1/bookmarks'})

// get all
router.get('/', auth, getAll)

// get by user_id
router.get('/:user_id([0-9]{1,})', getByUserId)
// get by user_id and animal_id
router.get('/:user_id([0-9]{1,})/:animal_id([0-9]{1,})', getByUserIdAnimalId)
// create
router.post('/', auth, formidable(), bodyParser(), validateBookmark, create)

// delete
router.del('/:id([0-9]{1,})', auth, deleteBookmark)

// get all
async function getAll(ctx) {
    ctx.body = await model.getAll()
}

// get by id
async function getByUserId(ctx) {
    let result = await model.getByUserId(ctx.params.user_id)
    if (typeof result === "string") {
        ctx.status = 500
        ctx.body = {error_message: result}
    } else {
        ctx.status = 200
        ctx.body = result   
    }
}
// get by user_id and animal_id
async function getByUserIdAnimalId(ctx) {
    let user_id = ctx.params.user_id;
    let animal_id = ctx.params.animal_id;
    ctx.body = await model.getByUserIdAnimalId({user_id, animal_id})
}

// create
async function create(ctx) {
    let body = ctx.request.body;
    let result = await model.getByUserIdAnimalId(body)
    if ( result.length == 0 ) {
        await model.add(body)
        ctx.status = 201
        ctx.body = {message: "Create bookmark success."}
    } else {
        ctx.status = 201
        ctx.body = {message: "Create bookmark success."}
    }
}

// delete bookmark
async function deleteBookmark(ctx) {
    let id = ctx.params.id
    let result = await model.remove(id)
    if (result) {
      ctx.status = 201
      ctx.body = {message: "Delete bookmark success."}
    } else {
      ctx.status=500
      ctx.body = {error_message: result}
    }
}
module.exports = router