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
exports.deleteUserController = exports.getUserByIdController = exports.getAllUsersController = exports.loginUsercontroller = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
const credentialsService_1 = require("../services/credentialsService");
const mailer_1 = require("../config/mailer");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const image = req.file;
        let profile_img = '';
        if (image) {
            profile_img = `/uploads/img/${image.filename}`;
        }
        const newUser = yield (0, userService_1.createUserService)({ name, email, active: true, birthdate, nDni, username, password, profile_img });
        res.status(201).json(newUser);
        (0, mailer_1.sendEmail)(newUser.email, 'Bienvenido a nuestra plataforma', `<h1>¡Hola ${newUser.name}!</h1>
            <p>Tu registro se ha completado exitosamente.</p>
            <p></p>Ya puedes agendar tus turnos y crear tus piezas de joyeria personalizadas!</p>`).catch(error => console.error('Error en email:', error));
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error });
    }
});
exports.createUserController = createUserController;
const loginUsercontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, credentialsService_1.loginService)(username, password);
        if (!user)
            res.status(404).json({ message: `Hay un error, verificar los datos ingresados` });
        else
            res.status(200).json({ login: true, user: user });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error });
    }
});
exports.loginUsercontroller = loginUsercontroller;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUserService)();
        if (users.length === 0)
            res.status(404).json({ message: "No hay usuarios agregados" });
        else
            res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` });
    }
});
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        const user = yield (0, userService_1.getUserByIdService)(idNum);
        if (!user)
            res.status(404).json({ message: `El usuario con ${idNum} no existe` });
        else
            res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` });
    }
});
exports.getUserByIdController = getUserByIdController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        const user = yield (0, userService_1.deleteUserService)(idNum);
        if (!user)
            res.status(404).json({ message: `El usuario con ${idNum} no existe` });
        else
            res.status(200).json({ message: `El usuario:${user.name} ha sido eliminado` });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` });
    }
});
exports.deleteUserController = deleteUserController;
