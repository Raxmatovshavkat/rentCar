import { Test, TestingModule } from '@nestjs/testing';
import { CarFindexController } from './car-findex.controller';
import { CarFindexService } from './car-findex.service';

describe('CarFindexController', () => {
  let controller: CarFindexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarFindexController],
      providers: [CarFindexService],
    }).compile();

    controller = module.get<CarFindexController>(CarFindexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
