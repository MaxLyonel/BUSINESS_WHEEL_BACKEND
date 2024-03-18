import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const logger = new Logger('Bootstrap')
  await app.listen(configService.get<number>('PORT'))
  logger.log(`**** Servidor corriendo en ${await app.getUrl()} *****`)
}
bootstrap()
