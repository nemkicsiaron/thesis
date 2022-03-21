import { Router } from "express";
import router from "./api.route";

const routes = Router();

routes.use('/api', router);

export default routes;