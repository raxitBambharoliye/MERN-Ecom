"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontRouter = void 0;
const express_1 = require("express");
const front_data_controller_1 = require("../controller/froentController/front.data.controller");
const router = (0, express_1.Router)();
exports.frontRouter = router;
router.get('/userAllCategory', front_data_controller_1.frontAllCategory);
router.get('/allProduct', front_data_controller_1.frontAllProduct);
router.get('/singleProduct/:id', front_data_controller_1.frontGetSingleProduct);
