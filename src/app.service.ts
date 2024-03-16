import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor( private configService: ConfigService ) {}

  init (): string {
    interface DatabaseConfig {
      host:string,
      port: number
    }
    const dbConfig = this.configService.get<DatabaseConfig>('database')

    return this.configService.get<string>('database.user', 'leonel')
  }

}
