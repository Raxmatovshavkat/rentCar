import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsOptional } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @IsString()
    @MinLength(3)
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    @IsString()
    @MinLength(3)
    last_name: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: '+998901234567', description: 'The phone number of the user' })
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({ example: 'avatar-id', description: 'The ID of the user avatar' })
    @IsOptional()
    @IsString()
    avatarId?: number;
}
