import { Router } from "express";
import aggregrouter from "./aggreg.route";

const routes = Router();

routes.use('/aggreg', aggregrouter);

export default routes;