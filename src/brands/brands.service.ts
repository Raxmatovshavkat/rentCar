import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prismaService: PrismaService) { }
  create(createBrandDto: CreateBrandDto) {
    return this.prismaService.brands.create({ data: { ...createBrandDto } })
  }

  findAll() {
    return this.prismaService.brands.findMany()
  }

  findOne(id: number) {
    return this.prismaService.brands.findFirst({ where: { id: id } })
  }

  update(id: number, updateColorDto: UpdateBrandDto) {
    return this.prismaService.brands.update({ where: { id: id }, data: { ...updateColorDto } })
  }

  remove(id: number) {
    return this.prismaService.brands.delete({ where: { id: id } })
  }
}

