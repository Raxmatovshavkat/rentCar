import { Injectable } from '@nestjs/common';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarImagesService {
  constructor(private prismaService : PrismaService){}
  create(createCarImageDto: CreateCarImageDto) {
    return this.prismaService.carImages.create({data : {...createCarImageDto}})
  }

  findAll() {
    return this.prismaService.carImages.findMany()
  }

  findOne(id: number) {
    return this.prismaService.carImages.findFirst({where : {id : id}})
  }

  update(id: number, updateCarImageDto: UpdateCarImageDto) {
    return this.prismaService.carImages.update({where : { id : id}, data : {...updateCarImageDto}})
  }

  remove(id: number) {
    return this.prismaService.carImages.delete({where : {id : id}})
  }
}
