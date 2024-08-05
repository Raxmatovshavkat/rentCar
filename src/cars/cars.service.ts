import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prismaService : PrismaService){}
  async create(createCarDto: CreateCarDto) {
    return this.prismaService.cars.create({data : {...createCarDto}})
  }

  findAll() {
    return this.prismaService.cars.findMany()
  }

  findOne(id: number) {
    return this.prismaService.cars.findFirst({where : {id : id}})
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prismaService.cars.update({where : {id:id}, data : {...updateCarDto}})
  }

  remove(id: number) {
    return this.prismaService.cars.delete({where : {id : id}})
  }
}
