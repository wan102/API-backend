// My blog API
// Set up the application and its router
const Koa = require('koa')
const app = new Koa()
const static = require('koa-static-router')
const special = require('./routes/special')
const articles = require('./routes/articles')
const user = require('./routes/users')

/*
* Define route handler(s):
*
* This means we connect HTTP methods: GET, POST, ...
* and URI paths: /some/uri/path
* to JavaScript functions that handle the request.
*
* Once defined we then add them to the app object.
*/

app.use(special.routes())
app.use(articles.routes())
app.use(user.routes())
app.use(static({ dir: 'docs', router: '/doc/' }))
// Define the actual handler functions
function welcomeAPI(ctx, next) {
  ctx.body = {
    message: "Welcome to the blog API!"
  }
}
// Finally, run the app as a process on a given port
let port = process.env.PORT || 10888;
app.listen(port);
console.log('API is ready')
2