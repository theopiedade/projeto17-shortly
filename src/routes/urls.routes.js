import { Router } from "express"
import { schemaUrl } from "../schemas/urls.schemas.js"
import { urlShort } from "../controllers/urls.controllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(schemaUrl), urlShort);

export default urlsRouter