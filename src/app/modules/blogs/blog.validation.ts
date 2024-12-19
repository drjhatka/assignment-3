import { z } from 'zod';

// Define the Zod schema for a blog post
const BlogValidationSchema = z.object({
  title: z.string().min(10, 'Title is required'), // String and required
  content: z.string().min(10, 'Content is required'), // String and required
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'), // MongoDB ObjectId validation
  isPublished: z.boolean().optional().default(true), 
});

// Export for reuse
export default BlogValidationSchema;