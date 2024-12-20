import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "../users/user.service"
import httpStatus from 'http-status';

import { AuthService } from "./auth.service";
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
    const result = await AuthService.loginUser(req.body)
    sendResponse(res, {success:true, statusCode:httpStatus.OK, message:"Login Success",data:result})
})
export const AuthController = {
    createUser,
    loginUser
}