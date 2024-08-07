import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'token123', description: 'The password reset token' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'newpassword123', description: 'The new password' })
    @IsString()
    @MinLength(6)
    new_password: string;
}
