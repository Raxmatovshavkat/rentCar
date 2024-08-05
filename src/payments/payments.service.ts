import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

  async create(createPaymentDto: CreatePaymentDto, userId : number) {
    return this.prisma.payments.create({
      data: {...createPaymentDto, userId}
    });
  }

  async findAll() {
    return this.prisma.payments.findMany();
  }

  async findOne(id: number) {
    const payment = await this.prisma.payments.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.payments.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if the record exists
    return this.prisma.payments.delete({
      where: { id },
    });
  }
}
