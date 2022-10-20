import { User } from "./entity/User";

interface UserData {
    hash: string,
    name: string,
    email: string,
    username: string,
}

export async function userLogin(data: UserData) {
    const findUser = await User.findOne({ where: { usersHash: data.hash } });
    if (findUser) {
        return findUser;
    }
    try {
        await User.insert({
            usersEmail: data.email,
            usersHash: data.hash,
            usersName: data.username,
            usersRName: data.name
        });
    } catch (err) {
        return false;
    }
    return await User.findOne({ where: { usersHash: data.hash } });
}