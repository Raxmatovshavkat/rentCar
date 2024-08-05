import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Car Images')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
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
