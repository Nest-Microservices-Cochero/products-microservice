import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');

  ///1) Modificamos el app de la siguiente manera
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      //- medio de trasporte
      transport: Transport.TCP,
      options: {
        //- puerto en el cual nuestro micro va a estar escuchando
        port: envs.port,
      },
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  ///
  await app.listen();

  logger.log(`Products Microservice running on port ${envs.port}`);
}
bootstrap();
