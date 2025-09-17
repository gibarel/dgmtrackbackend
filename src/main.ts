import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades extra
      forbidNonWhitelisted: true, // si mandan props de más, error 400
      transform: true, // transforma tipos (params/query) a number/boolean/etc
    }),
  );

  app.enableCors({ origin: 'http://localhost:4200' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
