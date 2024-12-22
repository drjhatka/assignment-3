import { AppError } from "../../error/app.error";
import { TUser } from "../users/user.interface";
import { TLoginUser } from "./auth.login";
import httpStatus from 'http-status';
import { config } from '../../config/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../users/user.model";
import Blog from "../blogs/blog.model";
import { sendResponse } from "../../utils/sendResponse";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/sendErrorResponse";

export type JWTTokenPayload = {
    email: string
    role: string,
}

export const checkLoginCredentials = async (res: Response, user: TUser, payload: TLoginUser) => {
    //if user doesn't exist
    if (!user) {
        sendErrorResponse(res, { success: false, statusCode: httpStatus.UNAUTHORIZED, message: "User doesn't exist", error: {}, stack: '' })
        return
    }
    console.log(user)
    //if the user is deleted
    if (user.isDeleted) {
        sendErrorResponse(res, { success: false, statusCode: httpStatus.UNAUTHORIZED, message: "User is Deleted", error: {}, stack: '' })
        return
    }
    //if the user is blocked
    console.log(user)
    if (user.status === 'blocked') {
        sendErrorResponse(res, { success: false, statusCode: httpStatus.UNAUTHORIZED, message: "User is Blocked", error: {}, stack: '' })
        return
    }

    //match provided password with that of the database
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        sendResponse(res, { success: false, statusCode: httpStatus.OK, message: "Password doesn't match", data: {} })
        return
    }
}

export const createJWTToken = async (jwtPayload: JWTTokenPayload, config: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, config, { expiresIn: expiresIn })
}

export const sanitizePostUserData = async (userId: string, fields: string[]) => {
    //find the user by id
    const user = await User.findById(userId).select(fields)
    return user;
}
export const sanitizePostBlogData = async (userId: string, fields: string[]) => {
    //find the user by id
    const user = await Blog.findById(userId).select(fields).populate('author')
    return user;
}