import { commentSchema } from "./schemas/commentSchema.js"

export async function validateComment(req, res, next){
    try {
        const validate = await commentSchema.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(422).send("este comentário está vazio")
    }
    
}