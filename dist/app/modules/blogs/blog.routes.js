"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validate_request_1 = require("../../middleware/validate.request");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_middleware_1.auth)(), (0, validate_request_1.ValidateRequest)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogController.createBlog);
router.get('/', blog_controller_1.BlogController.getAllBlogs);
router.get('/:id', blog_controller_1.BlogController.getSingleBlog);
router.patch('/:id', (0, auth_middleware_1.auth)(), (0, validate_request_1.ValidateRequest)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blog_controller_1.BlogController.updateBlog);
router.delete('/:id', blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
