import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    const person = this.personsService.create(createPersonDto)
    return person ? {
      error: false,
      message: "Se creo a la persona",
      data: [ createPersonDto ]
    } : {
      error: true,
      message: "No se creo a la persona",
      data: []
    }
  }

  @Get()
  findAll() {
    const persons = this.personsService.findAll()
    return persons ? {
      error: false,
      message: "Todas las personas",
      data: persons
    } : {
      error: true,
      message: "No se pudo obtener a las personas",
      data: []
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const person = this.personsService.findOne(+id);
    return person ? {
      error: false,
      message: "Persona encontrada",
      data: [ person ]
    } : {
      error: true,
      message: "No se pudo obtener a la persona",
      data: []
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
