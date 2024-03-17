import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)
    return newUser ? {
      error: false,
      message: "Usuario creado exitosamente",
      data: [ createUserDto ]
    } : {
      error: true,
      message: "No se creo al usuario",
      data: []
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return users ? {
      error: false,
      message: "Listado de usuarios",
      data: users
    } : {
      error: true,
      message: "No se encontraron usuarios",
      data: []
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(+id)
    return user ? {
      error: false,
      message: 'Usuario encontrado',
      data: [ user ]
    } : {
      error: true,
      message: 'Usuario no encontrado',
      data: []
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe) updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersService.update(+id, updateUserDto)
    return updateUser ? {
      error: false, 
      message: "Usuario actualizado exitosamente",
      data: [ updateUser]
    } : {
      error: true,
      message: "No se pudo actualizar al usuario",
      data: []
    }
  }

  @Delete(':id')
  async remove(@Param(new ValidationPipe) params: DeleteUserDto) {
    const userId = params.id
    const deleteUser = await this.usersService.remove(userId)
    return deleteUser ? {
      error: false,
      message: "Usuario elimnado exitosamente!",
      data: [ deleteUser ]
    } : {
      error: true,
      message: "No se pudo eliminar al usuario",
      data: []
    }
  }
}
