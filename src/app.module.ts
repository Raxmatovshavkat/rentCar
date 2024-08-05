import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer/mailer.service';
import { OtpService } from './otp/otp.service';
import { AvatarsModule } from './avatars/avatars.module';
// import { UserService } from './user/user.service';
// import { OtpModule } from './otp/otp.module';
import { FindexModule } from './findex/findex.module';
import { ContactsModule } from './contacts/contacts.module';
import { CarsModule } from './cars/cars.module';
import { CarImagesModule } from './car-images/car-images.module';
import { ModelModule } from './model/model.module';
import { BrandsModule } from './brands/brands.module';
import { ColorsModule } from './colors/colors.module';
import { CarFindexModule } from './car-findex/car-findex.module';
import { RentalsModule } from './rentals/rentals.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), UserModule, AuthModule, JwtModule.register({ global: true }), AvatarsModule, FindexModule, ContactsModule, CarsModule, CarImagesModule, ModelModule, BrandsModule, ColorsModule, CarFindexModule, RentalsModule, PaymentsModule],
  providers: [PrismaService, OtpService, MailerService],
})
export class AppModule { }
