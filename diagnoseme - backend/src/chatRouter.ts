import express from 'express';
import jwt from 'jsonwebtoken';
import { loginTypes, signupTypes } from './types';
import {User, Chat} from './schema';
import { groq } from './prompt';
import { Middleware } from './middleware';

export const chatRouter = express();

chatRouter.post("/newchat", Middleware, async (req,res) => {
  const email = req.headers['email'];
  const user = await User.findOne({email: email});

  const newChat = new Chat({sender: user?._id});
  await newChat.save();
  
  user?.chats.push(newChat._id);
  await user?.save();
  
  return res.status(200).json({
    id: newChat._id
  }) 
});


chatRouter.post("/send", Middleware, async(req,res) => {
    const {message} = req.body;
    const chatId = req.query.id;

    const chat = await Chat.findById({_id: chatId});
    console.log(chat?.messages);
    
    chat?.messages.push({
    "role": "user",
    "content": message as string
  });

    const chatCompletion = await groq.chat.completions.create({
        "messages": chat?.messages,
        "model": "llama3-70b-8192",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
      });
      
      var ans = [];
      for await (const chunk of chatCompletion) {
       ans.push(chunk.choices[0]?.delta?.content || ''); 
      }
      var readableAns = ans.join("");
      chat?.messages.push({
        "role": "assistant",
        content: readableAns
    });
    console.log(readableAns);

    await chat?.save();

    return res.status(200).json({
      messge: "done"
    })
})


