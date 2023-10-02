import { Router } from "express"
import { schemaUrl } from "../schemas/urls.schemas.js"
import { urlShort } from "../controllers/urls.controllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(schemaUrl), urlShort);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", openShortUrl);

export default urlsRouter
