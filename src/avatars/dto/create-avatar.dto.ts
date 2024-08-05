import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"
export class CreateAvatarDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatar_url: string
}
