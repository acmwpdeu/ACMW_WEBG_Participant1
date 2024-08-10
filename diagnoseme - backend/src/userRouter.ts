import express from 'express';
import jwt from 'jsonwebtoken';
import { signupTypes } from './types';
import {User} from './schema';

export const userRouter = express();

//add encryption to password

userRouter.post("/signup", async(req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
    const parsedInput = signupTypes.safeParse({firstName, lastName, email, password});

    if(!parsedInput.success){
        return res.status(200).json({
            message: parsedInput.error
        });
    }
    
    const user = await User.findOne({email});
    if(user){
        return res.status(200).json({
            message: "This email is already registered with us"
        });
    }

    const newUser = new User({firstName: parsedInput.data.firstName, lastName: parsedInput.data.lastName, email: parsedInput.data.email, password: parsedInput.data.password});
    await newUser.save();
    const token = jwt.sign(email, "SecretKey")
    return res.status(200).json({
        message: "new user registered successfully"
    })
    } catch (error) {
      return res.status(200).json({
        message: error
      })  
    }
    
})
