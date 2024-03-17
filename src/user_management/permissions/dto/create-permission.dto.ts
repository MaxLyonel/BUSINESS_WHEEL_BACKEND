import { IsNotEmpty, IsString } from "class-validator"
export class CreatePermissionDto {

   @IsNotEmpty({ message: 'El $property es obligatorio'})
   @IsString({ message:'El $property debe ser una cadena'})
   name:string

   @IsNotEmpty({ message: 'El $property es obligatorio'})
   @IsString({ message:'El $property debe ser una cadena'})
   displayName:string

}
