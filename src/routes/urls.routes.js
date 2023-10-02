import { Router } from "express"
import { schemaUrl } from "../schemas/urls.schemas.js"
import { deleteUrl, urlShort, getUrl, openShortUrl } from "../controllers/urls.controllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(schemaUrl), urlShort);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", openShortUrl);
urlsRouter.delete("/urls/:id", deleteUrl);

export default urlsRouter
