import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'ms1', 
        port: 3001, // El puerto donde escuchará este microservicio
      },
    },
  );

  // Iniciar el microservicio
  await app.listen();
}

bootstrap();
