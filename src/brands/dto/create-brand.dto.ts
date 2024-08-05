import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";
export class CreateBrandDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    carId: number
}
