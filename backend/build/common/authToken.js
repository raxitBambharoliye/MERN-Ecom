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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoCommand_1 = __importDefault(require("./mongoCommand"));
const constant_1 = require("../constant");
const log_1 = __importDefault(require("../utility/log"));
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: "No token provided",
            });
        }
        const secret = process.env.JWT_SECRET || "";
        const verify = jsonwebtoken_1.default.verify(token, secret);
        if (!verify) {
            return res.status(401).json({
                success: false,
                error: "Invalid token",
            });
        }
        const adminData = yield mongoCommand_1.default.findById(constant_1.MODAL.ADMIN_MODAL, verify._id);
        if (!adminData || adminData.id != verify._id) {
            return res.status(401).json({
                success: false,
                error: "Invalid token",
            });
        }
        return next();
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : authToken : 🐞🐞🐞 : \n `, error);
        return res.status(401).json({
            success: false,
            error: "Invalid token",
        });
    }
});
exports.default = authToken;
