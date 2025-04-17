interface IUserDto {
    name: string;
    username: string;
    password: string;
    active: boolean;
    email: string;
    birthdate: Date;
    nDni: string;
    profile_img?: string;
}

export default IUserDto;