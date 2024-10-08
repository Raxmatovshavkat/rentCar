import { Module } from '@nestjs/common';
import { FindexService } from './findex.service';
import { FindexController } from './findex.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FindexController],
  providers: [FindexService, PrismaService],
})
export class FindexModule {}
