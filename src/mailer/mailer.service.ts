import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(MailerService.name);

    constructor() {
        const email = process.env.MY_EMAIL;
        const password = process.env.EMAIL_PASS;

        if (!email || !password) {
            throw new Error('Email or password environment variables are not set.');
        }

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: email,
                pass: password,
            },
        });

        this.transporter.verify((error, success) => {
            if (error) {
                this.logger.error('SMTP server verification failed:', error);
            } else {
                this.logger.log('SMTP server is ready to take our messages');
            }
        });
    }

    async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent: ${info.response}`);
        } catch (error) {
            this.logger.error('Error sending email:', error);
        }
    }
}
