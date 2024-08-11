"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Middleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return {
            message: "token not provided"
        };
    }
    //@ts-ignore
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.headers['email'] = decoded;
    next();
}
exports.Middleware = Middleware;
