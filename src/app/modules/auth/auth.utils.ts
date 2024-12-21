import { AppError } from "../../error/app.error";
import { TUser } from "../users/user.interface";
import { TLoginUser } from "./auth.login";
import httpStatus from 'http-status';
import { config } from '../../config/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../users/user.model";
import { ObjectId } from "mongoose";
import { TBlog } from "../blogs/blog.interface";
import Blog from "../blogs/blog.model";

export type JWTTokenPayload = {
    email:string
    role:string,
}

export const checkLoginCredentials = async (user: TUser, payload: TLoginUser) => {
    //if user doesn't exist
    if (!user) {throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!')}
    //if the user is deleted
    if(user.isDeleted){throw new AppError(httpStatus.FORBIDDEN, `This ${user.role} is deleted`)}
    //if the user is blocked
    if(user.status==='blocked'){throw new AppError(httpStatus.FORBIDDEN, `This ${user.role} is blocked`)}

    //match provided password with that of the database
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED,"Password doesn't Match!!")
    }
}

export const createJWTToken = async (jwtPayload:JWTTokenPayload, config:string, expiresIn:string)=>{
    return jwt.sign(jwtPayload, config, {expiresIn:expiresIn} )
}

export const sanitizePostUserData=async (userId:string,fields:string[])=>{
    //find the user by id
    const user = await User.findById(userId).select(fields)
    return user;
}
export const sanitizePostBlogData=async (userId:string,fields:string[])=>{
    //find the user by id
    const user = await Blog.findById(userId).select(fields).populate('author')
    return user;
}