import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from 'http-status';


const createUser=catchAsync((req, res, next)=>{
    const user = UserService.createUserIntoDB(req.body)
    sendResponse(res, {success:true, statusCode:httpStatus.CREATED, data:user})
})

export const UserController = {
    createUser,
}