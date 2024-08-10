"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTypes = exports.signupTypes = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupTypes = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    email: zod_1.default.string().email("Please enter a valid email"),
    password: zod_1.default.string().min(8, "Password should be minimum of 8 characters")
});
exports.loginTypes = zod_1.default.object({
    email: zod_1.default.string().email("Please enter a valid email"),
    password: zod_1.default.string()
});
