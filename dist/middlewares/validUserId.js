"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = void 0;
const validateUserId = (req, res, next) => {
    // Obtener el ID del usuario desde los parámetros de la URL
    const userIdParam = req.params.id;
    if (!userIdParam) {
        res.status(400).json({
            message: 'El ID de usuario es requerido en la URL'
        });
        return;
    }
    // Convertir el ID a número
    const userId = parseInt(userIdParam, 10);
    if (isNaN(userId)) {
        res.status(400).json({
            message: 'El ID de usuario debe ser un número válido'
        });
        return;
    }
    // Asignar el ID al cuerpo de la solicitud para usarlo en el servicio
    req.body.userId = userId;
    next();
};
exports.validateUserId = validateUserId;
