import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyEmailDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user to verify' })
    @IsEmail()
    email: string;
}
