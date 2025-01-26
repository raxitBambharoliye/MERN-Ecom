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
exports.editUser = exports.deleteUser = exports.activeUser = exports.addUser = exports.allUserData = exports.AdminActive = exports.AdminDelete = exports.AdminAllAdminData = exports.AdminEditProfile = exports.AdminAdd = exports.AdminLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const log_1 = __importDefault(require("../../utility/log"));
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const generateToken_1 = require("../../common/generateToken");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllUsers = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        search = (_a = search.trim()) !== null && _a !== void 0 ? _a : "";
        const totalDos = yield common_1.MQ.find(constant_1.MODAL.USER_MODAL, {
            $or: [
                { userName: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
                { phone: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        });
        const allData = yield common_1.MQ.pagination(constant_1.MODAL.USER_MODAL, {
            $or: [
                { userName: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
                { phone: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        }, { skip: (page - 1) * limit, limit: limit });
        if (allData && allData.length > 0 && totalDos && totalDos.length > 0) {
            return {
                allUser: allData,
                maxLimit: Math.ceil(totalDos.length / limit),
            };
        }
        return {
            allUser: [],
            maxLimit: 0,
        };
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : getAllCategoryData : 🐞🐞🐞 : \n ${error}`);
    }
});
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield common_1.MQ.findOne(constant_1.MODAL.ADMIN_MODAL, { email });
        if (!admin || !admin.isActive) {
            return res.status(400).json({
                error: [{ path: "root", msg: "Invalid password or email " }],
            });
        }
        let passwordCheck = yield bcrypt_1.default.compare(password, admin.password);
        if (!passwordCheck) {
            return res.status(400).json({
                error: [{ path: "root", msg: "Invalid password or email " }],
            });
        }
        let token = yield (0, generateToken_1.generateToken)(admin._id, admin.email);
        res.status(200).json({ token: token, admin });
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminLogin : 🐞🐞🐞 : \n `, error);
    }
});
exports.AdminLogin = AdminLogin;
const AdminAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.editor) {
            const editorAdmin = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, req.body.editor);
            if (!editorAdmin || editorAdmin.role != "admin") {
                return res.status(401).json({
                    error: [{ path: "root", msg: "unauthenticated user " }],
                });
            }
        }
        if (req.file) {
            req.body.profile = process.env.PROFILE_PATH + "/" + req.file.filename;
        }
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        req.body.isActive = false;
        let adminData = yield common_1.MQ.addData(constant_1.MODAL.ADMIN_MODAL, req.body);
        if (adminData) {
            res
                .status(200)
                .json({ message: "admin added successfully ", admin: adminData });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminAdd : 🐞🐞🐞 : \n `, error);
    }
});
exports.AdminAdd = AdminAdd;
const AdminEditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.adminId) {
            return res.status(400).json({
                error: [{ path: "root", msg: "invalid data " }],
            });
        }
        const admin = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, req.body.adminId);
        if (!admin) {
            return res.status(401).json({
                error: [{ path: "root", msg: "unauthenticated user " }],
            });
        }
        if (req.body.editor) {
            const editorAdmin = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, req.body.editor);
            if (!editorAdmin || editorAdmin.role != "admin") {
                return res.status(401).json({
                    error: [{ path: "root", msg: "unauthenticated user " }],
                });
            }
        }
        if (typeof req.file != "undefined") {
            if (admin.profile && fs_1.default.existsSync(path_1.default.join(__dirname, "../..", admin.profile))) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", admin.profile));
            }
            req.body.profile = process.env.PROFILE_PATH + "/" + req.file.filename;
        }
        const upAdmin = yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.ADMIN_MODAL, admin.id, req.body, true);
        if (req.body.editor) {
            let page = req.body.page;
            let limit = req.body.limit;
            const allAdminData = yield common_1.MQ.find(constant_1.MODAL.ADMIN_MODAL, {});
            const pageData = yield common_1.MQ.pagination(constant_1.MODAL.ADMIN_MODAL, {}, { skip: (page - 1) * limit, limit });
            if (allAdminData && allAdminData.length > 0) {
                return res
                    .status(200)
                    .json({
                    allAdmin: pageData,
                    maxLimit: Math.round(allAdminData.length / limit),
                });
            }
        }
        if (upAdmin) {
            const token = yield (0, generateToken_1.generateToken)(admin.id, admin.email);
            return res.status(200).json({ admin: upAdmin, token });
        }
        else {
            return res
                .status(1001)
                .json({ message: "something was wrong try after some time " });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminEditProfile : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.AdminEditProfile = AdminEditProfile;
const AdminAllAdminData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let limit = req.params.limit;
        let page = req.params.page;
        let search = (_b = req.query.search) !== null && _b !== void 0 ? _b : "";
        const adminData = yield common_1.MQ.find(constant_1.MODAL.ADMIN_MODAL, {
            $or: [
                { useName: { $regex: ".*" + search + ".*", $options: "i" } },
                { phone: { $regex: ".*" + search + ".*", $options: "i" } },
                { role: { $regex: ".*" + search + ".*", $options: "i" } },
                { companyName: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        });
        const pageData = yield common_1.MQ.pagination(constant_1.MODAL.ADMIN_MODAL, {
            $or: [
                { useName: { $regex: ".*" + search + ".*", $options: "i" } },
                { phone: { $regex: ".*" + search + ".*", $options: "i" } },
                { role: { $regex: ".*" + search + ".*", $options: "i" } },
                { companyName: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        }, { skip: (page - 1) * limit, limit });
        if (adminData && adminData.length > 0 && pageData && pageData.length > 0) {
            res
                .status(200)
                .json({
                allAdmin: pageData,
                maxLimit: Math.ceil(adminData.length / req.params.limit),
            });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminAllAdminData : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.AdminAllAdminData = AdminAllAdminData;
const AdminDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, req.params.id);
        if (!adminData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        if (adminData.profile) {
            if (fs_1.default.existsSync(path_1.default.join(__dirname, "../..", adminData.profile)))
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", adminData.profile));
        }
        yield common_1.MQ.findByIdAndDelete(constant_1.MODAL.ADMIN_MODAL, adminData.id);
        let page = req.params.page;
        let limit = req.params.limit;
        const allAdminData = yield common_1.MQ.find(constant_1.MODAL.ADMIN_MODAL, {});
        const pageData = yield common_1.MQ.pagination(constant_1.MODAL.ADMIN_MODAL, {}, { skip: (page - 1) * limit, limit });
        if (allAdminData && allAdminData.length > 0) {
            res
                .status(200)
                .json({
                allAdmin: pageData,
                maxLimit: Math.round(allAdminData.length / req.params.limit),
            });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminDelete : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.AdminDelete = AdminDelete;
const AdminActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = yield common_1.MQ.findById(constant_1.MODAL.ADMIN_MODAL, req.params.id);
        if (!adminData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        let active = adminData.isActive ? false : true;
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.ADMIN_MODAL, adminData.id, {
            isActive: active,
        });
        let page = req.params.page;
        let limit = req.params.limit;
        const allAdminData = yield common_1.MQ.find(constant_1.MODAL.ADMIN_MODAL, {});
        const pageData = yield common_1.MQ.pagination(constant_1.MODAL.ADMIN_MODAL, {}, { skip: (page - 1) * limit, limit });
        if (allAdminData && allAdminData.length > 0) {
            res
                .status(200)
                .json({
                allAdmin: pageData,
                maxLimit: Math.round(allAdminData.length / req.params.limit),
            });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminActive : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.AdminActive = AdminActive;
// user functions
const allUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.params.page;
        const limit = req.params.limit;
        const search = req.query.search || "";
        const resData = yield getAllUsers(page, limit, search);
        if (resData) {
            return res.status(200).json(resData);
        }
        else {
            return res.status(400).json({ message: "some thing went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : allUserData : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.allUserData = allUserData;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.profile =
                process.env.USER_PROFILE_PATH + "/" + req.file.filename;
        }
        req.body.role = "user";
        req.body.isActive = true;
        const userData = yield common_1.MQ.addData(constant_1.MODAL.USER_MODAL, req.body);
        if (userData) {
            return res
                .status(200)
                .json({ message: "user added successfully", userData });
        }
        else {
            return res.status(400).json({ message: "some thing went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : allUserData : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.addUser = addUser;
const activeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield common_1.MQ.findById(constant_1.MODAL.USER_MODAL, req.params.id);
        if (!userData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        let active = userData.isActive ? false : true;
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.USER_MODAL, userData.id, {
            isActive: active,
        });
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        let resData = yield getAllUsers(page, limit, search);
        if (resData) {
            return res.status(200).json(resData);
        }
        else {
            return res.status(400).json({ message: "some thing went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : AdminActive : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.activeUser = activeUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield common_1.MQ.findById(constant_1.MODAL.USER_MODAL, req.params.id);
        if (!userData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        if (userData && userData.profile) {
            if (fs_1.default.existsSync(path_1.default.join(__dirname, "../..", userData === null || userData === void 0 ? void 0 : userData.profile))) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", userData === null || userData === void 0 ? void 0 : userData.profile));
            }
        }
        yield common_1.MQ.findByIdAndDelete(constant_1.MODAL.USER_MODAL, userData._id);
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        const resData = yield getAllUsers(page, limit, search);
        res.status(200).json(resData);
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : admin : userDelete : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.deleteUser = deleteUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = yield common_1.MQ.findById(constant_1.MODAL.USER_MODAL, req.body.userId);
        if (!userData) {
            return res.status(401).json({ message: "user unauthenticated" });
        }
        if (req.file) {
            req.body.profile =
                process.env.USER_PROFILE_PATH + "/" + req.file.filename;
            if (userData.profile && fs_1.default.existsSync(path_1.default.join(__dirname, "../..", userData.profile))) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", userData.profile));
            }
        }
        else {
            req.body.profile = userData.profile;
        }
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.USER_MODAL, userData._id, req.body, true);
        let page = req.body.page;
        let limit = req.body.limit;
        let search = req.body.search || "";
        const resData = yield getAllUsers(page, limit, search);
        res.status(200).json(resData);
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : user : editProfile : 🐞🐞🐞 : \n `, error);
    }
});
exports.editUser = editUser;
