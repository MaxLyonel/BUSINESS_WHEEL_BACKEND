import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .execute()
    return newUser
  }

  async activeUser(id: number) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .where("user.active = :active", { active: true })
      .getOne()
    return user ? true : false
  }

  async findAll() {
    const users = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.person", "person")
      .getMany()
    return users ?? null
  }

  async findOne(id: number) {
    const user: UpdateUserDto = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.person", "person")
      .where("user.id = :id", { id })
      .getOne()
    return user ?? null
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where("id =:id", { id })
      .execute()
    return updateUser
  }

  async remove(id: number) {
    const deleteUser = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id =:id", { id })
      .execute()
    return deleteUser
  }

  async findUser(username: string, password: string) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.username = :username", { username })
      .where("user.password = :password", { password })
      .getOne()
    return user
  }

  async findByPerson(id: number) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.person = :id", { id })
      .getOne()
    return user
  }
}
