"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const reqAddCategoryValidation = [
    (0, express_validator_1.body)("categoryName")
        .notEmpty().withMessage("category name is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryData = yield common_1.MQ.find(constant_1.MODAL.CATEGORY_MODAL, { categoryName: value });
        if (categoryData && categoryData.length > 0) {
            throw new Error("category name is already in use");
        }
    })),
    (0, express_validator_1.body)("creator")
        .notEmpty().withMessage("creator name is required"),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            if (req.file) {
                const imagePath = process.env.CATEGORY_IMAGE_PATH || '/upload/categoryImage';
                let img = path_1.default.join(__dirname, '../..', imagePath, req.file.filename);
                if (img && fs_1.default.existsSync(img)) {
                    fs_1.default.unlinkSync(img);
                }
            }
            return res.status(400).json({ success: false, error: error.array() });
        }
        return next();
    }
];
exports.default = reqAddCategoryValidation;
