"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const statuses_1 = __importDefault(require("statuses"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => {
    const user = user_service_1.UserService.createUserIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('created'), data: user });
});
exports.UserController = {
    createUser,
};
