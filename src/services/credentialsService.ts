import { Credentials } from "../entities/Credentail";
import { CredentialsModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";
import { EntityManager } from "typeorm";
import { hashPassword, comparePassword } from "../helpers/bcrypt"

export const createCredentialsService = async (
    username: string,
    password: string,
    entityManager: EntityManager
): Promise<number> => {
    const existingCredential = await CredentialsModel.findOne({
        where: { username },
    });
    if (existingCredential) {
        throw new Error("Username already exists");
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await hashPassword(password);

    const newCredential: Credentials = entityManager.create(Credentials, {
        username,
        password: hashedPassword,
    });
    const result: Credentials = await CredentialsModel.save(newCredential);
    return result.id;
};

export const loginService = async (
    username: string,
    password: string
): Promise<User | null> => {
    // Buscar solo por username
    const credential = await CredentialsModel.findOne({
        where: { username },
    });

    if (!credential) return null;

    // Comparar contraseña con hash almacenado
    const isPasswordValid = await comparePassword(password, credential.password);
    if (!isPasswordValid) return null;

    // Buscar usuario asociado (ajusta según tu modelo de datos)
    const user = await UserModel.findOne({
        where: { id: credential.id },
        relations: {
            credentials: true,
            appointments: true,
        },
    });

    return user;
};

