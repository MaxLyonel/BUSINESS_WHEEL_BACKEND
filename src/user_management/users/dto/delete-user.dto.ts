import { IsNotEmpty, IsNumberString, IsPositive } from "class-validator"

export class DeleteUserDto {

    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsNumberString({}, {message: "El $property debe ser una cadena numerica"})
    id: number
}