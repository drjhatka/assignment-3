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
exports.AuthController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("../users/user.service");
const auth_service_1 = require("./auth.service");
const auth_utils_1 = require("./auth.utils");
const user_model_1 = require("../users/user.model");
const statuses_1 = __importDefault(require("statuses"));
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //data has come clean... now transfer to service
    const user = yield user_service_1.UserService.createUserIntoDB(req.body);
    const returnUser = yield (0, auth_utils_1.sanitizePostUserData)(user._id.toString(), ['-password', '-status', '-isDeleted', '-role', '-createdAt', '-updatedAt']);
    //user created. send success response
    (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('created'), message: `${user.role} Registered Successfully!`, data: returnUser });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
        (0, sendResponse_1.sendResponse)(res, { success: false, statusCode: (0, statuses_1.default)('bad request'), message: "email and password required", data: {} });
        return;
    }
    // Check if the user exists
    const user = yield user_model_1.User.findOne({ email: req.body.email }).select(['password', 'email', 'role', 'status', 'isDeleted']);
    //check if the user exists, password match, status is active and user is not deleted
    (0, auth_utils_1.checkLoginCredentials)(res, user, req.body);
    const result = yield auth_service_1.AuthService.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
    });
    (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "Login Success", data: { token: accessToken } });
}));
const refreshToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    console.log('cookie  ', req.cookies);
    console.log("RT ", refreshToken);
    console.log('user ', req.user);
    const user = yield user_model_1.User.findOne({ email: req.user.email }).select(['password', 'email', 'role', 'status', 'isDeleted']);
    (0, auth_utils_1.checkRefreshTokenCredentials)(user);
    //const result = await AuthService.refreshToken(refreshToken)
    //res.send({validate:result})
}));
exports.AuthController = {
    createUser,
    loginUser,
    refreshToken
};
