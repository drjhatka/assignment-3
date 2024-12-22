"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.configureServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//define server configurations...
const serverConfigurations = {
    cors: (0, cors_1.default)({ origin: "*" }), // for now accept requests from everywhere
    jsonParser: express_1.default.json(),
    cookieParser: (0, cookie_parser_1.default)(),
};
const configureServer = (app) => {
    for (const [key, value] of Object.entries(serverConfigurations)) {
        app.use(value);
    }
};
exports.configureServer = configureServer;
exports.config = {
    database_url: process.env.DB_URL,
    default_password: process.env.DEFAULT_PASSWORD,
};
