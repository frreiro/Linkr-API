import { Router } from "express"
import {
    createPost,
    getUserPosts,
    putPost,
} from "../controllers/postsController.js"
import { pageValidate, tokenExists } from "../middlewares/timelineMiddleware.js"
import { checkEditHashtags, searchHashtag } from "../middlewares/hashtagsMiddleware.js"
import {
    validatePostOwnership,
    validatePostSchema,
    validateToken,
    validateUpdatePostSchema,
} from "../middlewares/validateInformation.js"

const postRouter = Router()

postRouter.get("/posts/:id", tokenExists, pageValidate, getUserPosts)
postRouter.post(
    "/posts",
    validatePostSchema,
    validateToken,
    searchHashtag,
    createPost
)
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
