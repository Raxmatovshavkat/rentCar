import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,  IsNotEmpty } from "class-validator";
export class CreateFindexDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    score :number
}
