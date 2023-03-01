/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:42:01
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 22:16:35
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { ListKeywordDto } from './dto/list-keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) { }

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  findAll(@Query() query: ListKeywordDto) {
    return this.keywordService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordService.update(+id, updateKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordService.remove(+id);
  }
}
