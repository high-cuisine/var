import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://client:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'assets'), {
    prefix: '/assets'
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(3001);
}
bootstrap();
