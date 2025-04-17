import { getAppointmentService, getAppointmentByIdService, createAppointmentService, cancelAppointmentService, deleteAppointmentService } from "../services/appointmentService";
import e, { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";


export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await getAppointmentService();
        if (appointments.length === 0) res.status(404).json({ message: "No hay appointments en este momento, agenda uno" })
        else res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({ message: `Hay un error: ${error}` });
    }
}

export const getAppointmentByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const idNum: number = parseInt(id);
        const appointment = await getAppointmentByIdService(idNum);
        if (!appointment) res.status(404).json({ message: `El appointment con id ${idNum} no existe` });
        else res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const createAppointmentController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body: appointmentData, params: { id } } = req;
        const result = await AppDataSource.transaction(async (entityManager) => {
            return await createAppointmentService(appointmentData, Number(id), entityManager);
        });

        if (result) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: 'No se pudo crear la cita' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const cancelAppointmentController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentId = req.params.id 
        const idNum: number = parseInt(appointmentId);
        const result = await cancelAppointmentService(idNum);
        if (!result) {
            res.status(404).json({ message: result });
        }  else {
            res.status(200).json({ message: result });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });   
    }
};

export const deleteAppointmentController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentId = req.params.id 
        const idNum: number = parseInt(appointmentId);
        const result = await deleteAppointmentService(idNum);
        if (!result) {
            res.status(404).json({ message: result });
        }  else {
            res.status(200).json({ message: result });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};