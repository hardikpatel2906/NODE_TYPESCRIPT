import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../helper/response.helper";

const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = get(req, "user");
        if (!user) {
            return res.sendStatus(403);
        }

        return next();
    } catch (e: any) {
        return res.status(400).json(errorResponse(res.statusCode, e.errors, {}))
    }
};

export default requiresUser;