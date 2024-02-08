import { log } from 'console';
import { isNewUserDataValid } from '../helpers/dataHelpers';
import { IUser, INewUser, IUpdatedUser } from '../types';
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
      ...userData,
    };

    this.users.push(newUser);

    return newUser;
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async updateUser(id: string, { username, age, hobbies  }: IUpdatedUser): Promise<IUser | undefined | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx < 0) {
      return undefined;
    }

    const oldUser = this.users[idx];
    const newUser = {
      id,
      username: username || oldUser.username,
      age: age || oldUser.age,
      hobbies: hobbies || oldUser.hobbies,
    };
    
    const isValidData = isNewUserDataValid(newUser);

    if (!isValidData) {
      return null;
    }

    this.users[idx] = newUser;

    return newUser;
  }
}

export default new DBStorage();
