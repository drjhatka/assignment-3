import  express  from 'express';
import { BlogController } from './blog.controller';
import { ValidateRequest } from '../../middleware/validate.request';
import { auth } from '../../middleware/auth.middleware';
import { BlogValidation } from './blog.validation';
const router = express.Router()

router.post('/',auth(),ValidateRequest(BlogValidation.createBlogValidationSchema), BlogController.createBlog )
router.get('/', BlogController.getAllBlogs )
router.get('/:id', BlogController.getSingleBlog )
router.patch('/:id',auth(), ValidateRequest(BlogValidation.updateBlogValidationSchema), BlogController.updateBlog )
router.delete('/:id', BlogController.deleteBlog )


export const BlogRoutes =router;