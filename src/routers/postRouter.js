import { Router } from "express"
import { createPost, putPost } from "../controllers/postsController.js"
import { checkEditHashtags, searchHashtag } from "../middlewares/hashtagsMiddleware.js"
import {
    validatePostOwnership,
    validatePostSchema,
    validateToken,
    validateUpdatePostSchema,
} from "../middlewares/validateInformation.js"

const postRouter = Router()

postRouter.post("/posts", validatePostSchema, validateToken, searchHashtag, createPost)
postRouter.put(
    "/posts/:id",
    validateUpdatePostSchema,
    validateToken,
    validatePostOwnership,
    searchHashtag,
    checkEditHashtags,
    putPost
)

export default postRouter
