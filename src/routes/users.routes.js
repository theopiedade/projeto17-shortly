import { Router } from "express"
import { schemaUrl } from "../schemas/urls.schemas.js"
import { getUsersMe, ranking } from "../controllers/users.controllers.js"
import { validateSchema } from "../middlewares/validateschema.js"

const usersRouter = Router()

usersRouter.get("/users/me", getUsersMe);
usersRouter.get("/RANKING", ranking);


export default usersRouter