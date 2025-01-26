"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const reqAddProductValidation = [
    (0, express_validator_1.body)('name')
        .notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)('description')
        .notEmpty().withMessage("description is required"),
    (0, express_validator_1.body)("price")
        .notEmpty().withMessage("price is required"),
    (0, express_validator_1.body)("discount")
        .notEmpty().withMessage("discount is required")
        .isInt({ max: 100, min: 0 }).withMessage("enter valid discount"),
    (0, express_validator_1.body)("stock")
        .notEmpty().withMessage("stock is required"),
    (0, express_validator_1.body)("inStock")
        .notEmpty().withMessage("inStock is required")
    /*  .isBoolean().withMessage("enter valid type of inStock") */ ,
    (0, express_validator_1.body)("isActive")
        .notEmpty().withMessage("isActive is required")
    /*  .isBoolean().withMessage("enter valid type of isActive") */ ,
    (0, express_validator_1.body)("categoryId")
        .notEmpty().withMessage("category is required"),
    (0, express_validator_1.body)("creator")
        .notEmpty().withMessage("creator is required"),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            if (req.files) {
                if (req.files.bannerImage[0]) {
                    const imagePath = process.env.PRODUCT_BANNER_IMAGE_PATH || '/upload/productBanner';
                    let img = path_1.default.join(__dirname, '../..', imagePath, req.files.bannerImage[0].filename);
                    if (img && fs_1.default.existsSync(img)) {
                        fs_1.default.unlinkSync(img);
                    }
                }
                if (req.files.mulImage && req.files.mulImage.length > 0) {
                    const imagePath = process.env.PRODUCT_MUL_IMAGE_PATH || '/upload/productMulti';
                    req.files.mulImage.forEach((element) => {
                        const img = path_1.default.join(__dirname, '../..', imagePath, element.filename);
                        if (img && fs_1.default.existsSync(img)) {
                            fs_1.default.unlinkSync(img);
                        }
                    });
                }
            }
            return res.status(400).json({
                success: false,
                error: error.array()
            });
        }
        return next();
    }
];
exports.default = reqAddProductValidation;
