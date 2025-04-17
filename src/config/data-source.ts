import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credentials } from "../entities/Credentail";
import { Appointment } from "../entities/Appointment";
import { Product } from "../entities/Product";
import { HOST, DBPORT, USERNAME, PASSWORD, DATABASE } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: DBPORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Credentials, Appointment, Product],
    subscribers: [],
    migrations: [],
    ssl:{
        rejectUnauthorized: false
    }
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialsModel = AppDataSource.getRepository(Credentials);
export const AppointmentModel = AppDataSource.getRepository(Appointment);
export const ProductModel = AppDataSource.getRepository(Product);