import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Category } from "../dto/productDto"

@Entity({name: "products"})
export class Product{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    price: number
    @Column()
    description: string
    @Column()
    category: Category
    @Column()
    stock: number
    @Column()
    product_img: string
}
