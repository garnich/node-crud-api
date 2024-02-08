import { IUser, INewUser } from "../types";
import { v4 as uuidv4 } from 'uuid';

class DBStorage {
    public users: IUser[];

    constructor() {
        this.users = [];
    }

    async getUsers(): Promise<IUser[]> {
        return this.users;
    }

    async addUser(userData: INewUser): Promise<IUser> {
        const newUser: IUser = {
            id: uuidv4(),
            ...userData
        }

        this.users.push(newUser);

        return newUser;
    }

}

export default new DBStorage();