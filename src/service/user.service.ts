import { DocumentDefinition } from 'mongoose';
import userModel, { UserDocument } from "../model/user.model";

// export const createUser = async (input: DocumentDefinition<UserDocument>) => {
//     try {
//         return await userModel.create(input);
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }

// const findUser = async () => {

// }

export const validatePassword = async (
    {
        email,
        password
    }: {
        email: UserDocument["email"];
        password: string;
    }
) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return false;
    }
    return user;
};