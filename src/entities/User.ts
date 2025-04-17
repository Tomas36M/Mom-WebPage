import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Credentials } from "./Credentail"
import { Appointment } from "./Appointment"

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({unique: true})
    email: string
    @Column()
    active: boolean
    @Column()
    birthdate: Date
    @Column()
    profile_img: string
    @Column({unique: true})
    nDni: string
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
    @OneToOne(()=> Credentials)
    @JoinColumn()
    credentials: Credentials
    
}