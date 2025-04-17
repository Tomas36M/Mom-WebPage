import { Request, Response } from "express";
import { createUserService, getUserService, deleteUserService, getUserByIdService } from "../services/userService";
import { loginService } from "../services/credentialsService";
import { User } from "../entities/User";
import { sendEmail } from "../config/mailer";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const image = req.file
        let profile_img = ''
        if (image) {
            profile_img = `/uploads/img/${image.filename}`
        }
        const newUser: User = await createUserService({ name, email, active: true, birthdate, nDni, username, password, profile_img });
        res.status(201).json(newUser);
        sendEmail(
            newUser.email,
            'Bienvenido a nuestra plataforma',
            `<h1>¡Hola ${newUser.name}!</h1>
            <p>Tu registro se ha completado exitosamente.</p>
            <p></p>Ya puedes agendar tus turnos y crear tus piezas de joyeria personalizadas!</p>`
        ).catch(error => console.error('Error en email:', error));
    } catch (error) {
        res.status(500).json({ status: 500, message: error });
    }
};

export const loginUsercontroller = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await loginService(username, password)
        if (!user) res.status(404).json({ message: `Hay un error, verificar los datos ingresados` })
        else res.status(200).json({ login: true, user: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
}

export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getUserService();
        if (users.length === 0) res.status(404).json({ message: "No hay usuarios agregados" })
        else res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` })
    }
}

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const idNum: number = parseInt(id);
        const user: User | null = await getUserByIdService(idNum);
        if (!user) res.status(404).json({ message: `El usuario con ${idNum} no existe` })
        else res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` })
    }
}

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const idNum: number = parseInt(id);
        const user: User | null = await deleteUserService(idNum);
        if (!user) res.status(404).json({ message: `El usuario con ${idNum} no existe` })
        else res.status(200).json({ message: `El usuario:${user.name} ha sido eliminado` });
    } catch (error) {
        res.status(500).json({ status: 500, message: `Hay un error: ${error}` })
    }
}