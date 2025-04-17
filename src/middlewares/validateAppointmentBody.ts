import { Request, Response, NextFunction } from 'express';
import { addYears, parseISO, getDay } from 'date-fns';

export const validateAppointmentBody = (req: Request, res: Response, next: NextFunction): void => {
    const { date, time, status, description } = req.body;

    // Verificar campos requeridos
    if (!date || !time || !status) {
        res.status(400).json({
            message: 'Los campos date, time y status son requeridos'
        });
        return;
    }

    const currentDate = new Date();
    const appointmentDate = parseISO(date);

    // Validar que la fecha no sea pasada
    if (appointmentDate < currentDate) {
        res.status(400).json({
            message: 'La fecha no puede ser en el pasado'
        });
        return;
    }

    // Validar que la fecha no sea más de un año en el futuro
    if (appointmentDate > addYears(currentDate, 1)) {
        res.status(400).json({
            message: 'La fecha no puede ser más de un año en el futuro'
        });
        return;
    }

    // Validar que la cita no sea en fin de semana
    const dayOfWeek = getDay(appointmentDate);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        res.status(400).json({
            message: 'No se pueden agendar citas los fines de semana'
        });
        return;
    }

    // Validar que la hora esté entre las 7:00 y las 17:00
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 7 || hours > 17 || (hours === 17 && minutes > 0)) {
        res.status(400).json({
            message: 'La hora debe estar entre las 7:00 y las 17:00'
        });
        return;
    }

    // Validar que la descripción no tenga más de 100 caracteres
    if (description && description.length > 100) {
        res.status(400).json({
            message: 'La descripción debe tener un máximo de 100 caracteres'
        });
        return;
    }

    next();
};