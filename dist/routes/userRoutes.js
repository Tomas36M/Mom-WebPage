"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validateUser_1 = require("../middlewares/validateUser");
const multer_1 = __importDefault(require("../helpers/multer"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", userController_1.getAllUsersController);
userRoutes.get("/:id", userController_1.getUserByIdController);
userRoutes.post("/register", multer_1.default.single('image'), validateUser_1.validateUser, userController_1.createUserController);
userRoutes.post("/login", auth_1.default, userController_1.loginUsercontroller);
userRoutes.delete("/:id", userController_1.deleteUserController);
exports.default = userRoutes;
