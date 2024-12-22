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
exports.BlogService = void 0;
const blog_model_1 = __importDefault(require("./blog.model"));
const mongodb_1 = require("mongodb");
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id);
    console.log(result);
    return result;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(query)
    let search = '';
    const queryObj = Object.assign({}, query);
    const excludeFields = ['search'];
    excludeFields.forEach(elem => delete queryObj[elem]);
    if (query.search) {
        search = query.search;
    }
    const searchQuery = blog_model_1.default.find({
        $or: ['title', 'content'].map((field) => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    });
    if (query.sortBy) {
        if ((query === null || query === void 0 ? void 0 : query.sortBy) == 'createdAt') {
            if (query.sortOrder) {
                if (query.sortOrder == 'desc') {
                    searchQuery.sort('-createdAt');
                }
                if (query.sortOrder == 'asc') {
                    searchQuery.sort('createdAt');
                }
            }
            else {
                searchQuery.sort('-createdAt');
            }
        }
        if ((query === null || query === void 0 ? void 0 : query.sortBy) == 'title') {
            if (query.sortOrder) {
                if (query.sortOrder == 'desc') {
                    searchQuery.sort('-title');
                }
                if (query.sortOrder == 'asc') {
                    searchQuery.sort('title');
                }
            }
        }
    }
    if (query.filter) {
        searchQuery.find({ author: query.filter });
    }
    // const result = await searchQuery.sort("-"+queryObj.sortBy as string)
    //console.log(result)
    return searchQuery;
});
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //assign current logged in user id to blog author field id...
    return (yield blog_model_1.default.create(payload)).populate('author');
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, payload).select(['_id', 'title', 'content', 'author']).populate('author');
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
});
exports.BlogService = {
    getSingleBlog,
    getAllBlogs,
    createBlogIntoDB,
    updateBlog,
    deleteBlog
};
