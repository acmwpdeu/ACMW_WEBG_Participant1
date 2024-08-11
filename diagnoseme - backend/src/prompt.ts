const Groq = require('groq-sdk');
import dotenv from 'dotenv';
dotenv.config()

const key = process.env.API_KEY;
export const groq = new Groq({apiKey: key});
