import { body, validationResult } from "express-validator";

export const reqAddContactValidation = [
    body("name")
        .notEmpty().withMessage("name is requires"),
    body("email")
        .isEmail().withMessage("Invalid email")
        .notEmpty().withMessage("email is required"),
    body("message")
        .notEmpty().withMessage("message is required"),
    (req: any, res: any, next: any) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: error.array()
            });
        }
        next();
     }
]
