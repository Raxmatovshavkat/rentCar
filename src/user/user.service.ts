import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginDto } from './dto/login-user.dto';
import { OtpService } from 'src/auth/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userModel: PrismaService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) { }

  async createUser(registerDto: RegisterDto): Promise<any> {
    const { email, password, first_name, last_name, username, avatarId } = registerDto;

    // Check if a user with the same email exists
    const existingUserByEmail = await this.userModel.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('User already exists with this email');
    }

    // Check if a user with the same username exists
    const existingUserByUsername = await this.userModel.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      throw new ConflictException('User already exists with this username');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.otpService.sendOtp(email);

    try {
      return await this.userModel.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name,
          last_name,
          username,
          avatar: avatarId ? { connect: { id: avatarId } } : undefined,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);

      // Handle Prisma unique constraint error
      if (error.code === 'P2002') {
        const target = error.meta?.target?.[0];
        throw new ConflictException(`A user with this ${target} already exists`);
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }


  async login(loginUserDto: LoginDto) {
    const { email } = loginUserDto;
    let user;

    if (email) {
      user = await this.userModel.user.findFirst({ where: { email } });
    } else {
      user = await this.userModel.user.findFirst({ where: { username: loginUserDto.email } });
    }

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new BadRequestException('Invalid login or password');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const accessToken = await this.createToken(payload, {
      expiresIn: process.env.ACCES_TOKEN_SECRET_TIME,
      secret: process.env.ACCES_TOKEN_SECRET_KEY,
    });
    const refreshToken = await this.createToken(payload, {
      expiresIn: process.env.REFRESH_TOKEN_SECRET_TIME,
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });

    await this.userModel.refreshTokens.create({
      data: { userId: user.id, token: refreshToken },
    });

    return { accessToken, refreshToken };
  }

  createToken(payload: any, options: { expiresIn: string; secret: string }) {
    return this.jwtService.sign(payload, {
      secret: options.secret,
      expiresIn: options.expiresIn,
    });
  }

  async revokeToken(refreshToken: string) {
    try {
      await this.userModel.refreshTokens.deleteMany({
        where: { token: refreshToken },
      });
      return { message: 'Token revoked successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to revoke token');
    }
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const { old_password, new_password } = updatePasswordDto;

    const user = await this.userModel.user.findUnique({ where: { id: userId } });

    if (!user || !(await bcrypt.compare(old_password, user.password))) {
      throw new UnauthorizedException('Invalid old password');
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    try {
      await this.userModel.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });
      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update password');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    const resetToken = await this.jwtService.signAsync(
      { email },
      { expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN, secret: process.env.RESET_PASSWORD_TOKEN_SECRET_KEY },
    );

    return { message: 'Password reset email sent' };
  }
  async verifyEmail(email: string) {
    try {
      const verificationToken = await this.jwtService.signAsync(
        { email },
        { expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN, secret: process.env.EMAIL_VERIFICATION_TOKEN_SECRET_KEY },
      );

      return { message: 'Email verification sent' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email verification');
    }
  }


  async findAll() {
    try {
      return await this.userModel.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: number) {
    try {
      return await this.userModel.user.findFirst({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async updateByEmail(email: string) {
    try {
      return await this.userModel.user.update({
        where: { email },
        data: { status: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user status');
    }
  }

  async remove(id: number) {
    try {
      return await this.userModel.user.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
