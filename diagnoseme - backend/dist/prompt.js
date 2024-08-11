"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groq = void 0;
const Groq = require('groq-sdk');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.API_KEY;
exports.groq = new Groq({ apiKey: key });
