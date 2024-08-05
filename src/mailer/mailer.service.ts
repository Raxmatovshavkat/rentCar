import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        // Log environment variables for debugging
        console.log('Email:', process.env.MY_EMAIL);
        console.log('Password:', process.env.EMAIL_PASS);

        // Create a transporter using nodemailer
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify connection configuration
        this.transporter.verify(function (error, success) {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });
    }

    async sendMail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            from: process.env.MY_EMAIL, // sender address
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
