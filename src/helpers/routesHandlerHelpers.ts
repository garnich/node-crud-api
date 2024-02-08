import { httpMethods, MESSGES } from '../constants';
import DBStorage from '../db_storage/storage';
import { IUser } from '../types';
import { getResponse } from './responseHelper';

export const routesHandler = async (req:any, res: any): Promise<void> => {
    try {
        const generatedUrl = new URL('http://' + req.headers.host + req.url);
        const path = generatedUrl.pathname;

        if (path === '/api/users' && req.method === httpMethods.GET) {
            const users = await DBStorage.getUsers().then((users: IUser[]) => users);

            getResponse(res, 200, users);
        } else {
            getResponse(res, 404, MESSGES.ERROR_404);
          }
    } catch (error) {
        error && getResponse(res, 500, MESSGES.ERROR_500);
    }
}