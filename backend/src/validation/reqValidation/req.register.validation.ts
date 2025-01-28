import { body, validationResult } from "express-validator";
import { UserModal } from "../../model/user.modal";
import logger from "../../utility/log";
import path from "path";
import fs from "fs";
export const reqRegisterValidation = [
  body("userName")
    .notEmpty()
    .withMessage("userName required")
    .isString()
    .withMessage("invalid user name data type")
    .custom(async (value) => {
      const user = await UserModal.findOne({ userName: value });
      if (user) {
        throw new Error("User name is already taken");
      }
    }),
  body("password").notEmpty().withMessage("password required").isString().withMessage("invalid password data type").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isString()
    .withMessage("invalid email data type")
    .isEmail()
    .withMessage("invalid email type")
    .custom(async (value) => {
      const user = await UserModal.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
    }),
  (req: any, res: any, next: any) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      if (req.file) {
        const imagePath = process.env.USER_PROFILE_PATH || "/upload/userProfile";
        let img = path.join(__dirname, "../..", imagePath, req.file.filename);
        if (fs.existsSync(img)) {
          fs.unlinkSync(img);
        }
      }
      logger.error(`VALIDATION ERROR : IN : reqRegisterValidation :: ${JSON.stringify(error.array())}`);
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
];
