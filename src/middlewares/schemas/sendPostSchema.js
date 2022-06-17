import joi from "joi"

const sendPostSchema = joi.object({
    username: joi.string().required(),
    url: joi.string().uri().required(),
    description: joi.string(),
})

export default sendPostSchema
