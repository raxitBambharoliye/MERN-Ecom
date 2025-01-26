import { body, validationResult } from "express-validator";


export const reqLoginValidation = [
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter your email address"),
    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),

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