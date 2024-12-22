import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "../users/user.service"
import httpStatus from 'http-status';

import { AuthService } from "./auth.service";
import { checkLoginCredentials, sanitizePostUserData } from "./auth.utils";
import { TUser } from "../users/user.interface";
import { ObjectId } from "mongoose";
import { User } from "../users/user.model";
const createUser = catchAsync(async (req, res) => {
    //data has come clean... now transfer to service
    const user = await UserService.createUserIntoDB(req.body) 
    const returnUser = await sanitizePostUserData(user._id.toString() , ['-password','-status', '-isDeleted','-role','-createdAt','-updatedAt'])
    //user created. send success response
    sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: `${user.role} Registered Successfully!`, data: returnUser })
})

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        sendResponse(res, { success: false, statusCode: httpStatus.BAD_REQUEST, message: "email and password required", data: {} })
        return
    }
        // Check if the user exists
        const user = await User.findOne({ email:req.body.email }).select(['password','email', 'role', 'status', 'isDeleted'] );
        //check if the user exists, password match, status is active and user is not deleted
        checkLoginCredentials(res, user as TUser, req.body );

    const result = await AuthService.loginUser(req.body)
    sendResponse(res, {success:true, statusCode:httpStatus.OK, message:"Login Success",data:{token:result}})
})
export const AuthController = {
    createUser,
    loginUser
}