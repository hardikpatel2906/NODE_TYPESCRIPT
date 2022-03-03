import { sign } from "jsonwebtoken";
import { LeanDocument } from "mongoose"
import sessionModel, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';

export const createSession = async (userId: string, userAgent: string) => {
    const session = await sessionModel.create({ user: userId, userAgent });
    return session.toJSON();
};

export const createAccessToken = ({ user, session }: {
    user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
    session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) => {
    // const accessToken = sign(
    //     { ...user, session: session._id },
    //     { expireIn: "1h" }
    // )
    // return accessToken;
}