import { Router } from "express";
import { getAppointmentsController, getAppointmentByIdController, cancelAppointmentController, createAppointmentController, deleteAppointmentController } from "../controllers/appointmentController";
import { validateUserId } from '../middlewares/validUserId';
import { validateAppointmentBody } from '../middlewares/validateAppointmentBody';
import { validateAppointmentId } from "../middlewares/validateAppointmentId";

const appointmentRoutes: Router = Router();


appointmentRoutes.get('/', getAppointmentsController);
appointmentRoutes.get('/:id', validateAppointmentId ,getAppointmentByIdController);
appointmentRoutes.post('/:id', validateUserId, validateAppointmentBody, createAppointmentController);
appointmentRoutes.put('/:id', cancelAppointmentController);
appointmentRoutes.delete('/:id', deleteAppointmentController);

export default appointmentRoutes;