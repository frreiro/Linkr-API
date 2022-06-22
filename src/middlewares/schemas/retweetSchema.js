import joi from "joi"

const retweetSchema = joi.object({
    username: joi.string().required(),
})

export default retweetSchema
