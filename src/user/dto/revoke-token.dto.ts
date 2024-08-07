import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RevokeTokenDto {
    @ApiProperty({ example: 'refreshToken123', description: 'The refresh token to revoke' })
    @IsString()
    refresh_token: string;
}
