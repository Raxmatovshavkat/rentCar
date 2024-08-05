import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateContactDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number : string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email : string
}
