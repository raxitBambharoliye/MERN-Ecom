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
exports.reqEditProfileValidation = void 0;
const express_validator_1 = require("express-validator");
const user_modal_1 = require("../../model/user.modal");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.reqEditProfileValidation = [
    (0, express_validator_1.body)('userId')
        .notEmpty().withMessage("user Id not specified"),
    (0, express_validator_1.body)('userName')
        .isString().withMessage("invalid user name data type")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const user = yield user_modal_1.UserModal.findOne({ userName: value });
        if (user && user.id != req.body.userId) {
            throw new Error("User name is already taken");
        }
    })),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('email required')
        .isString().withMessage("invalid email data type")
        .isEmail().withMessage("invalid email type")
        .custom((value_2, _b) => __awaiter(void 0, [value_2, _b], void 0, function* (value, { req }) {
        const user = yield user_modal_1.UserModal.findOne({ email: value });
        if (user && user.id != req.body.userId) {
            throw new Error('Email is already taken');
        }
    })),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            if (req.file) {
                const imagePath = process.env.USER_PROFILE_PATH || '/uplodd/userProfile';
                let img = path_1.default.join(__dirname, '../..', imagePath, req.file.filename);
                if (img && fs_1.default.existsSync(img)) {
                    fs_1.default.unlinkSync(img);
                }
            }
            return res.status(400).json({ error: error.array() });
        }
        next();
    }
];
