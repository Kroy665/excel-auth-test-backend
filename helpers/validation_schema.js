const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
})

// const excelSchema = Joi.object({
//   userId: Joi.string(),
//   path: Joi.string(),
// })

module.exports = {
  authSchema
}
