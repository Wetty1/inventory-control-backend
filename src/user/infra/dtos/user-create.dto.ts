import { IsEmail, IsString, Matches } from 'class-validator';

export class UserCreateDto {
    @IsString()
    name: string;

    @IsString()
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    password: string;

    @IsEmail()
    email: string;
}
