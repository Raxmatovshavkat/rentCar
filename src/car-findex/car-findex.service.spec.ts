import { Test, TestingModule } from '@nestjs/testing';
import { CarFindexService } from './car-findex.service';

describe('CarFindexService', () => {
  let service: CarFindexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarFindexService],
    }).compile();

    service = module.get<CarFindexService>(CarFindexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
