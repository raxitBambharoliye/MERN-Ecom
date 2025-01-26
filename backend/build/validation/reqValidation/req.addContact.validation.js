"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqAddContactValidation = void 0;
const express_validator_1 = require("express-validator");
exports.reqAddContactValidation = [
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("name is requires"),
    (0, express_validator_1.body)("email")
        .isEmail().withMessage("Invalid email")
        .notEmpty().withMessage("email is required"),
    (0, express_validator_1.body)("message")
        .notEmpty().withMessage("message is required"),
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
