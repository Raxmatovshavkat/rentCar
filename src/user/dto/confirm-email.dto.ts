import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmEmailDto {
    @ApiProperty({ example: 'token123', description: 'The email confirmation token' })
    @IsString()
    token: string;
}
