import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarFindexDto } from './dto/create-car-findex.dto';
import { UpdateCarFindexDto } from './dto/update-car-findex.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class CarFindexService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService) { }

  async create(createCarFindexDto: CreateCarFindexDto) {
    return this.prisma.carFindex.create({
      data: createCarFindexDto,
    });
  }

  async findAll() {
    try {
      const cachedcarFindex = await this.cacheManager.get('carFindex')
      if (cachedcarFindex) {
        return cachedcarFindex
      }
      const carFindex = await this.prisma.user.findMany();
      await this.cacheManager.set('carFindex', carFindex, 3600)
      return carFindex
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve carFindex');
    }
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