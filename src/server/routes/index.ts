import { Router } from "express";
import router from "./api.route";

const routes = Router();

routes.use('/users', router);

export default routes;