import { likesRepository } from "../repositories/likesRepository.js"

export async function validateToken(req, res, next){

    const token = req.headers.authorization?.replace("Bearer", "").trim()
    if (!token) return res.status(401).send("Token nao enviado")
    try {
        const user = await likesRepository.getUser(token)

        if (user.rows[0]===undefined) return res.status(401).send("token não encontrado")

        res.locals.user = user.rows[0]
        
        next()

    } catch (error) {
        res.status(422).send("Você não enviou um token válido")
    }
    
}

export async function postValidate(req, res, next){
    let {postId} = req.body
    if(postId === undefined){
        postId = req.params.id
    }

    try {
        const post = await likesRepository.findPost(postId)
        if(post.rows.length === 0) return res.status(422).send("Este post não existe")    
        next()
    } catch (error) {
        res.status(500).send("Você não enviou as informações em um formato válido")
    }

}

export async function deleteLike(req, res, next){
    const {postId} = req.body
    const {id : userId} = res.locals.user

    try {
        const likeAvailable = await likesRepository.likeAvailable(userId, postId)
        
        if(likeAvailable.rows.length > 0) {
            await likesRepository.deleteLike(userId, postId)
            return res.status(204).send("Post descurtido")
        }

        next()
        
    } catch (error) {
        res.sendStatus(500)
    }
}

