import express from 'express';
import jwt from 'jsonwebtoken';
import { signupTypes } from './types';
import {User} from './schema';
import mongoose from 'mongoose';

export const userRouter = express();

//add encryption to password

userRouter.post("/", async(req,res) => {
    
    await mongoose.connect("mongodb+srv://harwanidev:pwdispwd@cluster0.1xhcqfs.mongodb.net/DiagnoseMe")
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const parsedInput = signupTypes.safeParse({firstName, lastName, email, password});

    if(!parsedInput.success){
        var issues: string[] = [];
        parsedInput.error.issues.map((issue) => {
            issues.push(issue.message);
        })
        return res.status(404).json({
            message: issues
        });
    }
    
    const user = await User.findOne({email});
    if(user){
        return res.status(405).json({
            message: "This email is already registered with us"
        });
    }

    const newUser = new User({firstName: parsedInput.data.firstName, lastName: parsedInput.data.lastName, email: parsedInput.data.email, password: parsedInput.data.password});
    await newUser.save();
    
    return res.status(200).json({
        message: "new user registered successfully",
        token: jwt.sign(email, "SecretKey")
    })    
})


