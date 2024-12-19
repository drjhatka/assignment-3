import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { config } from "../config";
import { AppError } from "../error/app.error";
import httpStatus from 'http-status';

export const auth =()=>{
    return catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
        //check if the token exists
        const accessToken = req.headers.authorization;
        if(!accessToken){ throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")}

        //retrieve auth token from the request header and verify 
        const decodedToken = jwt.verify(req.headers.authorization as string,config.jwt_secret as string)
        
        if(decodedToken){
            console.log(decodedToken)
        }
        next()
    })
}