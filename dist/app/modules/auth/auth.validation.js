"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    email: zod_1.default.string({ required_error: "email is required" }).email('Valid Email type required'),
    password: zod_1.default.string({ required_error: "password is required" })
});
const refreshTokenValidationSchema = zod_1.default.object({
    refreshToken: zod_1.default.string({
        required_error: "Refresh Token is required"
    })
});
exports.AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema
};
