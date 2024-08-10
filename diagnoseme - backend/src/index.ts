import express from 'express'
import { userRouter } from './userRouter';
import mongoose from 'mongoose';
 
const app = express();
app.use(express.json());
app.use("/signup", userRouter);


app.listen(3000, () => {
    console.log('listening');
})