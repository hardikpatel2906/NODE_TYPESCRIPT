import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../helper/response.helper";

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    } catch (e: any) {
        return res.status(400).json(errorResponse(res.statusCode, e.errors, {}))
    }
};

export default validate;