import express from "express";
import user from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config";
import { authMiddleware } from "./middleware/auth";

const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use('/user',user)

app.get('/clear-cookie',(req,res)=>{
    try{
        res.clearCookie('myCookie',{httpOnly:true});
        res.status(200).json({
            message:"cookie removed sucessfully"
        })
    }catch(error){
        res.status(504).json({
            messaage:"Internal serever error"
        })
    }
})

app.post('/game',authMiddleware,(req,res)=>{
    return res.status(200).json({
        message:"user authenticated"
    })
})


app.listen(PORT || 3000 ,()=>{
    console.log(`app is listening on port ${PORT}`)
})