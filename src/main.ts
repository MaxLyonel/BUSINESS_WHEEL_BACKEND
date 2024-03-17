import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('Bootstrap')
  await app.listen(3000);
  logger.log(`**** Servidor corriendo en ${await app.getUrl()} *****`)
}
bootstrap();
