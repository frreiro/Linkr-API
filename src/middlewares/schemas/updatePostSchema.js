import joi from "joi"

const updatePostSchema = joi.object({
    username: joi.string().required(),
    description: joi.string().required(),
})

export default updatePostSchema
