"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("../constant");
const categorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String,
        require: true,
    },
    categoryImage: {
        type: String,
        require: true,
    },
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: constant_1.MODAL.ADMIN_MODAL,
        require: true,
    },
    isActive: {
        type: Boolean,
        require: true,
    }
}, { timestamps: true });
const CategoryModal = mongoose_1.default.model(constant_1.MODAL.CATEGORY_MODAL, categorySchema);
exports.default = CategoryModal;
