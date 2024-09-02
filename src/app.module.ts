import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'PathwayEdu',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RoleModule,
    GenderModule,
  ],
})
export class AppModule {}
