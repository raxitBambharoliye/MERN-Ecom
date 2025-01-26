import { Mongoose, ObjectId } from "mongoose";

export default interface CategoryIn{
    _id: string;
    id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
    categoryImage: string;
    categoryName:string;
    creator: ObjectId;
    isActive: boolean;
}