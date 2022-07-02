const {Validator, ValidationError} = require('jsonschema')
const schemaRegister = require('../schemas/register.schema.js');
const schemaAnimal = require('../schemas/animal.schema.js');
const schemaComment = require('../schemas/comment.schema.js');
const schemaBookmark = require('../schemas/bookmark.schema.js');
const v = new Validator()

exports.validateArticle = async (ctx, next) => {

  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  
  try {
    v.validate(body, schemaArticle, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400      
    } else {
      throw error
    }
  }
}

exports.validateRegister = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, schemaRegister, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400      
    } else {
      throw error
    }
  }
}

exports.validateAnimal = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, schemaAnimal, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400      
    } else {
      throw error
    }
  }
}

exports.validateComment = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, schemaComment, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400      
    } else {
      throw error
    }
  }
}

exports.validateBookmark = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, schemaBookmark, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400      
    } else {
      throw error
    }
  }
}