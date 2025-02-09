import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import sessionModel, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { sign, decode } from '../utils/jwt.utils';
import { get } from "lodash";
import { findUser } from "./user.service";

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
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: "15m" }
    )
    return accessToken;
};

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    // Decode the refresh token
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, "_id")) return false;

    // Get the session
    const session = await sessionModel.findById(get(decoded, "_id"));

    // Make sure the session is still valid
    if (!session || !session?.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = createAccessToken({ user, session });

    return accessToken;
};

export const updateSession = (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) => {
    return sessionModel.updateOne(query, update);
}