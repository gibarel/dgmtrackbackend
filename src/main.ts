import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para que el frontend Angular (localhost:4200) pueda llamar a la API
  app.enableCors({
    origin: 'http://localhost:4200', // o '*' si querés permitir cualquier origen
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
