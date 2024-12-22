"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema for a blog post
const createBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(10, 'Title is required'), // String and required
    content: zod_1.z.string().min(10, 'Content is required'), // String and required
    author: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format').optional(), // MongoDB ObjectId validation
    isPublished: zod_1.z.boolean().optional().default(true),
});
const updateBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(10, 'Title is required').optional(), // String and required
    content: zod_1.z.string().min(10, 'Content is required').optional(), // String and required
    author: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format').optional(), // MongoDB ObjectId validation
    isPublished: zod_1.z.boolean().optional().default(true),
});
// Export for reuse
exports.BlogValidation = { createBlogValidationSchema, updateBlogValidationSchema };
