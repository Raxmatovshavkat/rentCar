import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, ValidateIf } from "class-validator";
// import { IsEmailOrUsername } from "src/custom_validator/IsEmailOrUsername";
import { IsEmailOrUsername } from "src/custom validator/IsEmailOrUsername";

export class LoginUserDto {
    @ApiProperty()
    @ValidateIf(o => o.email !== undefined)
    @IsEmail()
    @IsString()
    email?: string;

    @ValidateIf(o => o.username !== undefined)
    @IsString()
    username?: string;

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmailOrUsername({
        message: 'Either email or username must be provided, but not both.',
    })
    emailOrUsername: string; // This is just a dummy property to apply the custom validator
}
