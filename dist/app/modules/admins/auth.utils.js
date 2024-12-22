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
exports.createJWTToken = exports.checkLoginCredentials = void 0;
const app_error_1 = require("../../error/app.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statuses_1 = __importDefault(require("statuses"));
const checkLoginCredentials = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if user doesn't exist
    if (!user) {
        throw new app_error_1.AppError((0, statuses_1.default)('not found'), 'User Not Found!');
    }
    //if the user is deleted
    if (user.isDeleted) {
        throw new app_error_1.AppError((0, statuses_1.default)('ok'), `This ${user.role} is deleted`);
    }
    //if the user is blocked
    if (user.status === 'blocked') {
        throw new app_error_1.AppError((0, statuses_1.default)('forbidden'), `This ${user.role} is blocked`);
    }
    //match provided password with that of the database
    const isMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isMatch) {
        throw new app_error_1.AppError((0, statuses_1.default)('unauthorized'), "Password doesn't Match!!");
    }
});
exports.checkLoginCredentials = checkLoginCredentials;
const createJWTToken = (jwtPayload, config, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(jwtPayload, config, { expiresIn: expiresIn });
});
exports.createJWTToken = createJWTToken;
