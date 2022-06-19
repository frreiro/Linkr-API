import { Router } from "express"
import {
    createPost,
    getUserPosts,
    putPost,
} from "../controllers/postsController.js"
import { searchHashtag } from "../middlewares/hashtagsMiddleware.js"
import { tokenExists } from "../middlewares/timelineMiddleware.js"
import {
    validatePostOwnership,
    validatePostSchema,
    validateToken,
    validateUpdatePostSchema,
} from "../middlewares/validateInformation.js"

const postRouter = Router()

postRouter.get("/posts/:id", tokenExists, getUserPosts)
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
    putPost
)

export default postRouter
