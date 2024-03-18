
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

ConfigModule.forRoot({
    envFilePath: '.env'
});

const options = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'postgres',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrationsRun: true,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.{js,ts}'],
    migrationsTableName: 'migration',
    migrations: ['dist/**/migrations/*.js'],
    seeds: ['dist/**/init.seeder.js'],
    factories: ['dist/**/*.factory.{js,ts}']
};

const dataSource = new DataSource(
    options as DataSourceOptions & SeederOptions
);

dataSource.initialize()
.then(() => {
    // console.log("Base de datos inicializada")
})
.catch((err) => {
    console.error("Base de dato no inicialidada\n", err)
})

export default dataSource;