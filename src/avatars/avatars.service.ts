import { Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarsService {
  constructor(private avatarModel: PrismaService) { }
  async create(createAvatarDto: CreateAvatarDto) {
    let s = this.avatarModel.userAvatar.create({ data: createAvatarDto })
    return s
  }

  async getAllAvatars() {
    let avatars = this.avatarModel.userAvatar.findMany()
    return avatars
  }
}
