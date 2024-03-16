import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('DATABASE_NAME'))
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity.{js,ts}'],
          synchronize: false,
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}