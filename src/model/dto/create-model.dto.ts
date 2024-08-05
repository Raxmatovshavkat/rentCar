import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateModelDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    model : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    carId : number
}
