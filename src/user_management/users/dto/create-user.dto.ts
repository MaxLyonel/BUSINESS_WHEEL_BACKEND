import { IsBoolean, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from "class-validator"
import { isPersonAlreadyExists } from "../validation/validation-pipe/isPersonAlreadyExists"

export class CreateUserDto {
    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsString({ message: 'El $property debe ser una cadena de texto' })
    @MinLength(8, { message: "El $property debe tener mas o igual a $constraint1 caracteres" })
    username: string

    @IsNotEmpty({ message: 'El $property es obligatorio' })
    @IsString({ message: 'El $property debe ser una cadena de texto' })
    @MinLength(8, { message: "El $property debe tener mas o igual a $constraint1 caracteres" })
    password:string

    @IsOptional()
    @IsBoolean({ message: 'El $property debe ser de tipo boolean'})
    active: boolean

    @IsNotEmpty({ message: 'El id de persona es obligatorio' })
    @IsPositive({ message: "El campo $property debe ser un numero positivo"})
    @isPersonAlreadyExists({ message: 'El id persona ya esta en uso con otro usuario' })
    person: number

}