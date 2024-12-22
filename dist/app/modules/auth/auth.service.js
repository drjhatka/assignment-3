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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = require("../../config");
const createUserIntoDB = () => {
};
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select(['password', 'email', 'role']);
    //check if the user exists, password match, status is active and user is not deleted
    //checkLoginCredentials(res, user as TUser, payload);
    //all good, now proceed to issuing a jwt token to the user
    const accessToken = yield (0, auth_utils_1.createJWTToken)({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, config_1.config.jwt_secret, '1h');
    return accessToken;
});
exports.AuthService = {
    createUserIntoDB,
    loginUser
};
