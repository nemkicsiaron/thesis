import { Router } from "express";
import aggregrouter from "./aggreg.route";
import authrouter from "./auth.route";

const routes = Router();

routes.use('/aggreg', aggregrouter);
routes.use('/auth', authrouter);

export default routes;