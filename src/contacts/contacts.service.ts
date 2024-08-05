import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor (private prismaService : PrismaService){}
  create(createContactDto: CreateContactDto, userId : number) {
    return this.prismaService.contacts.create({data : {...createContactDto, userId}})
  }

  findAll() {
    return this.prismaService.contacts.findMany();
  }

  findOne(id: number) {
    return this.prismaService.contacts.findFirst({where : {id : id}});
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.prismaService.contacts.update({ where: { id: id }, data: { ...updateContactDto }});
  }

  remove(id: number) {
    return this.prismaService.contacts.delete({where : {id : id}})
  }
}
