"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_routes_1 = require("../modules/blogs/blog.routes");
const admin_routes_1 = require("../modules/admins/admin.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes
    },
    {
        path: '/blogs',
        route: blog_routes_1.BlogRoutes
    }
];
routes.forEach(route => router.use(route.path, route.route));
exports.default = router;
