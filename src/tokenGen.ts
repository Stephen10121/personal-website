import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "15m"});
}