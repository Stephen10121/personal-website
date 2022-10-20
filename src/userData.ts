interface UserData {
    hash: string,
    name: string,
    email: string,
    username: string,
}

export async function userLogin(data: UserData) {
    console.log(data);
    return data;
}