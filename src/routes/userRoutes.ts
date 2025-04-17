import { Router } from "express";
import { getAllUsersController, deleteUserController, getUserByIdController, createUserController, loginUsercontroller } from "../controllers/userController";
import { validateUser } from "../middlewares/validateUser";
import upload from '../helpers/multer'
import auth from "../middlewares/auth";

const userRoutes: Router = Router();

userRoutes.get("/", getAllUsersController);
userRoutes.get("/:id", getUserByIdController);
userRoutes.post("/register", upload.single('image'), validateUser ,createUserController);
userRoutes.post("/login", auth, loginUsercontroller);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
