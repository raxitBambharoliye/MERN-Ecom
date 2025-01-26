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
exports.reqRegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const user_modal_1 = require("../../model/user.modal");
const log_1 = __importDefault(require("../../utility/log"));
exports.reqRegisterValidation = [
    (0, express_validator_1.body)('userName')
        .notEmpty().withMessage('userName required')
        .isString().withMessage("invalid user name data type")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_modal_1.UserModal.findOne({ userName: value });
        if (user) {
            throw new Error("User name is already taken");
        }
    })),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('password required')
        .isString().withMessage("invalid password data type")
        .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('email required')
        .isString().withMessage("invalid email data type")
        .isEmail().withMessage("invalid email type")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_modal_1.UserModal.findOne({ email: value });
        if (user) {
            throw new Error('Email is already taken');
        }
    })),
    (req, res, next) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            log_1.default.error(`VALIDATION ERROR : IN : reqRegisterValidation :: ${JSON.stringify(error.array())}`);
            return res.status(400).json({ error: error.array() });
        }
        next();
    }
];
