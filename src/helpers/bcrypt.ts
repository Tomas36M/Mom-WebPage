import bcrypt from 'bcrypt';

const saltRounds = 10; // Número de rondas de hashing

// Función para hashear una contraseña
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

// Función para comparar una contraseña con su hash
export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};