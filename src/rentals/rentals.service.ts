import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) { }

  async create(createRentalDto: CreateRentalDto) {
    return this.prisma.rentals.create({
      data: createRentalDto,
    });
  }

  async findAll() {
    return this.prisma.rentals.findMany();
  }

  async findOne(id: number) {
    const rental = await this.prisma.rentals.findUnique({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.rentals.update({
      where: { id },
      data: updateRentalDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.rentals.delete({
      where: { id },
    });
  }
}
