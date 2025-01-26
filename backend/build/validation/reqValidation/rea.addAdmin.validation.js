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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const reqAddAdminVAlidation = [
    (0, express_validator_1.body)("userName")
        .notEmpty()
        .withMessage("user Name is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const adminData = yield common_1.MQ.findOne(constant_1.MODAL.ADMIN_MODAL, {
            userName: value,
        });
        if (adminData) {
            throw new Error("user name is already taken");
        }
    })),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const adminData = yield common_1.MQ.findOne(constant_1.MODAL.ADMIN_MODAL, {
            email: value,
        });
        if (adminData) {
            throw new Error("email Id  is already taken");
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters"),
    (0, express_validator_1.body)("companyName").notEmpty().withMessage("company name is required"),
    (0, express_validator_1.body)("phone").notEmpty().withMessage("phone number is required"),
    (0, express_validator_1.body)("editor").notEmpty().withMessage("editor is required"),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            if (req.file) {
                const imagePath = process.env.PROFILE_PATH || '/upload/profile';
                let img = path_1.default.join(__dirname, '../..', imagePath, req.file.filename);
                if (fs_1.default.existsSync(img)) {
                    fs_1.default.unlinkSync(img);
                }
            }
            return res.status(400).json({
                success: false,
                error: error.array(),
            });
        }
        return next();
    },
];
exports.default = reqAddAdminVAlidation;
