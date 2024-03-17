import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "src/user_management/users/entities/user.entity";
export class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const personFactory = await factoryManager.get(User)
        await personFactory.saveMany(5)
    }
}