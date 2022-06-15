// [x] devo validar se o usuário enviou um token válido
// [x] devo receber na req um corpo com o id do post informado
// [x] devo associar esse token ao id do user
// [x] devo verificar se o post existe
// [x] devo validar se o usuário já curtiu o post
// [x] devo armazenar na tabela de postsLikes o idUser e o idpost
// [] devo receceber na header o id do post como params
// [] devo filtrar e armazenar quem curtiu aquele post 
// [] devo retornar uma lista com os nomes de quem curtiu
//

import { likesRepository } from "../repositories/likesRepository.js"

export async function like(req, res){
    const {id : userId} = res.locals.user
    const {postId} = req.body
    try {
        await likesRepository.insertLike(userId, postId)
        res.status(200).send("curtida feita com sucesso")
    } catch (error) {
        res.status(500)
    }


    res.send("oi")
}