import { catchAsync } from "../../utils/catchAsync"

const blockUser=catchAsync((req, res)=>{
    userId = req.params
})

const deleteBlog=()=>{}


export const AdminController = {
    blockUser,
    deleteBlog
}