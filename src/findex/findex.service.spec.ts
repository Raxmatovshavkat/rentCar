import { Test, TestingModule } from '@nestjs/testing';
import { FindexService } from './findex.service';

describe('FindexService', () => {
  let service: FindexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindexService],
    }).compile();

    service = module.get<FindexService>(FindexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
