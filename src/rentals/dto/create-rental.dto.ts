import { IsInt, IsNotEmpty, IsDate, IsDecimal, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    carId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    userId: number;

    // @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty()
    @IsDecimal()
    @IsNotEmpty()
    totalPrice: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
