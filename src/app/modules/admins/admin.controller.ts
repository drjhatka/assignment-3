
import { catchAsync } from "../../utils/catchAsync"
import { retrieveUserCredentialsFromToken } from "../blogs/blog.utils";
import Blog from "../blogs/blog.model";
import { User } from "../users/user.model";
import { BlogService } from "../blogs/blog.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { config } from "../../config";

const blockUser = catchAsync((req, res) => {
    // userId = req.params
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


export const AdminController = {
    blockUser,
    deleteBlog
}