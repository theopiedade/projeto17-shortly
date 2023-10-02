import { Router } from "express"
import { schemaUrl } from "../schemas/urls.schemas.js"
import { getUsersMe } from "../controllers/users.controllers.js"
import { validateSchema } from "../middlewares/validateschema.js"

const usersRouter = Router()

usersRouter.get("/users/me", getUsersMe);


export default usersRouter