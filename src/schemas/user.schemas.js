import Joi from "joi"

export const schemaUser = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().required()
})

export const schemaSignIn = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	password: Joi.string().required()
})