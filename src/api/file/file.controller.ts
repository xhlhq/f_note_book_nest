/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-03-03 16:56:24
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-03 17:46:23
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing';
import { Response } from "express";
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post("/uploadImg")
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return this.fileService.uploadImg(file, createFileDto);
  }

  @Get('/download')
  download(@Res() res: Response) {
    const url = join(__dirname, '../../images/1677834056665.jpg');
    res.download(url);
  }

  @Get("/stream")
  async stream(@Res() res: Response) {
    const url = join(__dirname, '../../images/1677834056665.jpg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=1677834056665');
    tarStream.pipe(res);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
