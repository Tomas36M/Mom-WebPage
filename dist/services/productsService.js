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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const data_source_1 = require("../config/data-source");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = data_source_1.ProductModel.create(product);
    return yield data_source_1.ProductModel.save(newProduct);
});
exports.createProduct = createProduct;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield data_source_1.ProductModel.find();
    return products;
});
exports.getProducts = getProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.ProductModel.findOneBy({ id });
});
exports.getProductById = getProductById;
