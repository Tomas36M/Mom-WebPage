import IAppointmentDto from "../dto/appointmentDto";
import { getUserByIdService } from "./userService";
import { Appointment } from "../entities/Appointment";
import { AppointmentModel } from "../config/data-source";
import { EntityManager, Between } from "typeorm";

const MAX_APPOINTMENTS_PER_DAY = 10; // Máximo de citas por día

export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentModel.find({
        relations: {
            user: true
        }
    });
    return appointments
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    const user: Appointment | null = await AppointmentModel.findOne({
        where: { id },
        relations: { user: true }
    });
    return user
}

export const createAppointmentService = async (
    appointmentData: IAppointmentDto,
    id: number,
    entityManager: EntityManager
): Promise<Appointment | null | string> => {
    const user = await getUserByIdService(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const appointmentDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);

    if (isNaN(appointmentDateTime.getTime())) {
        throw new Error('Formato de fecha u hora inválido');
    }

    // Validar que la cita sea al menos un día después de la fecha actual
    const currentDate = new Date();
    const oneDayAfter = new Date(currentDate);
    oneDayAfter.setDate(currentDate.getDate() + 1);

    if (appointmentDateTime < oneDayAfter) {
        throw new Error('La cita debe ser al menos un día después de la fecha actual');
    }

    // Validar que no haya citas en el mismo horario
    const existingAppointment = await entityManager.findOne(Appointment, {
        where: {
            date: appointmentDateTime
        }
    });

    if (existingAppointment) {
        throw new Error('Ya existe una cita en el mismo horario');
    }

    // Validar si el día está lleno de citas
    const startOfDay = new Date(appointmentDateTime);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(appointmentDateTime);
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentsCount = await entityManager.count(Appointment, {
        where: {
            date: Between(startOfDay, endOfDay)
        }
    });

    if (appointmentsCount >= MAX_APPOINTMENTS_PER_DAY) {
        throw new Error(`La agenda para el día ${appointmentData.date} está llena`);
    }

    // Crear y guardar la cita
    const newAppointment = entityManager.create(Appointment, {
        ...appointmentData,
        date: appointmentDateTime,
        user: user,
    });

    return await entityManager.save(newAppointment);
};

export const cancelAppointmentService = async (id: number): Promise<string> => {

    const appointment = await AppointmentModel.findOneBy({ id });

    if (!appointment) {
        return 'El appointment no existe';
    }

    appointment.status = "cancelled";

    await AppointmentModel.save(appointment);

    return `El turno con id ${id} ha sido cancelado.`;
}

export const deleteAppointmentService = async (id: number): Promise<string> => {

    const appointment = await AppointmentModel.findOneBy({ id });

    if (!appointment) {
        throw new Error('El appointment no existe');
    }

    await AppointmentModel.remove(appointment);

    return `El turno con id ${id} ha sido eliminado`;
}