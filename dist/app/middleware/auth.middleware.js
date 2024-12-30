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
exports.auth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const app_error_1 = require("../error/app.error");
const statuses_1 = __importDefault(require("statuses"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //check if the token is sent from the client
        if (!req.headers.authorization) {
            throw new app_error_1.AppError((0, statuses_1.default)('unauthorized'), "You are not authorized");
        }
        const accessToken = req.headers.authorization.split(' ')[1];
        //retrieve auth token from the request header and verify
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, config_1.config.jwt_secret, (err, decoded) => {
            if (err) {
                throw new app_error_1.AppError((0, statuses_1.default)('unauthorized'), 'Invalid Token');
            }
            const role = decoded.role;
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new app_error_1.AppError((0, statuses_1.default)('unauthorized'), 'Unauthorized', '');
            }
            req.user = decoded;
            //all clear... proceed to next phase
            next();
        });
    }));
};
exports.auth = auth;
