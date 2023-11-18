import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT, '0.0.0.0');
  Logger.log(`Server has been launched on ${await app.getUrl()} 🚀`);
}
void bootstrap();
