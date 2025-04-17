interface IAppointmentDto {
    date: Date,
    time: string,
    description: string,
    status: "active" | "cancelled"
}

export default IAppointmentDto;

