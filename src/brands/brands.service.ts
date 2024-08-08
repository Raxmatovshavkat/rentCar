import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject,  NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';

@Injectable()
export class BrandsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async findAll() {
    try {
      const cachedBrands = await this.cacheManager.get('brands');
      if (cachedBrands) {
        return cachedBrands;
      }
      const brands = await this.prismaService.brands.findMany();
      await this.cacheManager.set('brands', brands, 3600); 
      return brands;
    } catch (error) {
      throw new InternalServerErrorException('Brandsni olishda xatolik yuz berdi');
    }
  }

  async findOne(id: number) {
    try {
      const cacheKey = `brand:${id}`;
      const cachedBrand = await this.cacheManager.get(cacheKey);
      if (cachedBrand) {
        return cachedBrand;
      }
      const brand = await this.prismaService.brands.findFirst({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Brand ID raqamli ${id} topilmadi`);
      }
      await this.cacheManager.set(cacheKey, brand, 3600); 
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Brandni olishda xatolik yuz berdi');
    }
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const newBrand = await this.prismaService.brands.create({ data: createBrandDto });
      await this.cacheManager.del('brands'); 
      return newBrand;
    } catch (error) {
      throw new InternalServerErrorException('Brand yaratishda xatolik yuz berdi');
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const updatedBrand = await this.prismaService.brands.update({
        where: { id },
        data: updateBrandDto,
      });
      await this.cacheManager.del('brands'); 
      await this.cacheManager.del(`brand:${id}`); 
      return updatedBrand;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Brand ID raqamli ${id} topilmadi`);
      }
      throw new InternalServerErrorException('Brandni yangilashda xatolik yuz berdi');
    }
  }

  async remove(id: number) {
    try {
      const deletedBrand = await this.prismaService.brands.delete({ where: { id: id } });
      await this.cacheManager.del('brands'); // Keshlashni yangilash uchun
      await this.cacheManager.del(`brand:${id}`); // Ushbu brand keshi yangilanishi kerak
      return deletedBrand;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Brand ID raqamli ${id} topilmadi`);
      }
      throw new InternalServerErrorException('Brandni o\'chirishda xatolik yuz berdi');
    }
  }
}
