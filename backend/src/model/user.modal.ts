import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import { MODAL } from "../constant";
interface User extends Document {
  userName: string;
  password: string;
  email: string;
  role: string;
  phone: string;
  profile: string;
  isActive: boolean;
  editor?: string;
}

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profile: {
      type:String
    },
    isActive: {
      type: Boolean,
      required: true
    },
    editor: {
      type:String,
    }
  },
  { timestamps: true }
);

userSchema.pre('save',async function (this:any,next) { 
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

export const UserModal = mongoose.model<User>(MODAL.USER_MODAL, userSchema);
