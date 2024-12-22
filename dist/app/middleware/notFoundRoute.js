"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundRoute = void 0;
const statuses_1 = __importDefault(require("statuses"));
const NotFoundRoute = (req, res, next) => {
    res.status((0, statuses_1.default)('not found')).json({
        success: false,
        message: 'Route Not Found!',
        error: 'Please Check the URL!'
    });
};
exports.NotFoundRoute = NotFoundRoute;
