import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";
export class CreateColorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    colour : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    carId : number
}
