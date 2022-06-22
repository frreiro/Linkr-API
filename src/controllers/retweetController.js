import { userRepository } from "../repositories/userRepository.js"

export async function retweetPost(req, res) {
    const { postId } = req.params
    const { user } = res.locals
    try {
        const retweetQuery = await userRepository.retweetPost(user.id, postId)

        return res.sendStatus(201)
    } catch (e) {
        return res.status(500).send(e)
    }
}
