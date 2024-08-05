import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCarFindexDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    carId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    score: number;
}
