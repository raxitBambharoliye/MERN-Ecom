import { Schema } from "mongoose";
import { UserIn } from "./User.intereface";

export default interface AddressIN {
  _id?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  userId: Schema.Types.ObjectId|UserIn;
  title:String;
  address1:String;
  address2?:String;
  city:String;
  state:String;
  country:String;
  pinCode:Number;
  mapLink?:String;
}
