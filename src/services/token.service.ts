import jwt from 'jsonwebtoken';
import { UserData } from '../types/user-data';
import { Request } from 'express';
export default class TokenService {

    static getTokenFromAuthHeader(req: Request): string | undefined {
        const authorization = req.headers['authorization'];
        const tokenFromHeader = authorization?.split(' ').pop();
        const tokenFromCookies = req.cookies?.token;
    
        // Use ternary operator to return token from header or cookies
        return tokenFromHeader ?? tokenFromCookies;
    }

    static generateToken(user:UserData) {
        const tokenPayload = {
            email: user.email,
            id: user.id
          };
        const token = jwt.sign(tokenPayload, process.env.JWT_KEY as string, {
            issuer: "iTaxEasy",
            expiresIn: "24h"
        });

        return token;
    }

    static decodeToken(token: string) {
        const result: UserData = jwt.decode(token) as UserData;

        return result;
    }

    static verifyToken(token: string) {
        const verified = jwt.verify(token, process.env.JWT_KEY as string);

        return verified;
    }

}