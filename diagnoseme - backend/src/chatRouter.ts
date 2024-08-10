import express from 'express';
import jwt from 'jsonwebtoken';
import { loginTypes, signupTypes } from './types';
import {User, Chat} from './schema';
import { groq } from './prompt';

export const chatRouter = express();

const boilerplate = [{
    "role": "system",
    "content": "\"You are a doctor tasked with diagnosing patient conditions based on their symptoms and medical history. Carefully listen to the patient's description of their symptoms, consider possible conditions, and provide a diagnosis. If the condition appears serious or life-threatening, strongly advise the patient to seek immediate medical attention.\""
  },
  {
    "role": "assistant",
    "content": "I'm ready to see the patient. Please go ahead and describe your symptoms and medical history. What brings you to see me today?"
  }]

  const chat = boilerplate;
chatRouter.post("/send", async(req,res) => {
    const {message} = req.body;      
    chat.push({
        "role": "user",
        "content": message as string
    });

    const chatCompletion = await groq.chat.completions.create({
        "messages": chat,
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
        chat.push({
            "role": "assistant",
            content: chunk.choices[0]?.delta?.content || ''
        });
      }
      console.log(ans.join(","));
    //   console.log(chat);
      
    //   return res.status(200).json({
    //     message: chatCompletion.choices[0]?.delta?.content || ''
    //   })
})
