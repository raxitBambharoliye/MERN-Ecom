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
exports.frontGetSingleProduct = exports.frontAllProduct = exports.frontAllCategory = void 0;
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const log_1 = __importDefault(require("../../utility/log"));
const frontAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("checking:::::");
        let data = yield common_1.MQ.find(constant_1.MODAL.CATEGORY_MODAL, { isActive: true });
        console.log('data', data);
        if (data) {
            res.status(200).json({ allCategory: data });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : frontAllCategory : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.frontAllCategory = frontAllCategory;
const frontAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { isActive: true };
        console.log('req.query.singleId 👉👉👉 ', req.query.singleId);
        if (req.query.singleId) {
            query._id = req.query.singleId;
        }
        console.log('query', query);
        let data = yield common_1.MQ.find(constant_1.MODAL.PRODUCT_MODAL, query);
        console.log('data', data);
        if (data) {
            res.status(200).json({ allProducts: data });
        }
        else {
            res.status(400).json({ message: "some thing went wrong, please try again later." });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : frontAllProduct :  : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.frontAllProduct = frontAllProduct;
const frontGetSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.prams.id) {
            res.status(400).json({ message: "product not found" });
        }
        let productData = yield common_1.MQ.findById(constant_1.MODAL.PRODUCT_MODAL, req.params.id);
        if (productData && productData.isActive) {
            res.status(200).json({ productData });
        }
        else {
            res.status(400).json({ message: "some thing went wrong, please try again later." });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : frontGetSingleProduct :  : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.frontGetSingleProduct = frontGetSingleProduct;
