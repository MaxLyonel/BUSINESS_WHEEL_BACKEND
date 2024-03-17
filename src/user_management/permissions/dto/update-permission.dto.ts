import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {

   @IsOptional()
   @IsNotEmpty({ message: 'El $property es obligatorio' })
   @IsString({ message: 'El $property debe ser una cadena de texto' })
   name: string

   @IsOptional()
   @IsNotEmpty({ message: 'El $property es obligatorio' })
   @IsString({ message: 'El $property debe ser una cadena de texto' })
   displayName: string;
}
