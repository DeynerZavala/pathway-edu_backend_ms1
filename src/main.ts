import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS sin restricciones (NO RECOMENDADO PARA PRODUCCIÓN)
  app.enableCors({
    origin: '*', // Permite cualquier origen
    methods: 'GET,POST,PUT,DELETE', // Permite estos métodos
    allowedHeaders: '*', // Permite cualquier cabecera
    credentials: false, // No requiere credenciales
  });

  await app.listen(3000);
}
bootstrap();
