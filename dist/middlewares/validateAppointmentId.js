"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointmentId = void 0;
const validateAppointmentId = (req, res, next) => {
    const appointmentIdParam = req.params.id;
    if (!appointmentIdParam) {
        res.status(400).json({
            message: 'El ID del turno es requerido en los parámetros de la ruta'
        });
        return;
    }
    const appointmentId = parseInt(appointmentIdParam, 10);
    if (isNaN(appointmentId)) {
        res.status(400).json({
            message: 'El ID del turno debe ser un número válido'
        });
        return;
    }
    req.body.appointmentId = appointmentId;
    next();
};
exports.validateAppointmentId = validateAppointmentId;
