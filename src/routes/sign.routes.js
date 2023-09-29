import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers"
import { schemaUser } from "../schemas/user.schemas"

const recipeRouter = Router()

recipeRouter.post("/signup", validateSchema(schemaUser), signUp)
recipeRouter.post("/signin", validateSchema(schemaSignIn), signIn)

export default recipeRouter