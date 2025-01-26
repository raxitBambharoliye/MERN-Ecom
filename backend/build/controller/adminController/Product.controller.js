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
exports.editProduct = exports.allProduct = exports.inStockProduct = exports.deleteProduct = exports.activeProduct = exports.addProduct = void 0;
const common_1 = require("../../common");
const constant_1 = require("../../constant");
const log_1 = __importDefault(require("../../utility/log"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllProduct = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        search = (_a = search.trim()) !== null && _a !== void 0 ? _a : "";
        const totalDos = yield common_1.MQ.find(constant_1.MODAL.PRODUCT_MODAL, {
            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { description: { $regex: ".*" + search + ".*", $options: "i" } },
                // { discount: { $regex: '.*' + search + '.*', $options: 'i' } },
                // { price: { $regex: '.*' + search + '.*', $options: 'i' } },
            ],
        });
        const allData = yield common_1.MQ.pagination(constant_1.MODAL.PRODUCT_MODAL, {
            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { description: { $regex: ".*" + search + ".*", $options: "i" } },
                // { discount: { $regex: '.*' + search + '.*'} },
                // { price: { $regex: '.*' + search + '.*', $options: 'i' } },
            ],
        }, { skip: (page - 1) * limit, limit: limit });
        if (allData && allData.length > 0 && totalDos && totalDos.length > 0) {
            return {
                allProduct: allData,
                maxLimit: Math.ceil(totalDos.length / limit),
            };
        }
        return {
            allProduct: [],
            maxLimit: 0,
        };
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : category : getAllProduct : 🐞🐞🐞 : \n ${error}`);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            req.body.bannerImage = process.env.PRODUCT_BANNER_IMAGE_PATH + "/" + req.files.bannerImage[0].filename;
            let mulImg = [];
            if (req.files.mulImage && req.files.mulImage.length > 0) {
                req.files.mulImage.forEach((element) => {
                    mulImg.push(process.env.PRODUCT_MUL_IMAGE_PATH + "/" + element.filename);
                });
                req.body.mulImage = mulImg;
            }
            req.body.inStock = true;
            req.body.isActive = true;
            let productData = yield common_1.MQ.addData(constant_1.MODAL.PRODUCT_MODAL, req.body);
            if (productData) {
                res.status(200).json({
                    message: "product added successfully",
                    productData: productData,
                });
            }
            else {
                return res
                    .status(1001)
                    .json({ message: "something was wrong try after some time " });
            }
        }
        else {
            return res
                .status(1001)
                .json({ message: "something was wrong try after some time " });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : product : addProduct : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.addProduct = addProduct;
const activeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield common_1.MQ.findById(constant_1.MODAL.PRODUCT_MODAL, req.params.id);
        if (!productData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        let active = productData.isActive ? false : true;
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.PRODUCT_MODAL, productData.id, {
            isActive: active,
        });
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        let resData = yield getAllProduct(page, limit, search);
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
exports.activeProduct = activeProduct;
const inStockProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield common_1.MQ.findById(constant_1.MODAL.PRODUCT_MODAL, req.params.id);
        if (!productData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        let active = productData.inStock ? false : true;
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.PRODUCT_MODAL, productData.id, {
            inStock: active,
        });
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        let resData = yield getAllProduct(page, limit, search);
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
exports.inStockProduct = inStockProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield common_1.MQ.findById(constant_1.MODAL.PRODUCT_MODAL, req.params.id);
        if (product) {
            if (product.bannerImage) {
                let img = path_1.default.join(__dirname, "../..", product.bannerImage);
                if (fs_1.default.existsSync(img)) {
                    fs_1.default.unlinkSync(img);
                }
            }
            if (product.mulImage && product.mulImage.length > 0) {
                product.mulImage.forEach((element) => {
                    let img = path_1.default.join(__dirname, "../..", element);
                    if (img && fs_1.default.existsSync(img)) {
                        fs_1.default.unlinkSync(img);
                    }
                });
            }
            yield common_1.MQ.findByIdAndDelete(constant_1.MODAL.PRODUCT_MODAL, req.params.id);
            let page = req.params.page;
            let limit = req.params.limit;
            let search = req.query.search || "";
            let resData = yield getAllProduct(page, limit, search);
            if (resData) {
                return res.status(200).json(resData);
            }
            else {
                return res.status(400).json({ message: "some thing went wrong" });
            }
        }
        else {
            res.status(400).json({ message: "something went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : Product : deleteProduct : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.deleteProduct = deleteProduct;
const allProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = req.params.page;
        let limit = req.params.limit;
        let search = req.query.search || "";
        let resData = yield getAllProduct(page, limit, search);
        if (resData) {
            return res.status(200).json(resData);
        }
        else {
            return res.status(400).json({ message: "some thing went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : product : allProduct : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.allProduct = allProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.inStock);
        console.log(req.body.isActive);
        console.log(req.files);
        console.log(req.body.removeImage);
        const productData = yield common_1.MQ.findById(constant_1.MODAL.PRODUCT_MODAL, req.body.product_id);
        if (!productData) {
            return res
                .status(400)
                .json({ message: "something was wrong try after some time " });
        }
        if (req.body.removeImage && req.body.removeImage.length > 0) {
            req.body.removeImage.split(",").forEach((element, index) => {
                const img = path_1.default.join(__dirname, '../..', productData.mulImage[element - index]);
                if (fs_1.default.existsSync(img)) {
                    fs_1.default.unlinkSync(img);
                }
                productData.mulImage.splice(element - index, 1);
            });
        }
        if (req.files) {
            if (req.files.bannerImage && req.files.bannerImage[0]) {
                req.body.bannerImage = process.env.PRODUCT_BANNER_IMAGE_PATH + "/" + req.files.bannerImage[0].filename;
                if (productData.bannerImage) {
                    let img = path_1.default.join(__dirname, '../..', productData.bannerImage);
                    if (fs_1.default.existsSync(img)) {
                        fs_1.default.unlinkSync(img);
                    }
                }
            }
            else {
                req.body.bannerImage = productData.bannerImage;
            }
            if (req.files.mulImage && req.files.mulImage.length > 0) {
                req.files.mulImage.forEach((element) => {
                    productData.mulImage.push(process.env.PRODUCT_MUL_IMAGE_PATH + "/" + element.filename);
                });
            }
            req.body.mulImage = productData.mulImage;
        }
        else {
            req.body.bannerImage = productData.bannerImage;
            req.body.mulImage = productData.mulImage;
        }
        req.body.isActive = productData.isActive;
        req.body.inStock = productData.inStock;
        yield common_1.MQ.findByIdAndUpdate(constant_1.MODAL.PRODUCT_MODAL, productData.id, req.body);
        let page = req.body.page;
        let limit = req.body.limit;
        let search = req.query.search || "";
        let resData = yield getAllProduct(page, limit, search);
        if (resData) {
            return res.status(200).json(resData);
        }
        else {
            return res.status(400).json({ message: "some thing went wrong" });
        }
    }
    catch (error) {
        log_1.default.error(`CATCH ERROR : IN : product : editProduct : 🐞🐞🐞 : \n ${error}`);
    }
});
exports.editProduct = editProduct;
