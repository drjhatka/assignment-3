"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = void 0;
const sendErrorResponse = (res, data) => {
    res.send({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        error: data,
        stack: data.stack || ''
    });
};
exports.sendErrorResponse = sendErrorResponse;
