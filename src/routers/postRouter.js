import { Router } from "express"
import { createPost, putPost } from "../controllers/postsController.js"
import {
    validatePostOwnership,
    validatePostSchema,
    validateToken,
    validateUpdatePostSchema,
} from "../middlewares/validateInformation.js"

const postRouter = Router()

postRouter.post("/posts", validatePostSchema, validateToken, createPost)
postRouter.put(
    "/posts/:id",
    validateUpdatePostSchema,
    validateToken,
    validatePostOwnership,
    putPost
)

export default postRouter
