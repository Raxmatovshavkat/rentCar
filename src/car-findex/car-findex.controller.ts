import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarFindexService } from './car-findex.service';
import { CreateCarFindexDto } from './dto/create-car-findex.dto';
import { UpdateCarFindexDto } from './dto/update-car-findex.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Car-Findex')
@Controller('car-findex')
export class CarFindexController {
  constructor(private readonly carFindexService: CarFindexService) { }

  @Post()
  create(@Body() createCarFindexDto: CreateCarFindexDto) {
    return this.carFindexService.create(createCarFindexDto);
  }

  @Get()
  findAll() {
    return this.carFindexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carFindexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarFindexDto: UpdateCarFindexDto) {
    return this.carFindexService.update(+id, updateCarFindexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carFindexService.remove(+id);
  }
}
