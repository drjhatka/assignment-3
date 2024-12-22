"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validate_request_1 = require("../../middleware/validate.request");
const user_validation_1 = require("../users/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validate_request_1.ValidateRequest)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.AuthController.createUser);
router.post('/login', (0, validate_request_1.ValidateRequest)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
