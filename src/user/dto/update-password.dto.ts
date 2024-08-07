import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @ApiProperty({ example: 'oldpassword123', description: 'The old password of the user' })
    @IsString()
    @MinLength(6)
    old_password: string;

    @ApiProperty({ example: 'newpassword123', description: 'The new password of the user' })
    @IsString()
    @MinLength(6)
    new_password: string;
}
