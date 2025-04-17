import { Request, Response, NextFunction } from 'express';


export const validateAppointmentId = (req: Request, res: Response, next: NextFunction): void => {

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