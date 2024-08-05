import { IsInt, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { paymentMethods, paymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    rentalId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsEnum(paymentMethods)
    @IsNotEmpty()
    method: paymentMethods;
}
