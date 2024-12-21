import express from 'express';
import { AdminController} from './admin.controller';
import { auth } from '../../middleware/auth.middleware';

const router = express.Router()

router.patch('/users/:userId/block',auth(), AdminController.blockUser)
router.delete('/blogs/:id',auth(), AdminController.deleteBlog)

export const AdminRoutes =router;