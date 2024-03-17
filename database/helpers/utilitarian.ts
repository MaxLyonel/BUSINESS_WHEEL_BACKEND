import dataSource from "database/config/ormconfig";
// import { EmployeeType } from "src/employees/employee_types/entities/employee_type.entity";
import { Person } from "src/persons/entities/person.entity";

function shuffleArray(array: any[]) {
    const copyArray = [...array]; // Copia del array original
    const shuffledArray = [];

    while (copyArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        const randomElement = copyArray.splice(randomIndex, 1)[0];
        shuffledArray.push(randomElement);
    }

    return shuffledArray;
}
function shuffleArray2(array: any[]) {
    const copyArray = [...array]; // Copia del array original
    const shuffledArray = [];

    while (copyArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        const randomElement = copyArray.splice(randomIndex, 1)[0];
        shuffledArray.push(randomElement);
    }

    return shuffledArray;
}

export async function getAllAvailablePersonIds(): Promise<number[]> {
    const personIds = await dataSource.getRepository(Person)
                        .createQueryBuilder('person')
                        .select('person.id')
                        .getMany()
    // Mezcla aleatoriamente las IDs de persona para evitar duplicados
    const shuffledPersonIds = shuffleArray(personIds.map((person) => person.id))
    return shuffledPersonIds
}

// export async function getAllAvailableEmployeeTypeIds(): Promise<number[]> {
//     const employeeTypesIds = await dataSource.getRepository(EmployeeType)
//                                 .createQueryBuilder('employeeType')
//                                 .select('employeeType.id')
//                                 .getMany()
//     const shuffledPersonIds = shuffleArray2(employeeTypesIds.map((employeeType) => employeeType.id))
//     return shuffledPersonIds
// }
