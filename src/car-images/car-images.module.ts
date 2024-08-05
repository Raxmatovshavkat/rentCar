import { Module } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CarImagesController } from './car-images.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CarImagesController],
  providers: [CarImagesService, PrismaService],
})
export class CarImagesModule {}
