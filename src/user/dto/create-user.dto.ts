import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    first_name : string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    last_name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    username: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Length(3, 50)
    email: string

    @ApiProperty()
    @IsStrongPassword()
    @IsNotEmpty()
    @Length(3, 50)
    password: string    
}