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
const constant_1 = require("../constant");
const admin_modal_1 = __importDefault(require("../model/admin.modal"));
const category_modal_1 = __importDefault(require("../model/category.modal"));
const constact_model_1 = __importDefault(require("../model/constact.model"));
const product_modal_1 = __importDefault(require("../model/product.modal"));
const user_modal_1 = require("../model/user.modal");
const log_1 = __importDefault(require("../utility/log"));
class MongoQ {
    selectModal(modal) {
        switch (modal) {
            case constant_1.MODAL.USER_MODAL:
                this.collection = user_modal_1.UserModal;
                break;
            case constant_1.MODAL.ADMIN_MODAL:
                this.collection = admin_modal_1.default;
                break;
            case constant_1.MODAL.CONTACT_MODAL:
                this.collection = constact_model_1.default;
                break;
            case constant_1.MODAL.CATEGORY_MODAL:
                this.collection = category_modal_1.default;
                break;
            case constant_1.MODAL.PRODUCT_MODAL:
                this.collection = product_modal_1.default;
                break;
        }
    }
    findOne(modal, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let data = yield this.collection.findOne(query);
                return data;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: findOne :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error} `);
                return null;
            }
        });
    }
    findById(modal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let data = yield this.collection.findById(id);
                return data;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: findById :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error} `);
                return null;
            }
        });
    }
    findByIdAndUpdate(modal_1, id_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (modal, id, data, newReturn = false) {
            try {
                this.selectModal(modal);
                let upData = yield this.collection.findByIdAndUpdate(id, data, {
                    new: newReturn,
                });
                return upData;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: findByIdAndUpdate :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error}`);
                return null;
            }
        });
    }
    addData(modal, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let upData = yield this.collection.create(data);
                return upData;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: addData :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error}`);
                return null;
            }
        });
    }
    find(modal, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let upData = yield this.collection.find(data);
                return upData;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: find :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error}`);
                return null;
            }
        });
    }
    findByIdAndDelete(modal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let upData = yield this.collection.findByIdAndDelete(id);
                return upData;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: findByIdAndDelete :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error}`);
                return null;
            }
        });
    }
    pagination(modal, query, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.selectModal(modal);
                let data = yield this.collection
                    .find(query)
                    .skip(option === null || option === void 0 ? void 0 : option.skip)
                    .limit(option === null || option === void 0 ? void 0 : option.limit)
                    .exec();
                return data;
            }
            catch (error) {
                log_1.default.error(`CATCH ERROR IN :: pagination :: 🤷‍♂️🤷‍♂️🤷‍♂️ :: \n :: ${error}`);
                return null;
            }
        });
    }
}
const MQ = new MongoQ();
exports.default = MQ;
