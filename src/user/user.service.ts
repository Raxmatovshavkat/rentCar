import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { OtpService } from 'src/otp/otp.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private userModel: PrismaService, private jwtService: JwtService, private otpService: OtpService) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const willCreatedUser = { ...createUserDto, avatarId: 1 }
      const salt = +process.env.PASSWORD_SALT
      const hashedPassword = await bcrypt.hash(willCreatedUser.password, salt)
      willCreatedUser.password = hashedPassword
      const user = await this.userModel.user.create({ data: willCreatedUser })
      this.otpService.sendOtp(user.email)
      return "Successuful registered a one time passwport sended your email please confirm the one time passport"

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Serverda xatolik")
    }
  }

  async login(loginUserDto: LoginUserDto) {
    if (loginUserDto.email) {
      const user = await this.userModel.user.findFirst({ where: { email: loginUserDto.email } })
      if (!user || !await bcrypt.compare(loginUserDto.password, user.password))
        throw new BadRequestException('Login Yoki Parol notogri')
      const payload = {
        sub: user.id,
        role: user.role,
        email: user.email
      }
      const accesToken = await this.createToken(payload, { expiresIn: process.env.ACCES_TOKEN_SECRET_TIME, secret: process.env.ACCES_TOKEN_SECRET_KEY })
      const refreshToken = await this.createToken(payload, { expiresIn: process.env.REFRESH_TOKEN_SECRET_TIME, secret: process.env.REFRESH_TOKEN_SECRET_KEY })
      const refreshTokenTable = await this.userModel.refreshTokens.create({ data: { userId: user.id, token: refreshToken } })
      return { accesToken, refreshToken }
    } else {
      const user = await this.userModel.user.findFirst({ where: { username: loginUserDto.username } })
      if (!user || !await bcrypt.compare(loginUserDto.password, user.password))
        throw new BadRequestException('Login Yoki Parol notogri')
      const payload = {
        sub: user.id,
        role: user.role,
        email: user.email
      }
      const accesToken = await this.createToken(payload, { expiresIn: process.env.ACCES_TOKEN_SECRET_TIME, secret: process.env.ACCES_TOKEN_SECRET_KEY })
      const refreshToken = await this.createToken(payload, { expiresIn: process.env.REFRESH_TOKEN_SECRET_TIME, secret: process.env.REFRESH_TOKEN_SECRET_KEY })
      const refreshTokenTable = await this.userModel.refreshTokens.create({ data: { userId: user.id, token: refreshToken } })
      return { accesToken, refreshToken }
    }

  }

  createToken(payload, piece) {
    return this.jwtService.sign(payload, piece)

  }

  async resetPassword(passwordDto) {
    return await this.userModel.user.update({ where: { email: passwordDto.email }, data: { password: passwordDto.newpassword } })
  }

  async findAll() {
    const users = await this.userModel.user.findMany()
    console.log(users)
    return users
  }

  findOne(id: number) {
    return this.userModel.user.findFirst({ where: { id: id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.user.update({ where: { id: id }, data: { ...updateUserDto } })
  }
  async updateByEmail(email: string) {
    return await this.userModel.user.update({ where: { email: email }, data: { status: true } })
  }

  remove(id: number) {
    return this.userModel.user.delete({ where: { id: id } })
  }

}
