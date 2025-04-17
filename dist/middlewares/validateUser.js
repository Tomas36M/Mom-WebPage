"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req, res, next) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const { name, email, active, nDni, birthdate, username, password } = req.body;
    if (!name) {
        res.status(400).json({ message: "El campo 'nombre' es obligatorio" });
    }
    else if (!email) {
        res.status(400).json({ message: "El campo 'correo electrónico' es obligatorio" });
    }
    else if (!active) {
        res.status(400).json({ message: "El campo 'estado de actividad' es obligatorio" });
    }
    else if (!nDni) {
        res.status(400).json({ message: "El campo 'número de DNI' es obligatorio" });
    }
    else if (!birthdate) {
        res.status(400).json({ message: "El campo 'fecha de nacimiento' es obligatorio" });
    }
    else if (!username) {
        res.status(400).json({ message: "El campo 'nombre de usuario' es obligatorio" });
    }
    else if (!password) {
        res.status(400).json({ message: "El campo 'contraseña' es obligatorio" });
    }
    else if (!regex.test(password)) {
        res.status(400).json({ message: "El password debe contener al menos una letra mayúscula, un número y un carácter especial" });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
