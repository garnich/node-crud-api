import { v4 as uuidv4 } from 'uuid';

export interface INewUser {
    username: string;
    age: number;
    hobbies: string[];
}

export interface IUser extends INewUser {
    id: string | typeof uuidv4;
}

export interface IUpdatedUser {
    username?: string;
    age?: number;
    hobbies?: string[];
}
