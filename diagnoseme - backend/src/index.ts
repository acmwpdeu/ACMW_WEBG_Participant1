import express from 'express'
import { userRouter } from './userRouter';
 
const app = express();

app.use("/login", userRouter);

app.listen(3000, () => {
    console.log('listening');
})