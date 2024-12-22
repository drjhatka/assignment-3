"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    isPublished: { type: Boolean, default: true }, // Default is true
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
const Blog = (0, mongoose_1.model)('Blog', blogPostSchema);
exports.default = Blog;
