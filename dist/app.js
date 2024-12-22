"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = require("./app/server/server.config");
const router_1 = __importDefault(require("./app/routes/router"));
const globalErrorHandler_1 = require("./app/error/globalErrorHandler");
const notFoundRoute_1 = require("./app/middleware/notFoundRoute");
const app = (0, express_1.default)(); //create express app
(0, server_config_1.configureServer)(app); //configure express app
app.use('/api', router_1.default); //use the router array
app.use(globalErrorHandler_1.GlobalErrorHandler);
app.use(notFoundRoute_1.NotFoundRoute);
exports.default = app;
