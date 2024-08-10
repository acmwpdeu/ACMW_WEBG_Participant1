import express from 'express';
import jwt from 'jsonwebtoken';
import { loginTypes, signupTypes } from './types';
import {User, Chat} from './schema';

export const chatRouter = express();

chatRouter.post("/send", async(req,res) => {
    const message = req.body;
    
})
