/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 17:37:21
 * @FilePath: \f_note_book_nest\src\api\user\user.module.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
