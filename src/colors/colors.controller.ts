import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@ApiTags('Colors')
@Roles('Admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(+id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(+id);
  }
}
