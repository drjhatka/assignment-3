import  express  from 'express';
import { BlogController } from './blog.controller';
import { ValidateRequest } from '../../middleware/validate.request';
import BlogValidationSchema from './blog.validation';
const router = express.Router()

router.post('/',ValidateRequest(BlogValidationSchema), BlogController.createBlog )
router.get('/', BlogController.getAllBlogs )
router.get('/:id', BlogController.getSingleBlog )
router.patch('/:id', BlogController.updateBlog )
router.delete('/:id', BlogController.deleteBlog )


export const BlogRoutes =router;