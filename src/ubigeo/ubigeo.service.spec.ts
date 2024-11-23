import { Test, TestingModule } from '@nestjs/testing';
import { UbigeoService } from './ubigeo.service';

describe('UbigeoService', () => {
  let service: UbigeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbigeoService],
    }).compile();

    service = module.get<UbigeoService>(UbigeoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
