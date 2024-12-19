import { error } from "console";
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { TUser } from "../users/user.interface";
import { UserService } from "../users/user.service"
import httpStatus from 'http-status';
import { User } from "../users/user.model";
import bcrypt from 'bcrypt';
import { config } from "../../config";
import jwt from 'jsonwebtoken'
const createUser = catchAsync(async (req, res) => {
    //data has come clean... now transfer to service
    const user = await UserService.createUserIntoDB(req.body)
    user.password = ''
    //user created. send success response
    sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: `${user.role} Registered Successfully!`, data: user })
})

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        sendResponse(res, { success: false, statusCode: httpStatus.BAD_REQUEST, message: "email and password required", data: {} })
        return
    }
    // Check if the user exists
    const user = await User.findOne({ email }).select('password');
    if (!user) {
        sendResponse(res, { success: false, statusCode: httpStatus.NOT_FOUND, message: 'User not found', data: {} })
        return
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        sendResponse(res, { success: false, statusCode: httpStatus.UNAUTHORIZED, message: "'Invalid password'", data: {} })
        return
    }
    
      // Generate JWT token
    const token = jwt.sign(
        {  email: user.email },
        config.jwt_secret as string, 
        { expiresIn: '10h' } // token expires in 1 hour
    );
    sendResponse(res, {success:true, statusCode:httpStatus.OK, message:"Login Success",data:token})
})
export const AuthController = {
    createUser,
    loginUser
}