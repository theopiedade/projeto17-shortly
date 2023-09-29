import { Router } from "express"
import recipeRouter from "./sign.routes.js"

const router = Router()

router.use(recipeRouter)

export default router