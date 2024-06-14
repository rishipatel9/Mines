import { Request, Response } from "express";


const createUser=(req:Request,res:Response)=>{
    const name=req.body.username;
    console.log(req.body)
    if(!name){
        res.status(403).json({
            message:"name not recived"
        })
    };
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res.cookie('myCookie', name, { expires: expirationDate, httpOnly: true });
    return res.send({
        message:"user created sucessfully"
    }).status(200);

}
export default createUser;