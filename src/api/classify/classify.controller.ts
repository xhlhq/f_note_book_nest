import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';
import { ClassifyService } from './classify.service';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { ListClassifyDto } from './dto/list-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) { }

  @Post()
  create(@Body() createClassifyDto: CreateClassifyDto) {
    return this.classifyService.create(createClassifyDto);
  }

  @Get()
  findAll(@Query() query: ListClassifyDto) {
    return this.classifyService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassifyDto: UpdateClassifyDto) {
    return this.classifyService.update(+id, updateClassifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifyService.remove(+id);
  }
}
