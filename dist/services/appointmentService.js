"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointmentService = exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const userService_1 = require("./userService");
const Appointment_1 = require("../entities/Appointment");
const data_source_1 = require("../config/data-source");
const typeorm_1 = require("typeorm");
const MAX_APPOINTMENTS_PER_DAY = 10; // Máximo de citas por día
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield data_source_1.AppointmentModel.find({
        relations: {
            user: true
        }
    });
    return appointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppointmentModel.findOne({
        where: { id },
        relations: { user: true }
    });
    return user;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentData, id, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.getUserByIdService)(id);
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
    const existingAppointment = yield entityManager.findOne(Appointment_1.Appointment, {
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
    const appointmentsCount = yield entityManager.count(Appointment_1.Appointment, {
        where: {
            date: (0, typeorm_1.Between)(startOfDay, endOfDay)
        }
    });
    if (appointmentsCount >= MAX_APPOINTMENTS_PER_DAY) {
        throw new Error(`La agenda para el día ${appointmentData.date} está llena`);
    }
    // Crear y guardar la cita
    const newAppointment = entityManager.create(Appointment_1.Appointment, Object.assign(Object.assign({}, appointmentData), { date: appointmentDateTime, user: user }));
    return yield entityManager.save(newAppointment);
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.findOneBy({ id });
    if (!appointment) {
        return 'El appointment no existe';
    }
    appointment.status = "cancelled";
    yield data_source_1.AppointmentModel.save(appointment);
    return `El turno con id ${id} ha sido cancelado.`;
});
exports.cancelAppointmentService = cancelAppointmentService;
const deleteAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.findOneBy({ id });
    if (!appointment) {
        throw new Error('El appointment no existe');
    }
    yield data_source_1.AppointmentModel.remove(appointment);
    return `El turno con id ${id} ha sido eliminado`;
});
exports.deleteAppointmentService = deleteAppointmentService;
