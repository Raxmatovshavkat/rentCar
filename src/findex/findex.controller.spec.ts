import { Test, TestingModule } from '@nestjs/testing';
import { FindexController } from './findex.controller';
import { FindexService } from './findex.service';

describe('FindexController', () => {
  let controller: FindexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindexController],
      providers: [FindexService],
    }).compile();

    controller = module.get<FindexController>(FindexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
