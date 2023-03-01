/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:42:01
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 22:55:27
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  controllers: [KeywordController],
  providers: [KeywordService]
})
export class KeywordModule { }
