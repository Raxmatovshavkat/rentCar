import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { OtpService } from './otp/otp.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "Ronaldo",
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [ UserService, PrismaService, OtpService, MailerService],
  controllers : [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule { }
