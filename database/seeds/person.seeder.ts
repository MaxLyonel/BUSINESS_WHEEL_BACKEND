import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Person } from 'src/persons/entities/person.entity';

export class PersonSeeder implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const personFactory = await factoryManager.get(Person)
        await personFactory.saveMany(30)
    }
}
