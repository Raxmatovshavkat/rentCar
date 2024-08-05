import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(private prismaService : PrismaService){}
  create(createColorDto: CreateColorDto) {
    return this.prismaService.colour.create({data : {...createColorDto}})
  }

  findAll() {
    return this.prismaService.colour.findMany()
  }

  findOne(id: number) {
    return this.prismaService.colour.findFirst({where : {id:id}})
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return this.prismaService.colour.update({where : {id : id}, data : {...updateColorDto}})
  }

  remove(id: number) {
    return this.prismaService.colour.delete({where : {id : id}})
  }
}
