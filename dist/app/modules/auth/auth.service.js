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
exports.AuthService = void 0;
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const createUserIntoDB = () => {
};
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select(['password', 'email', 'role']);
    //all good, now proceed to issuing a jwt token to the user
    const accessToken = yield (0, auth_utils_1.createJWTAccessToken)({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, config_1.config.jwt_secret, '15m');
    const refreshToken = yield (0, auth_utils_1.createJWTRefreshToken)({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, config_1.config.jwt_refresh, '30d');
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_refresh);
    const { email, role } = decoded;
    console.log('decoded', decoded);
    const user = yield user_model_1.User.findOne({ email: email });
    //const validate = await checkRefreshTokenCredentials(user, { email, role })
    //return validate
});
exports.AuthService = {
    createUserIntoDB,
    loginUser,
    refreshToken
};
