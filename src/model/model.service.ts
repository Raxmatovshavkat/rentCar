import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private prismaService : PrismaService){}
  create(createModelDto: CreateModelDto) {
    return this.prismaService.model.create({data : {...createModelDto}})
  }

  findAll() {
    return this.prismaService.model.findMany()
  }

  findOne(id: number) {
    return this.prismaService.model.findFirst({where : {id : id}})
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return this.prismaService.model.update({where : {id : id }, data : {...updateModelDto}})
  }

  remove(id: number) {
    return this.prismaService.model.delete({where : {id : id}})
  }
}
