"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqLoginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.reqLoginValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter your email address"),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: error.array()
            });
        }
        next();
    }
];
