import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbigeoService } from './ubigeo.service';
import { UbigeoController } from './ubigeo.controller';
import { Ubigeo } from './ubigeo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Ubigeo])],
  controllers: [UbigeoController],
  providers: [UbigeoService],
  exports: [UbigeoService], // Exporta el servicio si es necesario en otros módulos
})
export class UbigeoModule {}
