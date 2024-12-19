import { ObjectId } from "mongoose";

export interface TBlog  {
    title:string;
    content:string;
    author:ObjectId;
    isPublished:boolean;
}