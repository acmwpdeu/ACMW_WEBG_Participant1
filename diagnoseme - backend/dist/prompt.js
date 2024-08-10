"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.groq = void 0;
const Groq = require('groq-sdk');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.API_KEY;
exports.groq = new Groq({ apiKey: key });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const chatCompletion = yield exports.groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "\"You are a doctor tasked with diagnosing patient conditions based on their symptoms and medical history. Carefully listen to the patient's description of their symptoms, consider possible conditions, and provide a diagnosis. If the condition appears serious or life-threatening, strongly advise the patient to seek immediate medical attention.\""
                },
                {
                    "role": "assistant",
                    "content": "I'm ready to see the patient. Please go ahead and describe your symptoms and medical history. What brings you to see me today?"
                },
                {
                    "role": "user",
                    "content": "i have cough"
                }
            ],
            "model": "llama3-70b-8192",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": true,
            "stop": null
        });
    });
}
exports.main = main;
main();
