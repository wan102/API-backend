// This file will define the API route handlers for Articles
const Router = require('koa-router');
// We are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser');
const model = require('../models/articles')
const { validateArticle } = require('../controllers/validation')

// Since we are handling articles use a URI that begins with an appropriate path
const router = Router({ prefix: '/api/v1/articles' });

// Routes are needed to connect path endpoints to handler functions. 
// When an Article id needs to be matched we use a pattern to match 
// a named route parameter. Here the name of the parameter will be 'id' 
// and we will define the pattern to match at least 1 numeral.
router.get('/', getAll);
router.post('/', bodyParser(), validateArticle, createArticle)
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);

// Now we define the handler functions used above.
async function getAll(ctx, next) {
  let articles = await model.getAll()
  if (articles) {
    ctx.body = articles
  }
}

async function getById(ctx) {
  let id = ctx.params.id
  console.log(id)
  let article = await model.getById(id)
  if (article) {
    ctx.body = article[0]
  }
}

async function createArticle(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function updateArticle(ctx) {
  // TODO edit an existing article
}

async function deleteArticle(ctx) {
  // TODO delete an existing article
}

module.exports = router;
