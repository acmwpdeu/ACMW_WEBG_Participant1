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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const prompt_1 = require("./prompt");
exports.chatRouter = (0, express_1.default)();
const boilerplate = [{
        "role": "system",
        "content": "\"You are a doctor tasked with diagnosing patient conditions based on their symptoms and medical history. Carefully listen to the patient's description of their symptoms, consider possible conditions, and provide a diagnosis. If the condition appears serious or life-threatening, strongly advise the patient to seek immediate medical attention.\""
    },
    {
        "role": "assistant",
        "content": "I'm ready to see the patient. Please go ahead and describe your symptoms and medical history. What brings you to see me today?"
    }];
const chat = boilerplate;
exports.chatRouter.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e, _f, _g;
    const { message } = req.body;
    chat.push({
        "role": "user",
        "content": message
    });
    const chatCompletion = yield prompt_1.groq.chat.completions.create({
        "messages": chat,
        "model": "llama3-70b-8192",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });
    var ans = [];
    try {
        for (var _h = true, chatCompletion_1 = __asyncValues(chatCompletion), chatCompletion_1_1; chatCompletion_1_1 = yield chatCompletion_1.next(), _a = chatCompletion_1_1.done, !_a; _h = true) {
            _c = chatCompletion_1_1.value;
            _h = false;
            const chunk = _c;
            ans.push(((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || '');
            chat.push({
                "role": "assistant",
                content: ((_g = (_f = chunk.choices[0]) === null || _f === void 0 ? void 0 : _f.delta) === null || _g === void 0 ? void 0 : _g.content) || ''
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_h && !_a && (_b = chatCompletion_1.return)) yield _b.call(chatCompletion_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log(ans.join(","));
    //   console.log(chat);
    //   return res.status(200).json({
    //     message: chatCompletion.choices[0]?.delta?.content || ''
    //   })
}));
