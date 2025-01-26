import  dotenv  from 'dotenv';
import jwt from "jsonwebtoken";



export const generateToken = async (id: any, email: any) => {
  const secret = process.env.JWT_SECRET || "";
  const token =await jwt.sign({ _id: id, email: email }, secret, {
    expiresIn: 86400,
  });
  return token;
};
