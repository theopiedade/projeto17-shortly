import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers.js"
import { schemaUser, schemaSignIn } from "../schemas/user.schemas.js"
import { validateSchema } from "../middlewares/validateschema.js"

const recipeRouter = Router()

recipeRouter.post("/signup", validateSchema(schemaUser), signUp)
recipeRouter.post("/signin", validateSchema(schemaSignIn), signIn)

export default recipeRouter