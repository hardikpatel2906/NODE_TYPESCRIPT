import { sign } from "../utils/jwt.utils";
import { Request, Response, NextFunction } from "express";
import { createAccessToken, createSession, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { get } from "lodash";

/** CREATE SESSION */
export const createUserSessionHandler = async (req: Request, res: Response) => {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    /** CREATE SESSION */
    const session = await createSession(user._id, req.get("user-agent") || "");

    /** CREATE ACCESS TOKEN */
    const accessToken = createAccessToken({ user, session });

    /** CREATE REFRESH TOKEN */
    const refreshToken = sign(session, {
        expiresIn: "1y",
    });

    res.send({ accessToken, refreshToken });
};


// export const getUserSessionsHandler = (req: Request, res: Response) => {

// };

/** UPDATE SESSION */
export const invalidateUserSessionHandler = async (req: Request, res: Response) => {
    const sessionId = get(req, "user.session");

    /** UPDATE SESSION */
    await updateSession({ _id: sessionId }, { valid: false });
    return res.sendStatus(200);
};