import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { OtpService } from 'src/otp/otp.service';
import { ApiTags } from '@nestjs/swagger';
import { VeryifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly otpService: OtpService) { }

  @Post("register")
  create(@Body() createAuthDto: CreateUserDto) {
    return this.userService.create(createAuthDto);
  }

  @Post("login")
  login(@Body() createAuthDto: LoginUserDto) {
    return this.userService.login(createAuthDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyDto :VeryifyOtpDto ) {
    const isValid = await this.otpService.verifyOtp(verifyDto.email, verifyDto.otp);
    return { isValid };
  }

  @Post("resetPassword")
  resetPassword(@Body() createAuthDto) {
    return this.userService.resetPassword(createAuthDto);
  }
}