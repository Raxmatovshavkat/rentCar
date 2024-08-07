import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { OtpService } from 'src/auth/otp/otp.service';

@Module({
  // imports : [JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtService, PrismaService, OtpService, MailerService ],
  exports: [UserModule],
})
export class UserModule { }
