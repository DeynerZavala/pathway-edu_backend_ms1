import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { GenderModule } from './gender/gender.module';
import { UbigeoController } from './ubigeo/ubigeo.controller';
import { UbigeoModule } from './ubigeo/ubigeo.module';

@Module({
  imports: [
    // ConfigModule para cargar las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables estén disponibles globalmente
    }),
    // Configuración de TypeORM usando variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isSSL = configService.get('DB_SSL') === 'true'; // Variable de entorno para habilitar/deshabilitar SSL
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          ssl: isSSL
            ? {
                rejectUnauthorized: false,
              }
            : false, // Deshabilita SSL si no es necesario
          autoLoadEntities: true,
          synchronize: true, // Desactivar en producción
        };
      },
    }),
    UsersModule,
    RoleModule,
    GenderModule,
    UbigeoModule,
    UbigeoModule,
  ],
  controllers: [UbigeoController],
  providers: [],
})
export class AppModule {}
