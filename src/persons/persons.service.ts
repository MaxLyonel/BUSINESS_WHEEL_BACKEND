import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DataSource } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {

  constructor(private dataSource: DataSource) {}

  async create(createPersonDto: CreatePersonDto) {
    const newPerson = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values(createPersonDto)
      .execute()
    return newPerson ?? null
  }

  async findAll() {
    const persons = await this.dataSource
      .getRepository(Person)
      .createQueryBuilder("person")
      .getMany()
    return persons ?? null
  }

  async findOne(id: number) {
    const person = await this.dataSource
      .getRepository(Person)
      .createQueryBuilder("person")
      .where("person.id = :id", { id })
      .getOne()
    return person ?? null
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
