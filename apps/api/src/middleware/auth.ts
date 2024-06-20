import { NextFunction, Request, Response } from "express";

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{

    const {myCookie}=req.cookies;
    // console.log(myCookie);
    if(!myCookie){
        return res.status(201).json({
            message: "No cookies found"
        });
    }
    next();
}