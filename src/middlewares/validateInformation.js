import { userRepository } from "../repositories/userRepository.js"
import retweetSchema from "./schemas/retweetSchema.js"
import sendPostSchema from "./schemas/sendPostSchema.js"
import updatePostSchema from "./schemas/updatePostSchema.js"

export async function validatePostSchema(req, res, next) {
    const validation = sendPostSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    next()
}

export async function validateUpdatePostSchema(req, res, next) {
    const validation = updatePostSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    next()
}

export async function validateRetweetSchema(req, res, next) {
    const validation = retweetSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

    next()
}

export async function validateToken(req, res, next) {
    const { username } = req.body
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "").trim()
    if (!token) return res.sendStatus(401)

    try {
        const userQuery = await userRepository.getUser(username)
        const userResult = userQuery.rows[0]
        if (!userResult) return res.status(404).send("User not found.")

        const tokenQuery = await userRepository.getToken(token, userResult.id)
        const tokenResult = tokenQuery.rows[0]
        if (!tokenResult) return res.status(401).send("Invalid token.")

        res.locals.user = userResult
        next()
    } catch (e) {
        return res.status(500).send(e)
    }
}

export async function validatePostOwnership(req, res, next) {
    const { id } = req.params
    const { user } = res.locals
    try {
        const postCheckQuery = await userRepository.checkPostOwner(id, user.id)
        const postCheckResult = postCheckQuery.rows[0]
        if (!postCheckResult) return res.sendStatus(401)

        res.locals.user = { ...user, postId: id }
        next()
    } catch (e) {
        res.status(500).send(e)
    }
}
