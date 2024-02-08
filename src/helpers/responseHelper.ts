import { HEADER_TYPE } from "../constants";
import { IUser } from "../types";

const getResponse = (response: any, status: number, data: IUser | IUser[] | string) => {
    response.writeHead(status, HEADER_TYPE.JSON);
    response.write(JSON.stringify(data));
    response.end();
}

export { getResponse };
