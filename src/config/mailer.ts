import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASSWORD } from './envs';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"Lina Maria Escalante" <${EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};