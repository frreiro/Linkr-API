import { userRepository } from "../repositories/userRepository.js"
import sendPostSchema from "./schemas/sendPostSchema.js"

export async function validatePost(req, res, next) {
    const { username } = req.body
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "").trim()
    if (!token) return res.sendStatus(401)

    const validation = sendPostSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    }

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
