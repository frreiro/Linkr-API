import { Router } from "express"

import { getUserById } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.get("/users/:id", getUserById)

export default usersRouter
