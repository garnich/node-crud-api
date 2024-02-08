import { IUser } from "../types";

class DBStorage {
    /**
     * users: IUsers[]
     */
    public users: IUser[];

    constructor() {
        this.users = [];
    }

    async getUsers(): Promise<IUser[]> {
        return this.users;
    }

}

export default new DBStorage();