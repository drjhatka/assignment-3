import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { TUser } from "../users/user.interface";
import { UserService } from "../users/user.service"
import httpStatus from 'http-status';

const createUser = catchAsync(async(req, res)=>{
    //data has come clean... now transfer to service
    const user = await UserService.createUserIntoDB(req.body)
    user.password=''
    //user created. send success response
    sendResponse(res,{success:true, statusCode:httpStatus.CREATED, message:`${user.role} Registered Successfully!`, data:user})
})

const loginUser = catchAsync(async (req, res)=>{

})
export const AuthController = {
    createUser,
    loginUser
}