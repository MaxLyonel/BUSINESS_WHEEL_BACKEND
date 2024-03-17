import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Permission } from "src/user_management/permissions/entities/permission.entity";
export default class PermissionSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const permissionFactory = factoryManager.get(Permission)
        await permissionFactory.saveMany(3)
    }
}