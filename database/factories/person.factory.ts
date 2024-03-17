import { setSeederFactory } from "typeorm-extension";
import { Person } from "src/persons/entities/person.entity";

export default setSeederFactory(Person, (faker) => {
    const person = new Person()
    person.firstName = faker.person.firstName()
    person.secondName = faker.person.middleName()
    person.lastName = faker.person.lastName()
    person.mothersLastName = faker.person.middleName()
    person.birthDate = faker.date.birthdate()
    person.direction = faker.location.streetAddress()
    person.identityCard = faker.number.int({min: 10000000, max: 99999999}).toString()
    person.gender = faker.person.sex() == 'male' ? 'Masculino' : 'Femenino'
    return person
})