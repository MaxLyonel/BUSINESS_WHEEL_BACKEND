import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsNumberString({}, {message: "El $property debe ser una cadena numerica"})
    id: number

    @IsOptional()
    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsString({ message: 'El $property debe ser una cadena de texto' })
    @MinLength(8, { message: "El $property debe tener mas o igual a $constraint1 caracteres" })
    username: string

    @IsOptional()
    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsString({ message: 'El $property debe ser una cadena de texto' })
    @MinLength(8, { message: "El $property debe tener mas o igual a $constraint1 caracteres" })
    password?: string;

    @IsOptional()
    @IsBoolean({ message: 'El $property debe ser de tipo boolean'})
    active: boolean

    token: string
}
