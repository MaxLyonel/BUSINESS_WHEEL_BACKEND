import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

   @IsOptional()
   @IsNotEmpty({ message: 'El $property es obligatorio' })
   @IsString({ message: 'El $property debe ser una cadena de texto' })
   name: string

   @IsOptional()
   @IsNotEmpty({ message: 'El $property es obligatorio' })
   @IsString({ message: 'El $property debe ser una cadena de texto' })
   displayName: string;
}
