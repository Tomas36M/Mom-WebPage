"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.AppointmentModel = exports.CredentialsModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credentail_1 = require("../entities/Credentail");
const Appointment_1 = require("../entities/Appointment");
const Product_1 = require("../entities/Product");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.HOST,
    port: envs_1.DBPORT,
    username: envs_1.USERNAME,
    password: envs_1.PASSWORD,
    database: envs_1.DATABASE,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Credentail_1.Credentials, Appointment_1.Appointment, Product_1.Product],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.CredentialsModel = exports.AppDataSource.getRepository(Credentail_1.Credentials);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appointment_1.Appointment);
exports.ProductModel = exports.AppDataSource.getRepository(Product_1.Product);
