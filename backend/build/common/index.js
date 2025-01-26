"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQ = void 0;
const mongoCommand_1 = __importDefault(require("./mongoCommand"));
exports.MQ = mongoCommand_1.default;
const checkRole = (role, userRole, res) => {
    if (!role.includes(userRole)) {
        return res.status(401).json({
            error: [{ path: "root", msg: "unauthenticated user " }],
        });
    }
};
