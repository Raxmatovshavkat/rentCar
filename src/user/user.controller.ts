import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RegisterDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: RegisterDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the user to retrieve' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @Roles('Admin') 
  @ApiOperation({ summary: 'Update a specific user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the user to update' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard) 
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('Admin') 
  @ApiOperation({ summary: 'Delete a specific user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the user to delete' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard) 
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
