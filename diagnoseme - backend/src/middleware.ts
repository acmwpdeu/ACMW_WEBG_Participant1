import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
export function Middleware(req: Request,res: Response, next: NextFunction){
    const token = req.headers.authorization;
    if(!token){
        return {
            message: "token not provided"
        }
    }
    //@ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.headers['email'] = decoded as unknown as string;
    next();
}