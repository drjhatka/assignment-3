import express from 'express';
import { AuthController } from './auth.controller';
import { ValidateRequest } from '../../middleware/validate.request';
import { UserValidation } from '../users/user.validation';
import { AuthValidation } from './auth.validation';
const router = express.Router()

router.post('/register', ValidateRequest(UserValidation.createUserValidationSchema), AuthController.createUser)
router.post('/login', ValidateRequest(AuthValidation.loginValidationSchema),AuthController.loginUser)

export const AuthRoutes =router;