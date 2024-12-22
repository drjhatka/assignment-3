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
exports.sanitizePostBlogData = exports.sanitizePostUserData = exports.createJWTToken = exports.checkLoginCredentials = void 0;
const statuses_1 = __importDefault(require("statuses"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const blog_model_1 = __importDefault(require("../blogs/blog.model"));
const sendResponse_1 = require("../../utils/sendResponse");
const sendErrorResponse_1 = require("../../utils/sendErrorResponse");
const checkLoginCredentials = (res, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if user doesn't exist
    if (!user) {
        (0, sendErrorResponse_1.sendErrorResponse)(res, { success: false, statusCode: (0, statuses_1.default)('unauthorized'), message: "User doesn't exist", error: {}, stack: '' });
        return;
    }
    //if the user is deleted
    if (user.isDeleted) {
        (0, sendErrorResponse_1.sendErrorResponse)(res, { success: false, statusCode: (0, statuses_1.default)('unauthorized'), message: "User is Deleted!!!", error: {}, stack: '' });
    }
    //if the user is blocked
    console.log(user);
    if (user.status === 'blocked') {
        (0, sendErrorResponse_1.sendErrorResponse)(res, { success: false, statusCode: (0, statuses_1.default)('unauthorized'), message: "User is Blocked", error: {}, stack: '' });
        return;
    }
    //match provided password with that of the database
    const isMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isMatch) {
        (0, sendResponse_1.sendResponse)(res, { success: false, statusCode: (0, statuses_1.default)('ok'), message: "Password doesn't match", data: {} });
        return;
    }
});
exports.checkLoginCredentials = checkLoginCredentials;
const createJWTToken = (jwtPayload, config, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(jwtPayload, config, { expiresIn: expiresIn });
});
exports.createJWTToken = createJWTToken;
const sanitizePostUserData = (userId, fields) => __awaiter(void 0, void 0, void 0, function* () {
    //find the user by id
    const user = yield user_model_1.User.findById(userId).select(fields);
    return user;
});
exports.sanitizePostUserData = sanitizePostUserData;
const sanitizePostBlogData = (userId, fields) => __awaiter(void 0, void 0, void 0, function* () {
    //find the user by id
    const user = yield blog_model_1.default.findById(userId).select(fields).populate('author');
    return user;
});
exports.sanitizePostBlogData = sanitizePostBlogData;
