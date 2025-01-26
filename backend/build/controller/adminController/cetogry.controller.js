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
exports.editCategory = exports.deleteCategory = exports.activeCategory = exports.allCategory = exports.addCategory = void 0;
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const log_1 = __importDefault(require("../../utility/log"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllCategoryData = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        search = (_a = search.trim()) !== null && _a !== void 0 ? _a : "";
        const totalDos = yield common_1.MQ.find(constant_1.MODAL.CATEGORY_MODAL, {
            categoryName: { $regex: ".*" + search + ".*", $options: "i" },
        });
        const allCategoryData = yield common_1.MQ.pagination(constant_1.MODAL.CATEGORY_MODAL, {
            categoryName: { $regex: ".*" + search + ".*", $options: "i" },
        }, { skip: (page - 1) * limit, limit: limit });
        if (allCategoryData &&
            allCategoryData.length > 0 &&
            totalDos &&
            totalDos.length > 0) {
            return {
                allCategory: allCategoryData,
                maxLimit: Math.ceil(totalDos.length / limit),
            };
        }
        return {
            allCategory: [],
            maxLimit: 0,
        };
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : getAllCategoryData : 🐞🐞🐞 : \n ${error}`);
    }
});
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.categoryImage =
                process.env.CATEGORY_IMAGE_PATH + "/" + req.file.filename;
        }
        else {
            res
                .status(400)
                .json({ message: "category image is required", path: "categoryImage" });
        }
        req.body.isActive = false;
        const categoryData = yield common_1.MQ.addData(constant_1.MODAL.CATEGORY_MODAL, req.body);
        if (categoryData) {
            const allCategory = yield common_1.MQ.find(constant_1.MODAL.CATEGORY_MODAL, {});
            res
                .status(200)
                .json({ message: "category added successfully ", allCategory });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.addCategory = addCategory;
const allCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const page = req.params.page;
        const limit = req.params.limit;
        const search = (_b = req.query.search) !== null && _b !== void 0 ? _b : "";
        const totalDos = yield common_1.MQ.find(constant_1.MODAL.CATEGORY_MODAL, {
            categoryName: { $regex: ".*" + search + ".*", $options: "i" },
        });
        let allCategoryData;
        if (page > 0 && limit > 0) {
            allCategoryData = yield common_1.MQ.pagination(constant_1.MODAL.CATEGORY_MODAL, {
                categoryName: { $regex: ".*" + search + ".*", $options: "i" },
            }, { skip: (page - 1) * limit, limit: limit });
        }
        else {
            allCategoryData = totalDos;
        }
        if (allCategoryData &&
            allCategoryData.length > 0 &&
            totalDos &&
            totalDos.length > 0) {
            res.status(200).json({
                allCategory: allCategoryData,
                maxLimit: Math.ceil(totalDos.length / req.params.limit),
            });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.allCategory = allCategory;
const activeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, page, limit } = req.params;
        const search = req.query.search || "";
        const categoryData = yield common_1.MQ.findById(constant_1.MODAL.CATEGORY_MODAL, id);
        if (!categoryData) {
            res.send(400).json({ error: { message: "something was wrong" } });
        }
        const updateData = yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.CATEGORY_MODAL, id, {
            isActive: !categoryData.isActive,
        });
        if (updateData) {
            let resData = yield getAllCategoryData(page, limit, search);
            res.status(200).json(resData);
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.activeCategory = activeCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = yield common_1.MQ.findById(constant_1.MODAL.CATEGORY_MODAL, req.params.id);
        if (!categoryData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        if (fs_1.default.existsSync(path_1.default.join(__dirname, "../..", categoryData.categoryImage))) {
            fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", categoryData.categoryImage));
        }
        yield common_1.MQ.findByIdAndDelete(constant_1.MODAL.CATEGORY_MODAL, categoryData.id);
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        const resData = yield getAllCategoryData(page, limit, search);
        res.status(200).json(resData);
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminDelete : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.deleteCategory = deleteCategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, editor } = req.body;
        const editorData = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, editor);
        const categoryData = yield common_1.MQ.findById(constant_1.MODAL.CATEGORY_MODAL, categoryId);
        if ((!editorData || editorData.role != "admin") &&
            (categoryData === null || categoryData === void 0 ? void 0 : categoryData.creator) != editor._id) {
            return res.status(401).json({
                error: [{ path: "root", msg: "unauthenticated user " }],
            });
        }
        if (!categoryData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        if (req.file) {
            if (fs_1.default.existsSync(path_1.default.join(__dirname, "../..", categoryData === null || categoryData === void 0 ? void 0 : categoryData.categoryImage))) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", categoryData === null || categoryData === void 0 ? void 0 : categoryData.categoryImage));
            }
            req.body.categoryImage =
                process.env.CATEGORY_IMAGE_PATH + "/" + req.file.filename;
        }
        else {
            req.body.categoryImage = categoryData.categoryImage;
        }
        const updateData = yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.CATEGORY_MODAL, categoryData._id, req.body);
        if (updateData) {
            let resData = yield getAllCategoryData(Number(req.body.page), Number(req.body.limit), req.body.search);
            res.status(200).json(resData);
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : editCategory : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.editCategory = editCategory;
