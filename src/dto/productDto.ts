export enum Category { 
    NECKLACE = "NECKLACE", 
    RING = "RING", 
    BRACELET = "BRACELET", 
    EARRINGS = "EARRINGS", 
    PENDANT = "PENDANT"
}

export interface IProductDto { 
    title: string,
    description: string,
    price: number,
    stock: number,
    product_img?: string,
    category: Category
}

