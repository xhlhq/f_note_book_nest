/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-03-03 16:56:24
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-03 17:39:20
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyFile } from './entities/file.entity';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../../images'),
      filename: (_, file, callback) => {
        const filename = `${new Date().getTime()}${extname(file.originalname)}`;
        return callback(null, filename)
      }
    })
  }), TypeOrmModule.forFeature([MyFile])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
