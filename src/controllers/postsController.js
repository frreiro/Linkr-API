import urlMetadata from "url-metadata"

import { userRepository } from "../repositories/userRepository.js"

export async function createPost(req, res) {
    const { description } = req.body
    const { user } = res.locals
    try {
        const link = await urlMetadata(req.body.url)
        const linkQuery = await userRepository.insertLinkInfo(link)
        const linkResult = linkQuery.rows[0]

        const postQuery = await userRepository.insertPost(
            user.id,
            linkResult.id,
            description
        )

        return res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function putPost(req, res) {
    const { description } = req.body
    const { user } = res.locals
    try {
        const updateQuery = await userRepository.updatePost(
            description,
            user.postId
        )
        const updateQueryResult = updateQuery.rows[0]

        res.status(200).send(updateQueryResult)
    } catch (e) {
        res.status(500).send(e)
    }
}
