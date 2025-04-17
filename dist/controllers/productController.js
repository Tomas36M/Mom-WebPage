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
exports.createProductController = exports.getProductByIdController = exports.getProductsController = void 0;
const productsService_1 = require("../services/productsService");
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productsService_1.getProducts)();
        if (products.length === 0)
            res.status(404).json({ message: "No hay productos en este momento" });
        else
            res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
});
exports.getProductsController = getProductsController;
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        const product = yield (0, productsService_1.getProductById)(idNum);
        if (!product)
            res.status(404).json({ message: `El producto con id ${idNum} no existe` });
        else
            res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
});
exports.getProductByIdController = getProductByIdController;
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, stock, category } = req.body;
        const image = req.file;
        let product_img = '';
        if (image) {
            product_img = `/uploads/img/${image.filename}`;
        }
        const product = yield (0, productsService_1.createProduct)({ title, description, category, price, stock, product_img });
        if (!product) {
            res.status(404).json({ message: `El producto con id ${title} no existe` });
            return;
        }
        res.status(201).json({ message: 'Producto creado exitosamente', product });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createProductController = createProductController;
