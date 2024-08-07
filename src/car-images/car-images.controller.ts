import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@ApiTags('Car Images')
@Roles('Admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('car-images')
export class CarImagesController {
  constructor(private readonly carImagesService: CarImagesService) {}

  @Post()
  create(@Body() createCarImageDto: CreateCarImageDto) {
    return this.carImagesService.create(createCarImageDto);
  }

  @Get()
  findAll() {
    return this.carImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarImageDto: UpdateCarImageDto) {
    return this.carImagesService.update(+id, updateCarImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carImagesService.remove(+id);
  }
}
