import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';  // Importa ConfigModule y ConfigService
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { GenderModule } from './gender/gender.module';

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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,  // Desactivar en producción
      }),
    }),
    UsersModule,
    RoleModule,
    GenderModule,
  ],
})
export class AppModule {}
