const Koa = require('koa')
const cors = require('@koa/cors');
const static = require('koa-static-router')
const app = new Koa()

/**
 *  nodeJS Path directory.
 */

const user = require('./routes/users')
const animal = require('./routes/animals')
const breed = require('./routes/breeds')
const comment = require('./routes/comments')
const centre = require('./routes/centres')
const bookmark = require('./routes/bookmarks')

app.use(cors());
app.use(user.routes())
app.use(animal.routes())
app.use(breed.routes())
app.use(comment.routes())
app.use(centre.routes())
app.use(bookmark.routes())
app.use(static({dir:'docs', router: '/doc/'}))

let port = process.env.PORT || 10833;

app.listen(port)
console.log('Hello welcome to Petshop API. listen on port: 10833')