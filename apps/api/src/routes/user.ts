import express from 'express';
import createUser from '../Controller/createUser';

const user=express();

user.post('/createuser',(req,res)=>{
    createUser(req,res);
})

user.get('/name',(req,res)=>{
    
})


export default user 