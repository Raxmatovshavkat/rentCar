import { Module } from '@nestjs/common';
import { CarFindexService } from './car-findex.service';
import { CarFindexController } from './car-findex.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CarFindexController],
  providers: [CarFindexService, PrismaService],
})
export class CarFindexModule {}
