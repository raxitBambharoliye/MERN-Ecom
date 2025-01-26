"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("../constant");
const adminSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    profile: {
        type: String,
    }
}, { timestamps: true });
const AdminModal = mongoose_1.default.model(constant_1.MODAL.ADMIN_MODAL, adminSchema);
exports.default = AdminModal;
