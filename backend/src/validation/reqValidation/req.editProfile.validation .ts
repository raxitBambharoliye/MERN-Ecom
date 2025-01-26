import { body, validationResult } from "express-validator";
import { UserModal } from "../../model/user.modal";
import path from 'path';
import fs from 'fs'
export const reqEditProfileValidation = [
    body('userId')
        .notEmpty().withMessage("user Id not specified"),
    body('userName')
        .isString().withMessage("invalid user name data type")
        .custom(async (value, { req }) => {
            const user = await UserModal.findOne({ userName: value });
            if (user && user.id != req.body.userId ) {
              throw new Error("User name is already taken");
            }
          })
    ,
    body('email')
        .notEmpty().withMessage('email required')
        .isString().withMessage("invalid email data type")
        .isEmail().withMessage("invalid email type")
        .custom(async (value,{req}) => {
            const user = await UserModal.findOne({ email: value });
            if (user && user.id != req.body.userId ) {
                throw new Error('Email is already taken');
            }
    }),
    (req: any, res: any, next: any) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            if (req.file) {   
                const imagePath = process.env.USER_PROFILE_PATH ||'/uplodd/userProfile';
                let img = path.join(__dirname, '../..', imagePath, req.file.filename);
                if (img && fs.existsSync(img)) {
                    fs.unlinkSync(img)
                }
            }
            return res.status(400).json({ error: error.array() });
        }
        next();
    }
]
