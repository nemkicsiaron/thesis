import { Router } from "express";
import router from "./aggreg.route";

const routes = Router();

routes.use('/aggreg', router);

export default routes;