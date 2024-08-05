import { Injectable } from '@nestjs/common';
import { CreateFindexDto } from './dto/create-findex.dto';
import { UpdateFindexDto } from './dto/update-findex.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindexService {
  constructor(private prismaService: PrismaService) { }
  async create(createFindexDto: CreateFindexDto, userId: number) {
    const fIndex = await this.prismaService.fIndex.create({ data: { ...createFindexDto, userId } })
    return fIndex
  }

  findAll() {
    return this.prismaService.fIndex.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} findex`;
  }

  update(id: number, updateFindexDto: UpdateFindexDto) {
    return `This action updates a #${id} findex`;
  }

  remove(id: number) {
    return `This action removes a #${id} findex`;
  }
}
