import { Module }                      from '@nestjs/common'
import { TypeOrmModule }               from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController }               from './app.controller'
import { AppService }                  from './app.service'

/* sub-modules */
import { AuthenticationModule }        from './authentication/authentication.module'
import { UsersManagement }             from './user_management/userManagement.module'
import { PersonsModule }               from './persons/persons.module'

/* external */
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity.{js,ts}'],
          synchronize: true,
          entityPrefix: 'business_'
        }
      }
    }),
    AuthenticationModule,
    UsersManagement,
    PersonsModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
