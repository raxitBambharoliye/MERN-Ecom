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
exports.editProfile = exports.UserAddContact = exports.UserLogin = exports.UserRegister = void 0;
const user_modal_1 = require("../../model/user.modal");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constact_model_1 = __importDefault(require("../../model/constact.model"));
const generateToken_1 = require("../../common/generateToken");
const log_1 = __importDefault(require("../../utility/log"));
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UserRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.role) {
            req.body.role = "user";
        }
        req.body.isActive = true;
        const data = yield user_modal_1.UserModal.create(req.body);
        let token = yield (0, generateToken_1.generateToken)(data._id, data.email);
        res.status(200).json({ user: data, token });
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : user : register : 🐞🐞🐞 :\n ${error}`);
    }
});
exports.UserRegister = UserRegister;
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield common_1.MQ.findOne(constant_1.MODAL.USER_MODAL, { email: email });
        if (!user) {
            return res.status(400).json({
                error: [{ path: "root", msg: "Invalid password or email " }],
            });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: [{ path: "root", msg: "Invalid password or email " }],
            });
        }
        let token = yield (0, generateToken_1.generateToken)(user._id, user.email);
        res.status(200).json({
            token,
            user,
        });
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : user : UserLogin : 🐞🐞🐞 : \n ${error} `);
    }
});
exports.UserLogin = UserLogin;
const UserAddContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addData = yield constact_model_1.default.create(req.body);
        if (addData) {
            res
                .status(200)
                .json({ message: "contact added successfully", contact: addData });
        }
        else {
            res.status(500).json({ message: "contact not added" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : user : UserAddContact : 🐞🐞🐞 : \n `, error);
    }
});
exports.UserAddContact = UserAddContact;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = yield common_1.MQ.findById(constant_1.MODAL.USER_MODAL, req.body.userId);
        if (!userData) {
            return res.status(401).json({ message: "user unauthenticated" });
        }
        if (req.file) {
            req.body.profile = process.env.USER_PROFILE_PATH + "/" + req.file.filename;
            if (userData.profile && fs_1.default.existsSync(path_1.default.join(__dirname, "../..", userData.profile))) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../..", userData.profile));
            }
        }
        else {
            req.body.profile = userData.profile;
        }
        let updateData = yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.USER_MODAL, userData._id, req.body, true);
        res.status(200).json({ user: updateData, message: "user updated successfully" });
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : user : editProfile : 🐞🐞🐞 : \n `, error);
    }
});
exports.editProfile = editProfile;
