import { Router } from "express"
import recipeRouter from "./sign.routes.js"
import urlsRouter from "./urls.routes.js"
import usersRouter from "./users.routes.js"

const router = Router()

router.use(recipeRouter)
router.use(urlsRouter)
router.use(usersRouter)

export default router