import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";

export const userAuthorize = async (req: any) => {
    if (!req.headers.authentication) {
        return false;
    }
    let bearer;
    try {
        bearer=req.headers.authentication.split(" ")[1];
    } catch (err) {
        return false;
    }
    
    console.log(`[server] Checking if ${bearer} is valid.`);
    
    let payload;
    try {
        payload = verify(bearer, process.env.ACCESS_TOKEN_SECRET!) as any;
    } catch (err) {
        return false;
    }
    if (!payload) {
        return false;
    }
    
    const user = await User.findOne({ where: {id: payload.userId} });

    if (!user) {
        return false;
    }
    console.log(`[server] ${bearer} is valid.`);
    return {user};
}