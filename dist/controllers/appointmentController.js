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
exports.deleteAppointmentController = exports.cancelAppointmentController = exports.createAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const data_source_1 = require("../config/data-source");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentService)();
        if (appointments.length === 0)
            res.status(404).json({ message: "No hay appointments en este momento, agenda uno" });
        else
            res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(idNum);
        if (!appointment)
            res.status(404).json({ message: `El appointment con id ${idNum} no existe` });
        else
            res.status(200).json(appointment);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: appointmentData, params: { id } } = req;
        const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, appointmentService_1.createAppointmentService)(appointmentData, Number(id), entityManager);
        }));
        if (result) {
            res.status(201).json(result);
        }
        else {
            res.status(400).json({ message: 'No se pudo crear la cita' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createAppointmentController = createAppointmentController;
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const idNum = parseInt(appointmentId);
        const result = yield (0, appointmentService_1.cancelAppointmentService)(idNum);
        if (!result) {
            res.status(404).json({ message: result });
        }
        else {
            res.status(200).json({ message: result });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
const deleteAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const idNum = parseInt(appointmentId);
        const result = yield (0, appointmentService_1.deleteAppointmentService)(idNum);
        if (!result) {
            res.status(404).json({ message: result });
        }
        else {
            res.status(200).json({ message: result });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAppointmentController = deleteAppointmentController;
