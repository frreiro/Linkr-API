// [x] Devo validar se o usuário enviou um token válido
// [x] Devo receber um corpo no formato {postId, comment}
// [x] Devo válidar se o id do post existe
// [x] Devo válidar se o commentário não é null
// [x] Devo associar o token ao usuário
// [x] Devo Iserir o comentário no post

// [x] Devo validar se o usuário enviou um token válido
// [x] Devo receber uma header no formato {postId}
// [] Devo validar se o post existe
// [] Devo listar os comentários daquele post

import { commentsRepository } from "../repositories/commentsRepository.js"

export async function insertComment(req, res){
    const {postId, comment} = req.body
    const {id : userId} = res.locals.user
    try {
        await commentsRepository.addComment(postId, userId, comment)
        res.status(201).send("comentário adicionado")
    } catch (error) {
        res.status(500).send("ocorreu um erro ao inserir o comentário")
    }
}
export async function listComments(req, res){
    const {id : postId} = req.params
    try {
        const list = await commentsRepository.findComments(postId)   
        res.send(list.rows)
    } catch (error) {
        res.send("err")
    }
}