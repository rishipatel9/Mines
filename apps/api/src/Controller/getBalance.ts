
import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getBalance= async (req:Request,res:Response,)=>{
    const {myCookie}=req.cookies;
    console.log(myCookie);
    if(!myCookie) return res.status(401).json({message:"user unauthorized"})
    try{
        const user = await prisma.user.findFirst({
            where: { name: myCookie},
            select: { cash: true },
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ balance: user.cash });

    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}