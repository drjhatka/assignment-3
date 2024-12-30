"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join('./' + '.env') });
exports.config = {
    database_url: process.env.DB_URL,
    default_password: process.env.DEFAULT_PASSWORD,
    port: process.env.DB_PORT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_refresh: process.env.JWT_REFRESH_SECRET
};
