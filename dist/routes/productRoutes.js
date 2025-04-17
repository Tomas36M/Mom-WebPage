"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("../helpers/multer"));
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.getProductsController);
productRouter.get('/:id', productController_1.getProductByIdController);
productRouter.post('/create', multer_1.default.single('image'), productController_1.createProductController);
exports.default = productRouter;
