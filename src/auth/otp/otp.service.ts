import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as otpGenerator from 'otp-generator';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class OtpService {
  private otps = new Map<string, { otp: string, expiresAt: number }>();

  constructor(private readonly mailerService: MailerService, private prismaService: PrismaService) { } //private  usersService : UserService) { }

  async sendOtp(email: string): Promise<void> {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = Date.now() + 10 * 60 * 1000; 
    this.otps.set(email, { otp, expiresAt });

    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}. It is valid for 10 minutes.`;
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0;">
        <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
        <p style="font-size: 18px; color: #555; text-align: center;">Your OTP code is <strong style="font-size: 24px; color: #d9534f;">${otp}</strong>.</p>
        <p style="font-size: 16px; color: #666; text-align: center;">It is valid for <strong>10 minutes</strong>.</p>
        <p style="font-size: 16px; color: #666; text-align: center;">Thank you for using our service!</p>
        <div style="text-align: center; margin-top: 20px;">
            <a href="#" style="background-color: #5bc0de; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">Visit our Website</a>
        </div>
    </div>
`;


    await this.mailerService.sendMail(email, subject, text, html);
  }

  async verifyOtp(email: string, otp: string): Promise<boolean | User> {
    const record = this.otps.get(email);
    if (!record) return false;

    const { otp: storedOtp, expiresAt } = record;
    if (Date.now() > expiresAt) {
      this.otps.delete(email);
      return false;
    }

    if (storedOtp === otp) {
      this.otps.delete(email);
      const user = await this.prismaService.user.update({ where: { email: email }, data: { status: true } })
      return true
    }

    return false;
  }
}
