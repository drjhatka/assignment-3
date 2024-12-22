"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    return res.json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data
    });
};
exports.sendResponse = sendResponse;
