import { Mongoose, ObjectId } from "mongoose";

export default interface ProductIn{
    _id: string;
    id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: ObjectId;
    name:string;
    description:string;
    price:number;
    discount:number;
    stock:number;
    inStock:boolean;
    isActive:boolean;
    bannerImage:string;
    mulImage: string[];
}