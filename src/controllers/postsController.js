import urlMetadata from "url-metadata"
import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

import { userRepository } from "../repositories/userRepository.js"
import { _mapPostData } from "./timelineController.js";

export async function createPost(req, res) {
    const { description } = req.body
    const { user } = res.locals
    const { hashtagsIds } = res.locals;

    try {
        const link = await urlMetadata(req.body.url)
        const linkQuery = await userRepository.insertLinkInfo(link)
        const linkResult = linkQuery.rows[0]
        const { rows: [post] } = await userRepository.insertPost(user.id, linkResult.id, description)

        if (hashtagsIds) {
            for (const hashtag of hashtagsIds) {
                await hashtagsRepository.linkPostAndHashtags(post.id, hashtag);
            }
        }
        return res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function putPost(req, res) {
    const { description } = req.body
    const { user, hashtagsIds } = res.locals

    try {
        const updateQuery = await userRepository.updatePost(
            description,
            user.postId
        )
        const updateQueryResult = updateQuery.rows[0]

        if (hashtagsIds) {
            for (const hashtag of hashtagsIds) {
                await hashtagsRepository.linkPostAndHashtags(user.postId, hashtag);
            }
        }
        res.status(200).send(updateQueryResult)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function getUserPosts(req, res) {
    const {id} = req.params

    try {
        const postsQuery = await userRepository.getUserPosts(id)
        const postsQueryResult = postsQuery.rows
        
        res.status(200).send(_mapPostData(postsQueryResult));
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}