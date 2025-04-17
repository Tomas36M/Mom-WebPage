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
exports.deleteUserService = exports.getUserService = exports.getUserByIdService = exports.createUserService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const credentialsService_1 = require("./credentialsService");
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityResult = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const existingUserByEmail = yield data_source_1.UserModel.findOne({ where: { email: userData.email } });
            if (existingUserByEmail) {
                throw new Error('Email already exists');
            }
            const existingUserByNDni = yield data_source_1.UserModel.findOne({ where: { nDni: userData.nDni } });
            if (existingUserByNDni) {
                throw new Error('nDni already exists');
            }
            const id = yield (0, credentialsService_1.createCredentialsService)(userData.username, userData.password, entityManager);
            const credentials = yield data_source_1.CredentialsModel.findOneBy({ id });
            if (!credentials) {
                throw new Error('Credentials not found');
            }
            const newUser = entityManager.create(User_1.User, Object.assign(Object.assign({}, userData), { credentials }));
            return yield entityManager.save(newUser);
        }));
        return entityResult;
    }
    catch (error) {
        throw new Error(`User creation failed: ${error.message}`);
    }
});
exports.createUserService = createUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({
        where: { id },
        relations: {
            appointments: true,
            credentials: true
        }
    });
    return user;
});
exports.getUserByIdService = getUserByIdService;
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({
        relations: {
            credentials: true,
            appointments: true
        }
    });
    return users;
});
exports.getUserService = getUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToDelete = yield data_source_1.UserModel.findOneBy({ id });
    if (userToDelete !== null) {
        yield data_source_1.UserModel.remove(userToDelete);
        return userToDelete;
    }
    else {
        return null;
    }
});
exports.deleteUserService = deleteUserService;
