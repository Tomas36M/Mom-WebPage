import { IProductDto } from "../dto/productDto";
import { ProductModel } from "../config/data-source";
import { Product } from "../entities/Product";

export const createProduct = async (product: IProductDto) => {
    const newProduct: Product | null  = ProductModel.create(product);
    return await ProductModel.save(newProduct);
}   

export const getProducts = async () => {
    const products: Product[] = await ProductModel.find();
    return products
}

export const getProductById = async (id: number) => {
    return await ProductModel.findOneBy({ id });
}