import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Permission } from "src/user_management/permissions/entities/permission.entity";

export class CreateRoleDto {
   @IsNotEmpty({ message: 'El $property es obligatorio'})
   @IsString({ message:'El $property debe ser una cadena'})
   name: string

   @IsNotEmpty({ message: 'El $property es obligatorio'})
   @IsString({ message:'El $property debe ser una cadena'})
   displayName: string

   @IsOptional()
   permission: Permission[]
}
