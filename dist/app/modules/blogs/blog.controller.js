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
exports.BlogController = void 0;
const config_1 = require("../../config");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
const auth_utils_1 = require("../auth/auth.utils");
const blog_utils_1 = require("./blog.utils");
const user_model_1 = require("../users/user.model");
const blog_model_1 = __importDefault(require("./blog.model"));
const statuses_1 = __importDefault(require("statuses"));
// @ts-ignore: Object is possibly 'null'.
const getAllBlogs = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    const result = yield blog_service_1.BlogService.getAllBlogs(req.query);
    //const sanitizedBlog = sanitizePostBlogData(result.every(elem=>{}),[''])
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, { success: false, statusCode: (0, statuses_1.default)('not found'), message: 'Nothing Found', data: result });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: 'Blog(s) Fetched successfully', data: result });
}));
const getSingleBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield blog_service_1.BlogService.getSingleBlog(id);
    if (!blog) {
        (0, sendResponse_1.sendResponse)(res, { success: true, message: "Blog not Found", statusCode: (0, statuses_1.default)('not found'), data: {} });
    }
    (0, sendResponse_1.sendResponse)(res, { success: true, message: "Blog fetched successfully", statusCode: (0, statuses_1.default)('ok'), data: blog });
}));
const createBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //retrieve user email and role from jwt header as an array...
    const decoded = (0, blog_utils_1.retrieveUserCredentialsFromToken)(req.headers.authorization.split(' ')[1], config_1.config.jwt_secret);
    //find user in the database with the email provided....
    const user = yield user_model_1.User.findOne({ email: decoded.email });
    //assign user ID to blog author
    const blog = {
        title: req.body.title,
        author: user._id,
        content: req.body.content,
        isPublished: true
    };
    const result = yield blog_service_1.BlogService.createBlogIntoDB(blog);
    const data = yield (0, auth_utils_1.sanitizePostBlogData)(result._id.toString(), ['-isPublished']);
    (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Blog Created Successfully', statusCode: (0, statuses_1.default)('ok'), data: data });
}));
const updateBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //retrieve user email and role from jwt header as an array
    //const decoded = retrieveUserCredentialsFromToken(req.headers.authorization.split(' ')[1] as string, config.jwt_secret as string)
    if (req.user.role === 'admin') {
        (0, sendResponse_1.sendResponse)(res, { success: false, message: "Admin Cannot Update Blogs", statusCode: (0, statuses_1.default)('unauthorized'), data: {} });
        return;
    }
    // else{
    //check if the user id is same 
    const blog = yield blog_model_1.default.findOne({ _id: req.params.id });
    const user = yield user_model_1.User.findById(blog.author);
    console.log('BU ', user.email, req.user.email);
    if (user.email !== req.user.email) {
        (0, sendResponse_1.sendResponse)(res, { success: false, message: "You can't update other people's blog", statusCode: (0, statuses_1.default)('unauthorized'), data: {} });
        return;
    }
    const result = yield blog_service_1.BlogService.updateBlog(req.params.id, req.body);
    //console.log(result)
    if (!result) {
        res.send({
            success: false,
            statusCode: (0, statuses_1.default)('bad request'),
            message: 'Cannot find Blog by the ID supplied',
        });
    }
    // console.log('result-',result)
    const updatedDoc = yield (0, auth_utils_1.sanitizePostBlogData)(req.params.id, ['_id', 'title', 'content', 'author']);
    console.log('updatedDoc', updatedDoc);
    (0, sendResponse_1.sendResponse)(res, { success: true, message: "Blog updated Successfully!", statusCode: (0, statuses_1.default)('ok'), data: updatedDoc });
    // }
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //admin can delete any blog but user can delete only their blog...
    const decoded = (0, blog_utils_1.retrieveUserCredentialsFromToken)(req.headers.authorization.split(' ')[1], config_1.config.jwt_secret);
    //find blog and match user
    const blogID = req.params.id;
    const blog = yield blog_model_1.default.findById(blogID);
    const user = yield user_model_1.User.findById(blog.author);
    if (decoded.role === 'user') {
        //check if the blog is authored by the current logged in user...
        console.log(blog.author._id.toString(), user._id.toString());
        if (decoded.email === user.email) {
            const result = yield blog_service_1.BlogService.deleteBlog(blogID);
            (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "Blog Deleted", data: result });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, { success: false, statusCode: (0, statuses_1.default)('unauthorized'), message: "User cannot delete other User's blog", data: { blogID } });
        return;
    }
    else {
        const result = yield blog_service_1.BlogService.deleteBlog(blogID);
        (0, sendResponse_1.sendResponse)(res, { success: true, statusCode: (0, statuses_1.default)('ok'), message: "Blog Deleted", data: result });
        return;
    }
}));
exports.BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
};
