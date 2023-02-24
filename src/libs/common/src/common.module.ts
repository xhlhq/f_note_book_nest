/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 11:43:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-24 11:57:47
 * @FilePath: \f_note_book_nest\src\libs\common\src\common.module.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'
import { DbModule } from 'src/libs/db/src';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), DbModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule { }
