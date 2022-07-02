const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const formidable = require('koa2-formidable')
const mime = require('mime-types')
const model = require('../models/animals')
const {validateAnimal} = require('../utilities/validation')
const auth = require('../utilities/auth')
const router = Router({prefix: '/api/v1/animals'})


// get all active
router.get('/', getAll)
// get by id
router.get('/:id([0-9]{1,})', getById)
// create
router.post('/', auth, formidable(), bodyParser(), create)
// update avatar
router.post('/avatar', formidable(), bodyParser(), updateAvatar)
// update
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateAnimal, update)
// delete
router.del('/:id([0-9]{1,})', auth, deleteAnimal)
// filter by breeds
router.get('/filter/:breed_id([0-9]{1,})', getByBreedId)
// // search by name
router.get('/search/:name', getByName)
// get all active
async function getAll(ctx) {
    ctx.body = await model.getAll()
}
// get by breed_id
async function getByBreedId(ctx) {
    ctx.body = await model.getByBreedId(ctx.params.breed_id)
}
// get by name
async function getByName(ctx) {
    ctx.body = await model.getByName(ctx.params.name)
}
// get by id
async function getById(ctx) {
    let result = await model.getById(ctx.params.id)
    if (typeof result === "string") {
        ctx.status = 500
        ctx.body = {error_message: result}
    } else {
        ctx.status = 200
        ctx.body = result   
    }
}
// create
async function create(ctx) {
    const body = ctx.request.body;
    try {
        const fs = require('fs-extra')
        const {path, name, type} = ctx.request.files.avatar
        const fileExtension = mime.extension(type)
        console.log(`path: ${path}`)
        console.log(`filename: ${name}`)
        console.log(`type: ${type}`)
        console.log(`fileExtension: ${fileExtension}`)
        await fs.copy(path, `public/animals/avatar/${name}`)
        ctx.redirect('/')
        console.log('require):', require('path'))
        console.log('__dirname:', __dirname)
        body.image_url = process.cwd() + `/public/animals/avatar/${name}`

     
    } catch(err) {
    }
    let result = await model.add(ctx.request.body)
    if (result instanceof Object) {
        ctx.status = 201
        ctx.body = {message: "Create animal success."}
        } else {
        ctx.status=500
        ctx.body = {error_message: result}
    }
}
// upload avatar
async function updateAvatar(ctx) {
    try {
        const fs = require('fs-extra')
        const {path, name, type} = ctx.request.files.avatar
        const fileExtension = mime.extension(type)
        const image_name = new Date().getTime().toString() + name;
        console.log(`path: ${path}`)
        console.log(`filename: ${image_name}`)
        console.log(`type: ${type}`)
        console.log(`fileExtension: ${fileExtension}`)
        await fs.copy(path, `public/animals/avatar/${image_name}`)
        ctx.redirect('/')
        image_url = process.cwd() + `/public/animals/avatar/${image_name}`
        ctx.status = 200
        ctx.body = {url: image_url}
    } catch(err) {
        console.log(err)
        ctx.body = {error_message: "no"}
    }
}
// update
async function update(ctx) {
    let result = await model.update(ctx.params.id, ctx.request.body)
    if (result instanceof Object) {
        ctx.status = 201
        ctx.body = {message: "Update animal success."}
        } else {
        ctx.status=500
        ctx.body = {error_message: result}
    }
}

// delete animal
async function deleteAnimal(ctx) {
    let id = ctx.params.id
    let result = await model.remove(id)
    if (result) {
      ctx.status = 201
      ctx.body = {message: "Delete animal success."}
    } else {
      ctx.status=500
      ctx.body = {error_message: result}
    }
}

module.exports = router