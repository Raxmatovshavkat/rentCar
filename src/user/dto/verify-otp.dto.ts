import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";
export class VeryifyOtpDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email : string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp : string
}