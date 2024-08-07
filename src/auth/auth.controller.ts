import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { OtpService } from './otp/otp.service';
import { VeryifyOtpDto } from 'src/user/dto/verify-otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly otpService: OtpService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 409, description: 'User already exists with this email.' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.createUser(registerDto);
  }

  @Post("login")
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid email or password.' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for email' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or email.' })
  async verifyOtp(@Body() verifyDto: VeryifyOtpDto) {
    const isValid = await this.otpService.verifyOtp(verifyDto.email, verifyDto.otp);
    return { isValid };
  }

  @Post("forgot-password")
  @ApiOperation({ summary: 'Send password reset email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent.' })
  @ApiResponse({ status: 400, description: 'User with this email does not exist.' })
  async forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }


  @Post('revoke-token')
  @ApiOperation({ summary: 'Revoke a refresh token' })
  @ApiResponse({ status: 200, description: 'Token revoked successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid token.' })
  async revokeToken(@Body('refreshToken') refreshToken: string) {
    return this.userService.revokeToken(refreshToken);
  }
}
