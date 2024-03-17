import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(private dataSource: DataSource) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(createPermissionDto)
      .execute()
    if(newPermission) return [
      {
        error: false,
        message: "Permiso creado exitosamente",
        data: [ newPermission ]
      }
    ]
    else return [
      {
        error: true,
        message: "No se creo el permiso",
        data: []
      }
    ]
  }

  async findAll() {
    const permissions = await this.dataSource
      .getRepository(Permission)
      .createQueryBuilder("permission")
      .getMany()
    if(permissions) return [
      {
        error: false,
        message: "Permisos encontrados",
        data: permissions
      }
    ]
    else return [
      {
        error: true,
        message: "No se puede obtener los permisos",
        data: []
      }
    ]
  }

  async findOne(id: number) {
    const permission = await this.dataSource
      .getRepository(Permission)
      .createQueryBuilder("permission")
      .where("permission.id = :id", { id })
      .getOne()
    if(permission) return [
      {
        error: false,
        message: "Permiso encontrado",
        data: [ permission ]
      }
    ]
    else return [
      {
        error: true,
        message: "No se pudo encontrar el permiso",
        data: []
      }
    ]
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatePermission = await this.dataSource
      .createQueryBuilder()
      .update(Permission)
      .set(updatePermissionDto)
      .where("id = :id", { id })
      .execute()
    if(updatePermission) return [
      {
        error: false,
        message: "Permiso actualizado exitosamente",
        data: [ updatePermission ]
      }
    ]
    else return [
      {
        error: true,
        message: "No se pudo actualizar el permiso",
        data: []
      }
    ]
  }

  async remove(id: number) {
    const deletePermission = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Permission)
      .where("id = :id", { id })
      .execute()
    if(deletePermission) return [
      {
        error: false,
        message: "Permiso elimnado exitosamente",
        data: [ deletePermission ]
      }
    ]
    else return [
      {
        error: true,
        message: "No se pudo eliminar el permiso",
        data: []
      }
    ]
  }
}