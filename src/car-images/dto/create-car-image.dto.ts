import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateCarImageDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    carId : number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    url : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    memtype : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    size : number
}
