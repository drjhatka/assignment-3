"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email("Valid Email Required"),
    password: zod_1.z.string(),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Valid Email Required").optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(['admin', 'user']).optional()
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
};
