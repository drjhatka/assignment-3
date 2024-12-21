import { config } from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTTokenPayload, sanitizePostBlogData, sanitizePostSaveData } from '../auth/auth.utils';
import { retrieveUserCredentialsFromToken } from "./blog.utils";
import { User } from "../users/user.model";
import { TBlog } from "./blog.interface";
import { TUser } from "../users/user.interface";
import { ObjectId } from 'mongodb';
import Blog from "./blog.model";
// @ts-ignore: Object is possibly 'null'.

const getAllBlogs = catchAsync(async (req, res, next) => {
    res.send({ message: 'test' })

})
const getSingleBlog = catchAsync(async (req, res, next) => {

})
const createBlog = catchAsync(async (req, res, next) => {
    //retrieve user email and role from jwt header as an array...
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    //find user in the database with the email provided....
    const user = await User.findOne({ email: decoded.email })
    //console.log(user)
    //assign user ID to blog author
    const blog: TBlog = {
        title: req.body.title,
        author: user._id,
        content: req.body.content,
        isPublished: true
    };
    const result = await BlogService.createBlogIntoDB(blog)
    const data = await sanitizePostBlogData(result._id.toString(), ['-isPublished'])
    sendResponse(res, { success: true, message: 'Blog Created Successfully', statusCode: httpStatus.OK, data: data })
})

const updateBlog = catchAsync(async (req, res, next) => { //ONLY User can update blog NOT Admin...
    //retrieve user email and role from jwt header as an array
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    if (decoded.role === 'admin') {
        sendResponse(res, { success: false, message: "Admin Cannot Update Blogs", statusCode: httpStatus.UNAUTHORIZED, data: {} })
        return
    }
    // else{
    const result = await BlogService.updateBlog(req.params.id, req.body)
    const updatedDoc = await sanitizePostBlogData(req.params.id, ['_id', 'title', 'content', 'author'])
    sendResponse(res, { success: false, message: "Blog updated Successfully!", statusCode: httpStatus.OK, data: updatedDoc })
    // }
})

const deleteBlog = catchAsync(async (req, res, next) => {
    //admin can delete any blog but user can delete only their blog...
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    //find blog and match user
    const blogID = req.params.id;
    const blog = await Blog.findById(blogID)
    const user = await User.findById(blog.author)

    if (decoded.role === 'user') {
        //check if the blog is authored by the current logged in user...
        if (blog.author._id.toString() === user._id.toString()) {
            const result = await BlogService.deleteBlog(blogID)
            sendResponse(res, { success: true, statusCode: httpStatus.OK, message: "Blog Deleted", data: result })
            return
        }
        sendResponse(res, { success: false, statusCode: httpStatus.UNAUTHORIZED, message: "User cannot delete other User's blog", data: { blogID } })
        return
    }
    else {
        const result = await BlogService.deleteBlog(blogID)
        sendResponse(res, { success: true, statusCode: httpStatus.OK, message: "Blog Deleted", data: result })
        return
    }
})

export const BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}