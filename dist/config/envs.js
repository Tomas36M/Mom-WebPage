"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.DATABASE = exports.PASSWORD = exports.USERNAME = exports.DBPORT = exports.HOST = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
exports.HOST = process.env.HOST || "localhost";
exports.DBPORT = process.env.DBPORT ? parseInt(process.env.DBPORT) : 5432;
exports.USERNAME = process.env.USERNAME || "postgres";
exports.PASSWORD = process.env.PASSWORD;
exports.DATABASE = process.env.DATABASE;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
