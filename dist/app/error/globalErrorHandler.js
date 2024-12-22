"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const sendErrorResponse_1 = require("../utils/sendErrorResponse");
const statuses_1 = __importDefault(require("statuses"));
const GlobalErrorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        (0, sendErrorResponse_1.sendErrorResponse)(res, { statusCode: (0, statuses_1.default)('bad request'), message: err.name, error: err.issues, success: false, stack: err.stack });
    }
    else if (err instanceof mongoose_1.MongooseError) {
        if (err.name === "CastError") {
            res.json({ success: false, message: 'Check Request Parameter', error: err.name });
            return;
        }
        res.status(404).json({
            success: false,
            message: err.message || 'Something went wrong!',
            error: err
        });
        return;
    }
    else {
        res.status(404).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err
        });
        return;
    }
};
exports.GlobalErrorHandler = GlobalErrorHandler;
