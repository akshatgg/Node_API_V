import { NextFunction, Request, Response } from "express";
import TokenService from "../services/token.service";
import { UserType } from "@prisma/client";

export default function adminCheck(req: Request, res: Response, next: NextFunction) {
    if(req.isAdmin) {
        return res.status(401).send({ success: false, message: 'Unauthorized Access. You must be an admin to perform this operation.' });
    }

    next();
}