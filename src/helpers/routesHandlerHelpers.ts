import { httpMethods, MESSGES } from '../constants';
import DBStorage from '../db_storage/storage';
import { INewUser, IUser } from '../types';
import { isNewUserDataValid } from './dataHelpers';
import { getResponse } from './responseHelper';
import { validate as isValidUuid } from 'uuid';

export const routesHandler = async (req:any, res: any): Promise<void> => {
    try {
        const generatedUrl = new URL('http://' + req.headers.host + req.url);
        const path = generatedUrl.pathname;

        if (path === '/api/users' && req.method === httpMethods.GET) {
            const users = await DBStorage.getUsers().then((users: IUser[]) => users);

            getResponse(res, 200, users);
        } else if (path.startsWith('/api/users/') && req.method === httpMethods.GET) {
            const id: string = path.substring('/api/users/'.length);

            if (!id || !isValidUuid(id)) {
                getResponse(res, 400, MESSGES.ERROR_INVALID_ID);
                return
            }
           
            const user = await DBStorage.getUserById(id).then((user: IUser | undefined) => user);
        
            return user ? getResponse(res, 200, user) : getResponse(res, 404, `${MESSGES.ERROR_NOT_FOUND} ${id}`);
        } else if (path === '/api/users' && req.method === httpMethods.POST) {
            let data = '';
        
            req.on('data', (chunk: any) => {
              data += chunk.toString();
            });
            
            req.on('end', async () => {
              const params = JSON.parse(data);
              const isValidData = isNewUserDataValid(params);
    
              if (!isValidData){
                getResponse(res, 400, MESSGES.ERROR_400);
                return;
              }
    
                const userData: INewUser = {
                  username: params.username,
                  age: params.age,
                  hobbies: params.hobbies
                };
                

                const newUser = await DBStorage.addUser(userData).then((user: IUser) => user);

                getResponse(res, 201, newUser);
            })
        } else {
            getResponse(res, 404, MESSGES.ERROR_404);
          }
    } catch (error) {
        error && getResponse(res, 500, MESSGES.ERROR_500);
    }
}