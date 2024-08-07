import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { FindexService } from './findex.service';
import { CreateFindexDto } from './dto/create-findex.dto';
import { UpdateFindexDto } from './dto/update-findex.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('Findex')
@UseGuards(JwtAuthGuard)
// @Roles(Role.Admin)
@Controller('findex')
export class FindexController {
  constructor(private readonly findexService: FindexService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  create(@Body() createFindexDto: CreateFindexDto, @Request() req) {
    // console.log(req.user)
    const userId = req.user.sub
    return this.findexService.create(createFindexDto, userId);
  }

  @Get()
  findAll() {
    return this.findexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFindexDto: UpdateFindexDto) {
    return this.findexService.update(+id, updateFindexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.findexService.remove(+id);
  }
}
