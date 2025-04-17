"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.createCredentialsService = void 0;
const Credentail_1 = require("../entities/Credentail");
const data_source_1 = require("../config/data-source");
const bcrypt_1 = require("../helpers/bcrypt");
const createCredentialsService = (username, password, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCredential = yield data_source_1.CredentialsModel.findOne({
        where: { username },
    });
    if (existingCredential) {
        throw new Error("Username already exists");
    }
    // Hashear la contraseña antes de guardar
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
    const newCredential = entityManager.create(Credentail_1.Credentials, {
        username,
        password: hashedPassword,
    });
    const result = yield data_source_1.CredentialsModel.save(newCredential);
    return result.id;
});
exports.createCredentialsService = createCredentialsService;
const loginService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar solo por username
    const credential = yield data_source_1.CredentialsModel.findOne({
        where: { username },
    });
    if (!credential)
        return null;
    // Comparar contraseña con hash almacenado
    const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, credential.password);
    if (!isPasswordValid)
        return null;
    // Buscar usuario asociado (ajusta según tu modelo de datos)
    const user = yield data_source_1.UserModel.findOne({
        where: { id: credential.id },
        relations: {
            credentials: true,
            appointments: true,
        },
    });
    return user;
});
exports.loginService = loginService;
