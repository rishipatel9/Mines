import express from 'express';
import createUser from '../Controller/createUser';
import { getBalance } from '../Controller/getBalance';
import { updateBalance } from '../Controller/updateBalance';
import { updatePayout } from '../Controller/updatePayout';
import { authMiddleware } from '../middleware/auth';

const user=express();

user.post('/createuser',(req,res)=>{
    createUser(req,res);
})

user.post('/get-balance',authMiddleware,(req,res)=>{
    getBalance(req,res);
})

user.post('/update-balance',authMiddleware,(req,res)=>{
    updateBalance(req,res);
})

user.post('/update-payout',authMiddleware,(req,res)=>{
    updatePayout(req,res);
})
export default user 