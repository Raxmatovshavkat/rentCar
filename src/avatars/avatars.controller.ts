import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Avatars')

@Controller('avatars')


export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}
  

  @Post()
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarsService.create(createAvatarDto);
  }

  @Get()
  GetAll(@Request() req) {
    console.log(req.user)
    return this.avatarsService.getAllAvatars();
  }

}
