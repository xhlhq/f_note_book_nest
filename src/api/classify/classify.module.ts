/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:41:30
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 22:54:52
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classify } from './entities/classify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classify])],
  controllers: [ClassifyController],
  providers: [ClassifyService]
})
export class ClassifyModule { }
