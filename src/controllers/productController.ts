import { getProducts, getProductById, createProduct } from "../services/productsService";
import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
        if (products.length === 0) res.status(404).json({ message: "No hay productos en este momento" })
        else res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
}

export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const idNum: number = parseInt(id);
        const product = await getProductById(idNum);
        if (!product) res.status(404).json({ message: `El producto con id ${idNum} no existe` });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
}

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, price, stock, category } = req.body;
        const image = req.file;
        let product_img = ''
        if(image){
            product_img = `/uploads/img/${image.filename}`
        }
        const product = await createProduct({title, description, category, price, stock, product_img});

        if (!product) {
            res.status(404).json({ message: `El producto con id ${title} no existe` });
            return;
        }
        
        res.status(201).json({ message: 'Producto creado exitosamente', product });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
