import express from "express";
import { userCreate, userSessionHnadler } from "../controller/user.controller";
import validateRequest from '../middleware/validateRequest';
import { createUserSchema, createUserSessionSchema } from '../schema/user.schema';

let route = express.Router();

// route.get('/', (req, res) => { res.sendStatus(200) })

/** CREATE USER */
route.post("/api/createUser", validateRequest(createUserSchema), userCreate);

/** USER LOGIN */
route.post("/api/sessions", validateRequest(createUserSessionSchema), userSessionHnadler)


export default route;