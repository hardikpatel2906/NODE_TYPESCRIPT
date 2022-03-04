import express from "express";
import { userCreate } from "../controller/user.controller";
import { validateRequest, requiresUser } from '../middleware';
import { createUserSchema, createUserSessionSchema } from '../schema/user.schema';
import { createUserSessionHandler, invalidateUserSessionHandler } from "../controller/session.controller";
let route = express.Router();

// route.get('/', (req, res) => { res.sendStatus(200) })

/** CREATE USER */
route.post("/api/createUser", validateRequest(createUserSchema), userCreate);

/** USER LOGIN */
route.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)

route.delete("/api/session", requiresUser, invalidateUserSessionHandler);

export default route;