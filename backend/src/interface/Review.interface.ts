import { Mongoose, Schema } from "mongoose";
import { UserIn } from "./User.intereface";
import ProductIn from "./Product.intereface";

export default interface ReviewIn {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  userId: Schema.Types.ObjectId|UserIn;
  productId: Schema.Types.ObjectId|ProductIn;
  reviewMessage: string;
  rating: number;
}
