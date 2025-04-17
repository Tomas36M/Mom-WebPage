import { EntityManager } from "typeorm";
import { AppDataSource, CredentialsModel, UserModel } from "../config/data-source";
import IUserDto from "../dto/userDto";
import { User } from "../entities/User";
import { createCredentialsService } from "./credentialsService";

export const createUserService = async (userData: IUserDto): Promise<User> => {
    try {
        const entityResult = await AppDataSource.transaction(async (entityManager: EntityManager) => {

            const existingUserByEmail = await UserModel.findOne({ where: { email: userData.email } });
            if (existingUserByEmail) {
                throw new Error('Email already exists');
            }

            const existingUserByNDni = await UserModel.findOne({ where: { nDni: userData.nDni } });
            if (existingUserByNDni) {
                throw new Error('nDni already exists');
            }

            const id = await createCredentialsService(userData.username, userData.password, entityManager);
            const credentials = await CredentialsModel.findOneBy({ id });
            if (!credentials) {
                throw new Error('Credentials not found');
            }
            const newUser: User = entityManager.create(User, {
                ...userData,
                credentials
            });
            return await entityManager.save(newUser);
        });
        return entityResult;
    } catch (error: any) {
        throw new Error(`User creation failed: ${error.message}`);
    }
};


export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserModel.findOne({
        where: { id },
        relations: {
            appointments: true,
            credentials: true
        }
    })
    return user
}


export const getUserService = async (): Promise<User[]> => {
    const users = await UserModel.find({
        relations: {
            credentials: true,
            appointments: true
        }
    });
    return users
}

export const deleteUserService = async (id: number): Promise<User | null> => {
    const userToDelete = await UserModel.findOneBy({ id })
    if (userToDelete !== null) {
        await UserModel.remove(userToDelete);
        return userToDelete
    } else {
        return null
    }
}