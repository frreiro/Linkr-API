import { Router } from "express"
import { retweetPost } from "../controllers/retweetController.js"

import {
    validateRetweetSchema,
    validateToken,
} from "../middlewares/validateInformation.js"

const retweetRouter = Router()

retweetRouter.post(
    "/share/:postId",
    validateRetweetSchema,
    validateToken,
    retweetPost
)

export default retweetRouter
