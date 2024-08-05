import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsEnum, isNotEmpty, Min, Max } from "class-validator";
import { CarType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCarDto {
    @ApiProperty()
    @IsEnum(CarType)
    @IsNotEmpty()
    type : CarType
    
    @ApiProperty()
    @IsNumber()
    @Min(2000)
    @Max(3000)
    @IsNotEmpty()
    year : number

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isAviable : boolean
}
