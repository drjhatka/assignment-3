
import { Request, Response, NextFunction } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";
import { sendResponse } from "../utils/sendResponse";
import status from "http-status";
import { sendErrorResponse } from "../utils/sendErrorResponse";



export const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        sendErrorResponse(res, {statusCode: status.BAD_REQUEST , message:err.name, error:err.issues,success:false, stack:err.stack as string })
    }
    else if (err instanceof MongooseError) {
        if (err.name === "CastError") {
            res.json({ success: false, message: 'Check Request Parameter', error: err.name })
        }
        res.status(404).json({
            success: false,
            message: err.message || 'Something went wrong!',
            error: err
        })
    }
    else{
        res.status(404).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err
        })
    }
}