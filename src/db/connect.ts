import mongoose, { ConnectOptions } from "mongoose";
import log from "../logger";

const connect = () => {
    const dbURL = 'mongodb://localhost:27017/TestNodeTS' as string;

    return mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
        .then(() => {
            console.log("Database connected!");
        })
        .catch((error) => {
            console.error("DB error", error);
            process.exit(1);
        });
}

export default connect;