import { Controller, Get, Post } from '@nestjs/common';
import { HashService } from './hash.service';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';

@Controller('hash')
export class HashController {
  constructor(private readonly hashService: HashService) {}

  @Get('findAllCate') // Category 데이터를 가져오는 API
  async findAllCate(): Promise<Category[]> {
    return this.hashService.findAllCate();
  }
}
