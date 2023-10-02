import { Router } from "express"
import recipeRouter from "./sign.routes.js"
import urlsRouter from "./urls.routes.js"

const router = Router()

router.use(recipeRouter)
router.use(urlsRouter)

export default router