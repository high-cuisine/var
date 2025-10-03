import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  
  // Enable CORS
  const allowedOrigins = [
    'http://localhost:5173', 
    'http://client:3000',
    'http://77.95.206.67:5173',
    'http://77.95.206.67:3002',
    '*'
  ];
  
  // Add dynamic origins from environment
  if (process.env.ALLOWED_ORIGINS) {
    allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
  }
  
  app.enableCors({
    origin: allowedOrigins,
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
