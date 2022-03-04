import userModel from "../model/user.model";
import { Request, Response } from 'express';
import { successResponse, errorResponse } from "../helper/response.helper";

export const userCreate = async (req: Request, res: Response) => {
    try {
        const user = await userModel.create(req.body)
        res.json(successResponse(200, 'User created successfully.', user));
    } catch (e: any) {
        // console.log(e);
        res.status(409).send(errorResponse(res.statusCode, e.message, {}));
    }
};

// export const userSessionHnadler = async (req: Request, res: Response) => {
//     try {

//     } catch (e) {

//     }
// };