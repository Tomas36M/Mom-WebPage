import { Router } from "express";
import { createProductController, getProductByIdController, getProductsController } from "../controllers/productController";
import upload from "../helpers/multer";

const productRouter: Router = Router();

productRouter.get('/', getProductsController);
productRouter.get('/:id', getProductByIdController);
productRouter.post('/create', upload.single('image'), createProductController);

export default productRouter