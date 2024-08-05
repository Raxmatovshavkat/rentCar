import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarFindexDto } from './dto/create-car-findex.dto';
import { UpdateCarFindexDto } from './dto/update-car-findex.dto';

@Injectable()
export class CarFindexService {
  constructor(private prisma: PrismaService) { }

  async create(createCarFindexDto: CreateCarFindexDto) {
    return this.prisma.carFindex.create({
      data: createCarFindexDto,
    });
  }

  async findAll() {
    return this.prisma.carFindex.findMany();
  }

  async findOne(id: number) {
    const carFindex = await this.prisma.carFindex.findUnique({
      where: { id },
    });
    if (!carFindex) {
      throw new NotFoundException(`CarFindex with ID ${id} not found`);
    }
    return carFindex;
  }

  async update(id: number, updateCarFindexDto: UpdateCarFindexDto) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.carFindex.update({
      where: { id },
      data: updateCarFindexDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.carFindex
  }
}