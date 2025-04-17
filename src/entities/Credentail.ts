import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "credentials"})
export class Credentials{
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    username: string
    @Column()
    password: string
}