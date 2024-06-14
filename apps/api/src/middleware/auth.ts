import { NextFunction, Request, Response } from "express";

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    // console.log(Object.values(req.cookies))
    if (Object.keys(req.cookies).length === 0) {
        return res.status(201).json({
            message: "No cookies found"
        });
    }
    next();
}