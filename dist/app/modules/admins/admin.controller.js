"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const blog_utils_1 = require("../blogs/blog.utils");
const blog_model_1 = __importDefault(require("../blogs/blog.model"));
const user_model_1 = require("../users/user.model");
const blog_service_1 = require("../blogs/blog.service");
const sendResponse_1 = require("../../utils/sendResponse");
const config_1 = require("../../config");
const sendErrorResponse_1 = require("../../utils/sendErrorResponse");
const statuses_1 = __importDefault(require("statuses"));
const blockUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const userId = req.params.userId;
    const decoded = (0, blog_utils_1.retrieveUserCredentialsFromToken)(req.headers.authorization.split(' ')[1], config_1.config.jwt_secret);
    console.log(decoded);
    if (decoded.role == 'admin') {
        const result = yield user_model_1.User.findByIdAndUpdate(userId, { $set: { status: 'blocked' } });
        (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "User Blocked Successfully", data: result });
        return;
    }
    (0, sendErrorResponse_1.sendErrorResponse)(res, { success: false, message: 'Only Admin can block users!', statusCode: (0, statuses_1.default)('unauthorized'), error: {}, stack: '' });
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //admin can delete any blog but user can delete only their blog...
    const decoded = (0, blog_utils_1.retrieveUserCredentialsFromToken)(req.headers.authorization.split(' ')[1], config_1.config.jwt_secret);
    //find blog and match user
    const blogID = req.params.id;
    const blog = yield blog_model_1.default.findById(blogID);
    const user = yield user_model_1.User.findById(blog.author);
    if (decoded.role === 'user') {
        //check if the blog is authored by the current logged in user...
        if (blog.author._id.toString() === user._id.toString()) {
            const result = yield blog_service_1.BlogService.deleteBlog(blogID);
            (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "Blog Deleted", data: result });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, { success: false, statusCode: (0, statuses_1.default)('unauthorized'), message: "User cannot delete other User's blog", data: { blogID } });
        return;
    }
    else {
        const result = yield blog_service_1.BlogService.deleteBlog(blogID);
        (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "Blog Deleted", data: result });
        return;
    }
}));
exports.AdminController = {
    blockUser,
    deleteBlog
};
