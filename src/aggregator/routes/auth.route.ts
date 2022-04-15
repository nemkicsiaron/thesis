import { Router } from "express";
import controller from "../auth/controller/user";

const authrouter = Router();

authrouter.get('/validate', controller.validateToken);
authrouter.post('/register', controller.register);
authrouter.post('/login', controller.login);
authrouter.get('/get/all', controller.getAllUsers);

export default authrouter;